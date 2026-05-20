/* eslint-disable @next/next/no-img-element */

export type CrossVariant = "a" | "b" | "c" | "d"

type CrossProps = {
  variant?: CrossVariant
  /**
   * Square shortcut — sets both width and height to this value.
   * If `width`/`height` are also provided, they take precedence.
   */
  size?: number
  /** Explicit width in px (e.g. variant C is 35×28, not square). */
  width?: number
  /** Explicit height in px. */
  height?: number
  opacity?: number
  className?: string
  /**
   * When true, the cross runs the `breathePulse` animation
   * unconditionally — independent of body.scrolling. Used on the home
   * page where crosses should pulse from page load. Other pages leave
   * this false and the global `body.scrolling .cross` rule in
   * globals.css drives the animation only while scrolling.
   */
  alwaysBreathing?: boolean
  /**
   * Animation delay in seconds. Use negative values to offset start
   * positions across multiple crosses so they don't pulse in lockstep.
   * Only effective when `alwaysBreathing` is true.
   */
  delay?: number
}

/**
 * A pixel-cross decoration (PNG asset). Four variants per the design:
 *   A — brown background + pink center (workhorse)
 *   B — pink background + brown center (workhorse)
 *   C — composite cross (accent)
 *   D — minimal 2-block diagonal (sparingly; nav active marker)
 * Source files at `/public/decorations/cross-{a,b,c,d}.png`.
 *
 * The wrapping <span> carries the `cross` class — globals.css uses
 * `body.scrolling .cross { animation: breathePulse ... }` for the
 * scroll-triggered breathing effect, AND `.cross { pointer-events: none }`
 * so crosses never block clicks on text or links beneath them.
 *
 * Plain <img> rather than next/image: these are tiny (8–24px) decorative
 * assets where Next.js's optimization pipeline adds more overhead than
 * benefit, and bypassing it lets us animate `transform: scale()` cleanly
 * without next/image's wrapping span getting in the way.
 */
export function Cross({
  variant = "a",
  size,
  width,
  height,
  opacity = 1,
  className = "",
  alwaysBreathing = false,
  delay = 0,
}: CrossProps) {
  // Width/height resolution: explicit width/height win over `size`.
  // If neither is given, fall back to a 12px default.
  const w = width ?? size ?? 12
  const h = height ?? size ?? 12
  return (
    <span
      className={`cross inline-block ${className}`}
      style={{
        opacity,
        lineHeight: 0,
        ...(alwaysBreathing && {
          animationName: "breathePulse",
          animationDuration: "3s",
          animationTimingFunction: "ease-in-out",
          animationIterationCount: "infinite",
          animationDelay: `${delay}s`,
        }),
      }}
    >
      <img
        src={`/decorations/cross-${variant}.png`}
        alt=""
        width={w}
        height={h}
        style={{ width: w, height: h, display: "block" }}
      />
    </span>
  )
}
