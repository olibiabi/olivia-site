import { Cross, type CrossVariant } from "./Cross"

type HairlineWithCrossProps = {
  /**
   * Cross horizontal position from the LEFT edge. Accepts a CSS length
   * string ("18%", "120px") or a number (treated as px).
   * Mutually exclusive with `right`.
   */
  left?: string | number
  /**
   * Cross horizontal position from the RIGHT edge. Mutually exclusive
   * with `left`. Accepts the same value types.
   */
  right?: string | number
  variant?: CrossVariant
  size?: number
  className?: string
}

/**
 * 1px hairline divider with a single cross sitting ON the line. Used
 * as section divider per design doc §2.3 and on the /projects list
 * between rows. Cross sits at `top: -size/2 - 1px` so it visually
 * straddles the 1px line (cross center aligns with the line).
 *
 * Position the cross via `left` or `right` (whichever is given wins).
 * Default position is `left: 30%` if neither is provided.
 */
export function HairlineWithCross({
  left,
  right,
  variant = "a",
  size = 12,
  className = "",
}: HairlineWithCrossProps) {
  const positionStyle: React.CSSProperties =
    right !== undefined
      ? { right }
      : { left: left ?? "30%" }

  return (
    <div className={`relative w-full ${className}`}>
      <div
        className="border-t"
        style={{ borderColor: "var(--hairline)" }}
      />
      <span
        aria-hidden="true"
        className="absolute"
        style={{ ...positionStyle, top: -Math.round(size / 2) - 1 }}
      >
        <Cross variant={variant} size={size} />
      </span>
    </div>
  )
}
