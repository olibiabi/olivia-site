"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { TagFilter, type LabTag } from "./TagFilter"
import type { LabProject } from "@/lib/types"

type LabGridProps = {
  labs: LabProject[]
}

/**
 * Client wrapper that owns the tag-filter state and renders the
 * filtered grid. The page (Server Component) fetches all `labs` and
 * hands them off here.
 *
 * Filtering is purely client — no URL state, no router push. If the
 * user wants to share a tagged view, that's a future feature (could
 * use `?tag=Sketches` query later).
 */
export function LabGrid({ labs }: LabGridProps) {
  const [activeTag, setActiveTag] = useState<LabTag>("All")

  const filtered =
    activeTag === "All" ? labs : labs.filter((l) => l.tag === activeTag)

  return (
    <>
      <TagFilter activeTag={activeTag} onTagChange={setActiveTag} />

      <div className="grid grid-cols-1 gap-5 px-5 md:grid-cols-2 md:px-20 lg:grid-cols-3">
        {filtered.map((lab) => (
          <LabCard key={lab.slug} lab={lab} />
        ))}
      </div>
    </>
  )
}

function LabCard({ lab }: { lab: LabProject }) {
  return (
    <Link
      href={`/lab/${lab.slug}`}
      className="group block transition-transform duration-300 hover:-translate-y-1"
    >
      <div className="relative aspect-[4/5] overflow-hidden">
        <Image
          src={lab.coverImage}
          alt={lab.title}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
          unoptimized
          className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
        />

        {/* Info bar — fades in from bottom on hover. Gradient bg uses
            ink color at 95% alpha fading to fully transparent. */}
        <div
          className="absolute inset-x-0 bottom-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{
            padding: "32px 16px 14px",
            background:
              "linear-gradient(to top, rgba(91, 58, 53, 0.95) 0%, rgba(91, 58, 53, 0) 100%)",
          }}
        >
          <p className="text-sm font-medium" style={{ color: "var(--paper)" }}>
            {lab.title}
          </p>
          <p
            className="text-[11px] mt-1"
            style={{
              color: "var(--paper)",
              opacity: 0.85,
              letterSpacing: "0.04em",
              textTransform: "uppercase",
            }}
          >
            {lab.tag} · {lab.year}
          </p>
        </div>
      </div>
    </Link>
  )
}
