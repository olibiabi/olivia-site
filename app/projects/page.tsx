import Link from "next/link"
import Image from "next/image"
import { getProjects } from "@/lib/projects"
import { HairlineWithCross } from "@/components/HairlineWithCross"
import type { CrossVariant } from "@/components/Cross"

// Hairline cross positions, cycled through. Index 0 is the top hairline
// above the first row. Index N is the hairline BELOW row N-1.
// Pattern: alternates left/right with non-uniform offsets so dividers
// don't form a vertical line of crosses.
const HAIRLINE_POSITIONS: ReadonlyArray<
  { left: string } | { right: string }
> = [
  { left: "18%" },
  { right: "22%" },
  { left: "36%" },
  { right: "28%" },
  { left: "24%" },
  { right: "32%" },
]

const VARIANT_CYCLE: readonly CrossVariant[] = ["a", "b", "c", "d"]

export default function ProjectsPage() {
  // Sync — getProjects reads MDX files synchronously and returns
  // Project[] sorted by `order` ascending (drafts already filtered).
  const projects = getProjects("projects")

  return (
    <div className="min-h-[calc(100vh-80px)]">
      {/* Page header */}
      <div className="px-20 pt-10 pb-6">
        <h1 className="text-4xl font-medium text-ink mb-1">Projects</h1>
        <p className="text-sm text-ink-soft">
          Selected works in interaction design, installation, and curation.
        </p>
      </div>

      {/* Top hairline (above first row) */}
      <div className="px-20">
        <HairlineWithCross
          {...HAIRLINE_POSITIONS[0]}
          variant="b"
          size={18}
        />
      </div>

      {/* Project rows + the hairline below each row */}
      {projects.map((project, i) => (
        <div key={project.slug}>
          <Link
            href={`/projects/${project.slug}`}
            className="block group transition-transform duration-300 hover:-translate-y-[3px]"
          >
            <div className="grid grid-cols-[60px_380px_1fr] gap-8 px-20 py-8 items-start">
              {/* Year — italic rose-deep */}
              <p className="text-sm italic text-rose-deep mt-2">
                {project.year}
              </p>

              {/* Cover — fixed 380×285 (4:3) */}
              <div className="relative aspect-[4/3] w-[380px] overflow-hidden">
                <Image
                  src={project.cover}
                  alt={project.title}
                  fill
                  sizes="380px"
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                />
              </div>

              {/* Text — title, type label, summary */}
              <div className="pt-2">
                <h2 className="text-[22px] font-medium text-ink mb-1 transition-colors duration-200 group-hover:text-rose-deep">
                  {project.title}
                  <span
                    aria-hidden="true"
                    className="inline-block ml-2 text-rose-deep opacity-0 -translate-x-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0"
                  >
                    →
                  </span>
                </h2>
                {project.type && (
                  // Type label: ALL CAPS rose-deep for English (per
                  // design doc §3.2), Chinese resets to ink-soft +
                  // normal case so the bilingual line reads as
                  // "category EN  ·  category 中文" with deliberate
                  // tonal contrast (loud + quiet).
                  <p className="text-[11px] font-medium uppercase tracking-[0.1em] text-rose-deep mb-3 mt-1">
                    {project.type}
                    {project.typeZh && (
                      <span className="text-ink-soft normal-case tracking-normal ml-2">
                        · {project.typeZh}
                      </span>
                    )}
                  </p>
                )}
                <p className="text-sm text-ink leading-relaxed mt-4 max-w-[480px]">
                  {project.summary}
                </p>
              </div>
            </div>
          </Link>

          {/* Hairline below this row. Index `i + 1` so position 0 is
              reserved for the top hairline. Cycles through positions. */}
          <div className="px-20">
            <HairlineWithCross
              {...HAIRLINE_POSITIONS[(i + 1) % HAIRLINE_POSITIONS.length]}
              variant={VARIANT_CYCLE[i % VARIANT_CYCLE.length]}
              size={18}
            />
          </div>
        </div>
      ))}
    </div>
  )
}
