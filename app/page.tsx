import Image from "next/image"
import Link from "next/link"
import { CrossField, type CrossSpec } from "@/components/CrossField"

// 15 crosses with explicit per-variant pixel dimensions:
//   A 30×30, B 30×30, C 35×28 (non-square), D 26×26.
// Counts: a=4, b=4, c=4, d=3. opacity defaults to 1.0 (Cross's new
// default), so no `opacity` field needed.
//
// Coordinates are sourced from a 1392px-wide Figma artboard. All `top`
// values are 160 less than the Figma Y to land in the right place once
// the 80px sticky Nav and the additional vertical offset above the
// CrossField anchor are accounted for.
const homeCrosses: CrossSpec[] = [
  { top: 53, left: 200, variant: "d", width: 26, height: 26, delay: 0 },
  { top: 69, left: 590, variant: "b", width: 30, height: 30, delay: -0.4 },
  { top: 136, left: 846, variant: "a", width: 30, height: 30, delay: -0.8 },
  { top: 116, left: 1223, variant: "b", width: 30, height: 30, delay: -1.2 },
  { top: 201, left: 336, variant: "c", width: 35, height: 28, delay: -1.6 },
  { top: 226, left: 1034, variant: "c", width: 35, height: 28, delay: -2.0 },
  { top: 282, left: 167, variant: "b", width: 30, height: 30, delay: -2.4 },
  { top: 316, left: 1263, variant: "a", width: 30, height: 30, delay: -0.2 },
  { top: 398, left: 74, variant: "a", width: 30, height: 30, delay: -0.6 },
  { top: 372, left: 470, variant: "d", width: 26, height: 26, delay: -1.0 },
  { top: 439, left: 1001, variant: "b", width: 30, height: 30, delay: -1.4 },
  { top: 502, left: 1263, variant: "c", width: 35, height: 28, delay: -1.8 },
  { top: 591, left: 404, variant: "c", width: 35, height: 28, delay: -2.2 },
  { top: 548, left: 742, variant: "a", width: 30, height: 30, delay: -2.6 },
  { top: 604, left: 958, variant: "d", width: 26, height: 26, delay: -0.5 },
]

export default function Home() {
  return (
    // Layout: relative outer (anchors CrossField), flex column.
    // Logo block uses flex-1 + items-center to vertically center the
    // logo in the upper region (above the text container).
    <div className="relative min-h-[calc(100vh-80px)] flex flex-col">
      {/* `alwaysBreathing` makes every cross run the breathePulse
          animation from page load on the home page only. Other pages
          don't pass this prop, so their crosses only animate while
          scrolling (driven by the global `body.scrolling .cross` rule
          in globals.css). */}
      <CrossField
        crosses={homeCrosses}
        className="hidden md:block"
        alwaysBreathing
      />

      {/* Logo — static, no animation. Centered both axes within the
          flex-1 area. z-10 lifts above the cross field. */}
      <div className="relative z-10 flex-1 flex items-center justify-center">
        <Image
          src="/decorations/logo-bean.png"
          alt="Olivia Zhu"
          width={240}
          height={240}
          priority
          unoptimized
          className="h-[180px] w-[180px] translate-y-8 md:h-[240px] md:w-[240px] md:translate-y-[60px]"
          // translateY shifts the rendered logo 60px down without
          // affecting flex centering math (transform is visual only).
          style={{
            display: "block",
          }}
        />
      </div>

      {/* Tagline + CTA — left-aligned, max width 580. */}
      <div className="relative z-10 max-w-[580px] px-5 pb-16 md:px-20 md:pb-24">
        <p className="text-[20px] font-medium text-ink mb-2">
          Art × Design × AIGC
        </p>
        <p className="text-[15px] text-ink-soft leading-relaxed">
          Exploring interaction design where
        </p>
        <p className="text-[15px] text-ink-soft leading-relaxed mb-7">
          visuals, technology, and people meet.
        </p>

        <Link
          href="/projects"
          className="inline-block bg-rose-deep text-paper rounded-3xl px-10 py-4 text-[13px] font-medium tracking-wider uppercase transition-colors duration-200 hover:bg-ink"
        >
          Projects
        </Link>
      </div>
    </div>
  )
}
