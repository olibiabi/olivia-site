import type { MDXComponents } from "mdx/types"
import { Children, isValidElement } from "react"

/**
 * MDX components for /projects/[slug] (and /lab/[slug]).
 *
 * Deliberately minimal — per Design Doc §6.1 "Do not recreate the
 * float image system". v1's variant parsing (`![alt](src "right")`,
 * `"wide"`, `"center"`, `"left"`) caused the bulk of v1's CSS bugs.
 * In v2 every image is centered + single column with original
 * aspect ratio. Width is controlled by inline style on the img and
 * the `.mdx-article img` global rule (see globals.css), max 800px.
 *
 * The class→className translation for literal `<div class="zh">`
 * JSX in MDX source is handled by the remark plugin in
 * `lib/projects.ts`. All paragraph / heading typography lives in
 * `.mdx-article *` global rules — no per-tag class overrides here.
 */

// Defined as a named function so the p override below can compare
// React element types via `child.type === MdxImg`.
//
// Bare <img> — NO inline style. Styling is owned by CSS scope:
//   .mdx-article img  → /projects detail (60px margin, max 800)
//   .lab-article img  → /lab detail standalone (same defaults)
//   .lab-gallery img  → /lab gallery grid items (2-col 4:3, no margin)
// Inline style here would have specificity 1000 and prevent the
// .lab-gallery override (0,2,1) from ever winning. Letting CSS own
// the sizing keeps each context in charge of its own layout.
function MdxImg({
  src,
  alt,
  className,
}: {
  src?: string
  alt?: string
  className?: string
}) {
  if (!src) return null
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={src} alt={alt ?? ""} className={className} />
  )
}

export const mdxComponents: MDXComponents = {
  // Pass `className` through so `<div className="zh">中文</div>`
  // reaches the DOM with its class intact and the global
  // `.mdx-article .zh` rule can style it.
  div: ({ children, className, ...rest }) => (
    <div className={className} {...rest}>
      {children}
    </div>
  ),

  // Markdown auto-wraps standalone images in <p>. Without this
  // override, an img inside a `<p>` capped at max-width 600px gets
  // constrained to 600px and never reaches its 800px max. Unwrap any
  // p whose only significant child is MdxImg → image becomes a direct
  // child of <article>, where 800px max-width applies unrestricted.
  // Regular text paragraphs (or paragraphs mixing text and images)
  // render normally.
  p: ({ children, ...rest }) => {
    const arr = Children.toArray(children)
    const significant = arr.filter(
      (c) => !(typeof c === "string" && c.trim() === ""),
    )
    const allImages =
      significant.length > 0 &&
      significant.every(
        (c) => isValidElement(c) && c.type === MdxImg,
      )
    if (allImages) {
      return <>{significant}</>
    }
    return <p {...rest}>{children}</p>
  },

  img: MdxImg,
}
