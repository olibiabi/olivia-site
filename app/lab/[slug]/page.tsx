import Link from "next/link"
import { notFound } from "next/navigation"
import { getProject, getProjects } from "@/lib/projects"
import type { LabFrontmatter, LabProject } from "@/lib/types"
import { CrossField, type CrossSpec } from "@/components/CrossField"
import { HairlineWithCross } from "@/components/HairlineWithCross"

// SSG: pre-render one page per non-draft lab entry at build time.
export function generateStaticParams() {
  return getProjects<LabFrontmatter>("lab").map((l) => ({ slug: l.slug }))
}

// 2 decorative crosses around the intro block. Lighter than /projects
// detail (which has 3) because lab is image-driven, less title weight.
const introCrosses: CrossSpec[] = [
  { top: 180, left: 120, variant: "b", width: 22, height: 22 },
  { top: 260, right: 140, variant: "a", width: 26, height: 26 },
]

type Props = {
  params: Promise<{ slug: string }>
}

export default async function LabDetailPage({ params }: Props) {
  const { slug } = await params
  const project = await getProject<LabFrontmatter>("lab", slug)
  if (!project) notFound()

  // Per-tag prev/next with LOOP (Design Doc §3.5).
  // Only labs in the SAME tag participate. With only 1 entry in a tag,
  // hide both nav links (a "next" pointing to self is confusing).
  const sameTag = getProjects<LabFrontmatter>("lab").filter(
    (l) => l.tag === project.tag,
  )
  const idx = sameTag.findIndex((l) => l.slug === slug)
  const hasSiblings = sameTag.length > 1
  const prev: LabProject | null = hasSiblings
    ? sameTag[(idx - 1 + sameTag.length) % sameTag.length]
    : null
  const next: LabProject | null = hasSiblings
    ? sameTag[(idx + 1) % sameTag.length]
    : null

  return (
    <div className="relative min-h-[calc(100vh-80px)]">
      <CrossField crosses={introCrosses} className="hidden md:block" />

      {/* Back link */}
      <div className="relative z-10 px-5 pt-6 md:px-20 md:pt-8">
        <Link
          href="/lab"
          className="text-[13px] text-ink-soft transition-colors hover:text-rose-deep"
        >
          ← Back to Lab
        </Link>
      </div>

      {/* Intro block — centered, lighter than /projects detail */}
      <div className="relative z-10 text-center px-5 pt-10 pb-8 md:px-20 md:pt-12">
        <p
          className="text-xs font-medium text-rose-deep mb-3 uppercase"
          style={{ letterSpacing: "0.1em" }}
        >
          {project.tag} · {project.year}
        </p>
        <h1 className="text-[34px] font-medium text-ink mb-4 md:text-[48px]">
          {project.title}
        </h1>
        {project.shortDescription && (
          <p className="text-sm text-ink-soft max-w-[540px] mx-auto">
            {project.shortDescription}
          </p>
        )}
        {project.shortDescriptionZh && (
          <p className="text-[13px] text-ink-mute max-w-[540px] mx-auto mt-1">
            {project.shortDescriptionZh}
          </p>
        )}
      </div>

      {/* YouTube embed — only rendered when frontmatter provides a URL.
          16:9 box via aspect-video, max 800px, centered. */}
      {project.youtubeEmbed && (
        <div className="relative z-10 flex justify-center px-5 pb-10 md:px-20 md:pb-12">
          <div className="relative w-full max-w-[800px] aspect-video">
            <iframe
              src={project.youtubeEmbed}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="absolute inset-0 w-full h-full border-0"
              title={project.title}
            />
          </div>
        </div>
      )}

      {/* MDX body — uses .lab-article styles from globals.css (separate
          from .mdx-article so /projects's editorial typography doesn't
          bleed here). For image grids inside MDX, the author writes
          `<div className="lab-gallery">...</div>` around <img> tags. */}
      <article className="lab-article">{project.content}</article>

      {/* Prev/Next (per-tag loop) */}
      {hasSiblings && (
        <>
          <div className="px-5 mt-12 mb-8 md:px-20 md:mt-16 md:mb-10">
            <HairlineWithCross left="42%" variant="c" size={18} />
          </div>

          <div className="flex flex-col gap-8 px-5 pb-10 sm:flex-row sm:justify-between sm:items-start md:px-20">
            {prev && (
              <Link href={`/lab/${prev.slug}`} className="group">
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
            )}

            {next && (
              <Link href={`/lab/${next.slug}`} className="group text-right">
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
            )}
          </div>
        </>
      )}
    </div>
  )
}
