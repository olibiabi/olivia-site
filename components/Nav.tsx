"use client"

import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { Fragment } from "react"
import { useScrollBreathing } from "@/lib/useScrollBreathing"

const NAV_LINKS = [
  { href: "/projects", label: "Projects" },
  { href: "/lab", label: "Lab" },
  { href: "/information", label: "Information" },
] as const

export function Nav() {
  const pathname = usePathname()

  // Globally enable scroll-triggered cross breathing. Nav is rendered
  // on every page (mounted in app/layout.tsx), so this hook only
  // attaches once per page-load.
  useScrollBreathing()

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(href + "/")

  return (
    <header
      className="fixed top-0 left-0 right-0 flex items-center justify-between backdrop-blur-md"
      style={{
        height: 80,
        padding: "20px 48px",
        // Paper at 70% alpha + backdrop-blur(12px) = frosted glass.
        // Content scrolling underneath shows through with color tint.
        backgroundColor: "rgba(253, 246, 238, 0.7)",
        borderBottom: "1px solid rgba(232, 213, 203, 0.5)",
        zIndex: 50,
      }}
    >
      {/* Bean logo — clicks home. No "Olivia Zhu" text by spec. */}
      <Link href="/" aria-label="Home" className="block">
        <Image
          src="/decorations/logo-bean.png"
          alt="Olivia Zhu"
          width={40}
          height={40}
          priority
          unoptimized
          style={{ height: 40, width: "auto", display: "block" }}
        />
      </Link>

      <nav
        className="flex items-center"
        style={{ fontSize: 16, fontWeight: 500 }}
      >
        {NAV_LINKS.map((link, i) => (
          <Fragment key={link.href}>
            {i > 0 && (
              <span
                aria-hidden="true"
                className="select-none"
                style={{
                  margin: "0 18px",
                  color: "var(--ink-mute)",
                }}
              >
                ·
              </span>
            )}
            <NavLink href={link.href} active={isActive(link.href)}>
              {link.label}
            </NavLink>
          </Fragment>
        ))}
      </nav>
    </header>
  )
}

type NavLinkProps = {
  href: string
  active: boolean
  children: React.ReactNode
}

function NavLink({ href, active, children }: NavLinkProps) {
  // Note: text color uses Tailwind `text-ink` class, NOT inline style —
  // inline `style.color` has higher specificity than `:hover` class
  // selectors and would silently disable hover. Letting Tailwind own
  // both default + hover keeps the cascade sane.
  return (
    <Link
      href={href}
      className="inline-flex items-center text-ink transition-colors duration-200 hover:text-rose-deep"
      style={{ fontStyle: active ? "italic" : "normal" }}
    >
      {/* Cross prefix for the current page. Width + opacity transition
          smoothly so the marker "slides out" when route changes,
          masking the binary italic snap. The SVG is rose-deep via
          currentColor on the wrapping span. `cross` class joins the
          global scroll-breathing. */}
      <span
        aria-hidden="true"
        className="cross inline-flex items-center overflow-hidden transition-all duration-300"
        style={{
          width: active ? 14 : 0,
          opacity: active ? 1 : 0,
          marginRight: active ? 8 : 0,
          color: "var(--rose-deep)",
        }}
      >
        {/* 2-block diagonal pixel cross — variant D style. TR + BL
            blocks → "/" diagonal. `shapeRendering="crispEdges"` keeps
            the rectangles pixel-sharp instead of antialiased. */}
        <svg
          width="10"
          height="10"
          viewBox="0 0 2 2"
          fill="currentColor"
          shapeRendering="crispEdges"
        >
          <rect x="1" y="0" width="1" height="1" />
          <rect x="0" y="1" width="1" height="1" />
        </svg>
      </span>
      {children}
    </Link>
  )
}
