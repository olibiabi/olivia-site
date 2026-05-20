/**
 * Frontmatter schema for /work projects (求职作品集).
 *
 * Bilingual rule (per CLAUDE.md):
 *   - `title` is English-only — no `titleZh` field.
 *   - Other text fields come in EN / ZH pairs (`summary` + `summaryZh`).
 *   - `tools` stays English (proper nouns like TouchDesigner are not translated).
 *
 * Slug is derived from the MDX filename (e.g. `time-will-tell.mdx` → `/work/time-will-tell`),
 * so it intentionally does not appear here.
 */
export type WorkFrontmatter = {
  // ─── Required ───────────────────────────────────────────────

  /** English title shown on cards and detail page hero. */
  title: string

  /** Project year, used for sort order and card metadata. */
  year: number

  /**
   * List sort key, ascending. Use 10 / 20 / 30 to leave room for inserts.
   * Optional: if omitted, the project sorts to the end of the list.
   */
  order?: number

  /** Public path to cover image, e.g. `/images/projects/<dir>/cover.jpg`. */
  cover: string

  /** One-line description (EN). Shown on list cards and detail hero. */
  summary: string
  /** One-line description (ZH). */
  summaryZh: string

  /** Your role on the project (EN), e.g. "Visual Designer & Performer". */
  role: string
  /** Your role on the project (ZH). */
  roleZh: string

  /** Tools / stack used. Always English; do not translate proper nouns. */
  tools: string[]

  // ─── Optional ───────────────────────────────────────────────

  /**
   * Project medium / type label shown on list cards under the title,
   * e.g. "VJ Performance" / "Animation" / "Curation".
   * Pairs with `typeZh` as `EN · 中文` when both present.
   */
  type?: string
  /** Chinese label for the project type. */
  typeZh?: string

  /** YouTube unlisted (or other) video URL. Empty string `""` is treated as none. */
  videoUrl?: string

  /** When true, the project is excluded from the /work list and route. */
  draft?: boolean

  /**
   * When true, the project takes a full-width row at the top of /work
   * (editorial "hero" placement). When false (default), it flows in the
   * regular grid below featured items.
   *
   * Currently the /work page renders all projects single-column, so this
   * flag has no visual effect yet. Reserved for the multi-project layout.
   */
  featured?: boolean
}

/**
 * Frontmatter schema for /lab collections.
 *
 * Lighter than `WorkFrontmatter` — Lab is image-driven and tag-grouped.
 * Year is a string (can be "ongoing", "2026", etc.) unlike projects'
 * numeric year. Tag must match the /lab tag filter.
 */
export type LabFrontmatter = {
  /** English title. */
  title: string
  /** Optional Chinese title (e.g. "看展随笔"). */
  titleZh?: string
  /** Fixed-vocabulary tag — drives the /lab filter chip selection. */
  tag:
    | "AIGC"
    | "Experimental Film"
    | "Graphic Design"
    | "Sketches"
    | "Photography"
  /** Year string — allows "ongoing" / "2024–2025" / etc. */
  year: string
  /** Public path to cover image, e.g. `/images/lab/<slug>/cover.jpg`. */
  coverImage: string
  /** Short description (EN), shown on detail intro. */
  shortDescription: string
  /** Short description (ZH), shown on detail intro. */
  shortDescriptionZh?: string
  /** Optional YouTube embed URL (e.g. for Experimental Film type). */
  youtubeEmbed?: string
  /** Sort order within the same tag (ascending). */
  order?: number
  /** When true, hidden from /lab list and not in SSG. */
  draft?: boolean
}

/**
 * A lab project record as returned by `getProjects<LabFrontmatter>('lab')`.
 */
export type LabProject = LabFrontmatter & {
  slug: string
  content?: import("react").ReactElement
}

/**
 * A project record as returned by `getProjects()` or `getProject()`:
 * frontmatter plus the slug derived from its filename, plus
 * (for detail pages only) the compiled MDX body.
 *
 * `slug` is the URL segment, e.g. `/work/<slug>`.
 *
 * `content` is the compiled MDX body as a React element, set by
 * `getProject()` for detail pages and left undefined by
 * `getProjects()` since list cards don't render the body.
 */
export type Project = WorkFrontmatter & {
  slug: string
  content?: import("react").ReactElement
}
