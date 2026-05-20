import { Cross, type CrossVariant } from "./Cross"

export type CrossSpec = {
  top?: number | string
  bottom?: number | string
  left?: number | string
  right?: number | string
  variant?: CrossVariant
  /** Square shortcut. Use width+height for non-square variants (e.g. C 35×28). */
  size?: number
  width?: number
  height?: number
  opacity?: number
  /** Per-cross animation delay in seconds (negative offsets desyncing). */
  delay?: number
}

type CrossFieldProps = {
  crosses: CrossSpec[]
  /** Extra classes for the wrapping field. */
  className?: string
  /**
   * When true, every cross in the field breathes unconditionally
   * (not gated on body.scrolling). Pass true on the home page where
   * crosses should animate from page load. See `Cross` props.
   */
  alwaysBreathing?: boolean
}

/**
 * Absolutely positions a cluster of <Cross>es inside its parent.
 *
 * **Parent must be `position: relative`** (or another positioning
 * context) — the field uses `absolute inset-0` to span the parent and
 * each cross uses `absolute` with the spec's top/bottom/left/right.
 *
 * The whole field has `pointer-events: none` so clicks pass through to
 * content below. Z-index 1 puts the field behind any z-indexed content
 * (use `position: relative; z-index: 2` on text / interactive layers).
 */
export function CrossField({
  crosses,
  className = "",
  alwaysBreathing = false,
}: CrossFieldProps) {
  return (
    <div
      aria-hidden="true"
      className={`absolute inset-0 pointer-events-none ${className}`}
      style={{ zIndex: 1 }}
    >
      {crosses.map((c, i) => (
        <span
          key={i}
          className="absolute"
          style={{
            top: c.top,
            bottom: c.bottom,
            left: c.left,
            right: c.right,
          }}
        >
          <Cross
            variant={c.variant}
            size={c.size}
            width={c.width}
            height={c.height}
            opacity={c.opacity}
            alwaysBreathing={alwaysBreathing}
            delay={c.delay}
          />
        </span>
      ))}
    </div>
  )
}
