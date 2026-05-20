import fs from "node:fs"
import path from "node:path"
import type { ReactElement } from "react"
import matter from "gray-matter"
import { compileMDX } from "next-mdx-remote/rsc"
import { mdxComponents } from "./mdx-components"
import type { WorkFrontmatter } from "./types"

const CONTENT_ROOT = path.join(process.cwd(), "content")

/**
 * Reads all MDX files under `content/<category>/`, parses their frontmatter,
 * drops drafts, and returns them sorted by `order` ascending. Items missing
 * `order` sort to the end.
 *
 * If the category directory does not exist yet, returns `[]` instead of
 * throwing — so a route listing an empty category renders cleanly rather
 * than crashing during build.
 */
export function getProjects<T = WorkFrontmatter>(
  category: "projects" | "lab",
): (T & { slug: string })[] {
  // Generic over T so callers can specify the frontmatter shape:
  //   getProjects("projects")              → T defaults to WorkFrontmatter
  //   getProjects<LabFrontmatter>("lab")   → T is LabFrontmatter
  const dir = path.join(CONTENT_ROOT, category)
  if (!fs.existsSync(dir)) return []

  const entries = fs
    .readdirSync(dir)
    .filter((name) => name.endsWith(".mdx"))
    .map((filename) => {
      const raw = fs.readFileSync(path.join(dir, filename), "utf8")
      const { data } = matter(raw)
      return {
        ...(data as T),
        slug: filename.replace(/\.mdx$/, ""),
      }
    })

  return entries
    .filter((e) => !(e as unknown as { draft?: boolean }).draft)
    .sort(
      (a, b) =>
        sortKey((a as unknown as { order?: number }).order) -
        sortKey((b as unknown as { order?: number }).order),
    )
}

function sortKey(order: number | undefined): number {
  return typeof order === "number" ? order : Number.POSITIVE_INFINITY
}

/**
 * Remark plugin: rename `class="..."` attributes on literal JSX nodes
 * (e.g. `<div class="zh">` written in MDX source) to `className="..."`
 * before MDX compiles them to React elements. Without this, React 19
 * warns: "Invalid DOM property `class`. Did you mean `className`?"
 *
 * Why this rather than a custom `div` component override: in MDX 3,
 * literal JSX in source compiles to `_jsx("div", ...)` with the literal
 * tag name — it does NOT route through the `components` prop. So
 * component overrides only catch markdown-generated elements (h2 from
 * `##`, p from paragraphs), not embedded HTML/JSX. Fixing `class` at
 * the AST level is the only way to handle it without rewriting the MDX
 * files themselves.
 *
 * The plugin walks the mdast tree, finds `mdxJsxFlowElement` and
 * `mdxJsxTextElement` nodes, and renames any `class` attribute to
 * `className`. Other attributes are untouched.
 */
function remarkClassToClassName() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (tree: any) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const walk = (node: any) => {
      if (!node || typeof node !== "object") return
      if (
        (node.type === "mdxJsxFlowElement" ||
          node.type === "mdxJsxTextElement") &&
        Array.isArray(node.attributes)
      ) {
        for (const attr of node.attributes) {
          if (attr?.type === "mdxJsxAttribute" && attr.name === "class") {
            attr.name = "className"
          }
        }
      }
      if (Array.isArray(node.children)) {
        for (const child of node.children) walk(child)
      }
    }
    walk(tree)
  }
}

/**
 * Reads a single MDX file under `content/<category>/<slug>.mdx`, parses
 * its frontmatter, and compiles the body to a React element ready to
 * render in a Server Component.
 *
 * Returns `null` if the file does not exist (so the caller can render
 * a 404 cleanly). Does not filter on `draft` — by the time we have a
 * slug, we are committed to showing that specific project regardless
 * of its publish state. Drafts that should never be reachable should
 * be hidden by their absence from `generateStaticParams()`, not here.
 */
export async function getProject<T = WorkFrontmatter>(
  category: "projects" | "lab",
  slug: string,
): Promise<(T & { slug: string; content: ReactElement }) | null> {
  const filePath = path.join(CONTENT_ROOT, category, `${slug}.mdx`)
  if (!fs.existsSync(filePath)) return null

  const raw = fs.readFileSync(filePath, "utf8")
  const { content: body, data } = matter(raw)

  const { content } = await compileMDX<T>({
    source: body,
    options: {
      parseFrontmatter: false,
      mdxOptions: { remarkPlugins: [remarkClassToClassName] },
    },
    components: mdxComponents,
  })

  return {
    ...(data as T),
    slug,
    content,
  }
}
