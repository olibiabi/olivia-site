import { getProjects } from "@/lib/projects"
import type { LabFrontmatter } from "@/lib/types"
import { LabGrid } from "@/components/LabGrid"
import { HairlineWithCross } from "@/components/HairlineWithCross"

export default function LabPage() {
  // Generic type tells getProjects to parse frontmatter as LabFrontmatter.
  const labs = getProjects<LabFrontmatter>("lab")

  return (
    <div className="min-h-[calc(100vh-80px)]">
      {/* Page header — title + bilingual sub-text */}
      <div className="px-5 pt-8 pb-4 md:px-20 md:pt-10">
        <h1 className="text-4xl font-medium text-ink mb-1">Lab</h1>
        <p className="text-sm text-ink-soft break-words">
          Visual experiments, sketches, and ongoing explorations.
        </p>
        <p className="text-[13px] text-ink-mute mt-0.5 break-words">
          视觉实验 · 草稿 · 进行中的探索
        </p>
      </div>

      {/* Tag filter + filtered grid (client-side state) */}
      <LabGrid labs={labs} />

      {/* Bottom hairline + collection count */}
      <div className="px-5 mt-16 md:px-20">
        <HairlineWithCross left="50%" variant="b" size={18} />
      </div>
      <p className="text-center text-sm text-ink-soft py-6">
        {labs.length} collections
      </p>
    </div>
  )
}
