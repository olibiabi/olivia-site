import type { Metadata } from "next"
import { Inter, Noto_Sans_SC } from "next/font/google"
import { Nav } from "@/components/Nav"
import "./globals.css"

// Inter — primary English UI + body face. Weights 400/500 cover all
// design-doc text scales without dipping into bolder weights.
const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500"],
  style: ["normal", "italic"],
  variable: "--font-inter",
  display: "swap",
})

// Noto Sans SC — Chinese glyphs. `subsets: ["latin"]` is intentional
// (next/font/google does not accept `chinese-simplified` as a subset
// name); the served stylesheet still ships Chinese via unicode-range
// loaded on demand. `preload: false` skips preloading the large file.
const notoSansSC = Noto_Sans_SC({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-noto-sans-sc",
  display: "swap",
  preload: false,
})

export const metadata: Metadata = {
  title: "Olivia Zhu — 朱怡宣",
  description: "Personal portfolio of Olivia Zhu (朱怡宣).",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${notoSansSC.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Nav />
        {/* `flex-1` pushes the footer to the bottom of the viewport
            even when the page content is short (e.g. home page).
            `pt-20` (80px) reserves space for the fixed Nav above —
            without it, the first 80px of content would render under
            the frosted-glass nav. */}
        <div className="flex-1 pt-20">{children}</div>
        <footer className="border-t border-hairline mx-12 mt-6 py-4 text-center">
          <span className="text-xs text-ink-mute">
            © 2026 Olivia Zhu / 朱怡宣
          </span>
        </footer>
      </body>
    </html>
  )
}
