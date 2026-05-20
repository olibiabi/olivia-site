"use client"

export const LAB_TAGS = [
  "All",
  "AIGC",
  "Experimental Film",
  "Graphic Design",
  "Sketches",
  "Photography",
] as const

export type LabTag = (typeof LAB_TAGS)[number]

type TagFilterProps = {
  activeTag: LabTag
  onTagChange: (tag: LabTag) => void
}

/**
 * Capsule-style tag filter row for /lab. Single-select — clicking a
 * different tag swaps the active one. "All" is the default.
 *
 * Default chip: thin hairline border, ink-soft text, transparent bg.
 * Hover: border + text turn rose-deep.
 * Active: solid ink bg, paper text, ink border.
 */
export function TagFilter({ activeTag, onTagChange }: TagFilterProps) {
  return (
    <div className="flex gap-2 flex-wrap px-20 pb-10">
      {LAB_TAGS.map((tag) => {
        const isActive = tag === activeTag
        return (
          <button
            key={tag}
            onClick={() => onTagChange(tag)}
            className={
              isActive
                ? "px-3.5 py-1.5 rounded-2xl text-xs font-medium border bg-ink text-paper border-ink transition-all duration-200"
                : "px-3.5 py-1.5 rounded-2xl text-xs font-medium border border-hairline text-ink-soft bg-transparent transition-all duration-200 hover:border-rose-deep hover:text-rose-deep"
            }
          >
            {tag}
          </button>
        )
      })}
    </div>
  )
}
