import Link from "next/link"
import Image from "next/image"
import { notFound } from "next/navigation"
import { getProject, getProjects } from "@/lib/projects"
import { CrossField, type CrossSpec } from "@/components/CrossField"
import { HairlineWithCross } from "@/components/HairlineWithCross"

// SSG: pre-render one page per non-draft project at build time.
// `getProjects` is sync — no await.
export function generateStaticParams() {
  return getProjects("projects").map((p) => ({ slug: p.slug }))
}

// Decorative crosses scattered around the title block. Three is enough
// at this density — the page itself has its own visual rhythm via the
// title hierarchy + cover + body. Default behavior (no `alwaysBreathing`)
// means these only animate while the user is scrolling, per §4.1.
const titleCrosses: CrossSpec[] = [
  { top: 180, left: 80, variant: "b", width: 22, height: 22 },
  { top: 240, right: 100, variant: "a", width: 26, height: 26 },
  { top: 320, left: 200, variant: "d", width: 18, height: 18 },
]

type Props = {
  params: Promise<{ slug: string }>
}

export default async function ProjectDetailPage({ params }: Props) {
  const { slug } = await params
  const project = await getProject("projects", slug)
  if (!project) notFound()

  // Linear (NOT circular) prev/next per §6.7.
  // First project: prev = null. Last project: next = null.
  // Drafts are not in the list, so currentIndex === -1 for a draft URL
  // hides both nav links.
  const allProjects = getProjects("projects")
  const currentIndex = allProjects.findIndex((p) => p.slug === slug)
  const prev = currentIndex > 0 ? allProjects[currentIndex - 1] : null
  const next =
    currentIndex >= 0 && currentIndex < allProjects.length - 1
      ? allProjects[currentIndex + 1]
      : null

  return (
    <div className="relative min-h-[calc(100vh-80px)]">
      {/* Background scattered crosses — z-index 1 (default in CrossField).
          Hidden on mobile; positions designed for desktop. */}
      <CrossField crosses={titleCrosses} className="hidden md:block" />

      {/* Back link — z-10 keeps it above the cross field */}
      <div className="relative z-10 px-20 pt-8">
        <Link
          href="/projects"
          className="text-[13px] text-ink-soft transition-colors hover:text-rose-deep"
        >
          ← Back to Projects
        </Link>
      </div>

      {/* Title block — centered, four-line hierarchy */}
      <div className="relative z-10 text-center px-20 pt-16 pb-8">
        <h1
          className="text-[56px] font-medium text-ink mb-3"
          style={{ letterSpacing: "-0.01em" }}
        >
          {project.title}
        </h1>
        <p className="text-[18px] italic text-rose-deep mb-6">{project.year}</p>
        {project.type && (
          <p
            className="text-sm uppercase text-ink mb-2"
            style={{ letterSpacing: "0.05em" }}
          >
            {project.type}
          </p>
        )}
        {project.tools && project.tools.length > 0 && (
          <p className="text-[13px] text-ink-soft">
            {project.tools.join(" · ")}
          </p>
        )}
      </div>

      {/* Cover image — centered, max-width 800, original aspect ratio.
          Using next/image with intrinsic 800×600 (a 4:3 hint) — actual
          rendered dimensions follow the image's natural aspect via
          `h-auto`. No `object-fit`, no `aspect-ratio` clipping per §6.3. */}
      <div className="relative z-10 flex justify-center px-20 pb-12">
        <Image
          src={project.cover}
          alt={project.title}
          width={800}
          height={600}
          priority
          className="w-full max-w-[800px] h-auto"
        />
      </div>

      {/* MDX body — `project.content` is already a compiled ReactElement
          from getProject(); render directly (NOT through MDXRemote). The
          `.mdx-article` wrapper carries the editorial typography rules
          defined in globals.css. */}
      <article className="mdx-article">{project.content}</article>

      {/* Hairline + cross before prev/next nav */}
      {(prev || next) && (
        <div className="px-20 mt-16 mb-10">
          <HairlineWithCross left="42%" variant="c" size={18} />
        </div>
      )}

      {/* Linear prev/next nav. Empty <span /> placeholders preserve flex
          space when only one side is present, so the visible link still
          aligns to its expected edge. */}
      {(prev || next) && (
        <div className="flex justify-between items-start px-20 pb-10">
          {prev ? (
            <Link href={`/projects/${prev.slug}`} className="group">
              <p
                className="text-[11px] uppercase text-ink-mute mb-1"
                style={{ letterSpacing: "0.1em" }}
              >
                Previous
              </p>
              <p className="text-base font-medium text-ink transition-colors group-hover:text-rose-deep">
                ← {prev.title}
              </p>
            </Link>
          ) : (
            <span />
          )}

          {next ? (
            <Link href={`/projects/${next.slug}`} className="group text-right">
              <p
                className="text-[11px] uppercase text-ink-mute mb-1"
                style={{ letterSpacing: "0.1em" }}
              >
                Next
              </p>
              <p className="text-base font-medium text-ink transition-colors group-hover:text-rose-deep">
                {next.title} →
              </p>
            </Link>
          ) : (
            <span />
          )}
        </div>
      )}
    </div>
  )
}
