# Olivia Zhu Portfolio — Design Doc v2.0 (FINAL)

**Last updated:** 2026-04-30
**Status:** All 5 pages finalized, ready to implement

---

## Table of Contents

1. [Visual System](#1-visual-system)
2. [Global Components](#2-global-components)
3. [Page Designs](#3-page-designs)
   - 3.1 / (Home)
   - 3.2 /projects (List)
   - 3.3 /projects/[slug] (Detail)
   - 3.4 /lab (List)
   - 3.5 /lab/[slug] (Detail)
   - 3.6 /information
4. [Animations & Interactions](#4-animations--interactions)
5. [Implementation Plan](#5-implementation-plan)
6. [Known Risks](#6-known-risks)
7. [Content Inventory](#7-content-inventory)

---

## 1. Visual System

### 1.1 Colors

```css
/* Backgrounds */
--paper: #FDF6EE;          /* Cream — main background */

/* Text */
--ink: #5B3A35;            /* Deep brown-red — same as logo */
--ink-soft: #8A6E68;       /* Sub-text */
--ink-mute: #B5A099;       /* Footnotes, placeholders */

/* Accent */
--rose-deep: #C45670;      /* Buttons, current-page marker, year italics */
--rose-soft: #F0BFC0;      /* Decoration primary */
--rose-light: #F4D1D5;     /* Hover states */

/* Lines */
--hairline: #E8D5CB;
```

**Color rules:**
- Background is always `--paper`
- Body text is `--ink`
- Sub-text (Chinese paragraphs, captions, dates) is `--ink-soft`
- Year numbers always italic + `--rose-deep`
- CTAs (PROJECTS, Download Resume) always `--rose-deep` background, `--paper` text
- Hover states transition to `--rose-deep`

### 1.2 Typography

**Fonts:**
- English: `Inter` (weights 400, 500)
- Chinese: `Noto Sans SC` (weights 400, 500)
- Year/dates: `Inter Italic`

**Type scale:**

| Size | Use |
|------|-----|
| 56px | Project detail title (Time Will Tell) |
| 48px | Lab detail title (I Am A Cow) |
| 36px | List page H1 (Projects, Lab, Information) |
| 28px | Information page Olivia Zhu name |
| 24px | Detail subheadings |
| 22px | List page project titles |
| 18px | Home page tagline / detail year |
| 16px | Body text |
| 14px | Sub-text / nav links |
| 13px | Small text (Back link, footer) |
| 12px | Footer copyright |
| 11px | ALL CAPS labels (PREVIOUS, EDUCATION) |

**No serif fonts. No script/handwriting fonts.**
Previous attempt to use Fraunces was rejected — Inter is the final choice.

### 1.3 Spacing

```
xs   4px
sm   8px
md   16px
lg   24px
xl   32px
2xl  48px
3xl  80px
4xl  120px
```

**Page margins:** `padding: 0 80px` on desktop. (Mobile: `0 24px`.)

### 1.4 Decorative Elements

**Pixel crosses** — using user-provided PNGs (4 variants):
- Variant A (image 1): brown body + pink center → 35% of usage (primary)
- Variant B (image 2): pink body + brown center → 35% of usage (primary)
- Variant C (image 3): multi-color spliced cross → 20% of usage (accent)
- Variant D (image 4): minimal 2-block diagonal → 10% of usage (whitespace)

**Sizing:** 8px / 10px / 12px / 14px / 16px / 24px (mixed, not uniform)

**Rules:**
- Never on top of text content
- Always asymmetric placement (no grids, no rows)
- Background crosses: opacity 0.13–0.20 (subtle wallpaper feel)
- Foreground crosses: opacity 0.7–0.9

---

## 2. Global Components

### 2.1 Header (all pages)

```
Height: 80px
Padding: 20px 48px

Left: Bean logo PNG (40px height)
Right: Projects · Lab · Information

Nav link rules:
- 14px / weight 500
- Color: ink
- Hover: color → rose-deep (0.2s)
- Current page: italic + 8px rose-deep cross prefix
```

**Current page indicator:**
```html
<span class="nav-link current">
  <span class="cross">[2x2 px grid]</span>
  Projects
</span>
```

### 2.2 Footer (all pages)

```
Hairline: 1px solid #E8D5CB
Margin: 24px 48px 0
Padding: 16px 0
Text: "© 2026 Olivia Zhu / 朱怡宣"
Style: 12px / ink-mute / center
```

### 2.3 Section Dividers

Between content sections, use a hairline with embedded cross:

```
- 1px solid #E8D5CB, full content width
- One cross sits ON the line, centered vertically (top: -7px)
- Cross position varies per divider: 18% / 22% (right) / 36% / 42% / etc.
- Cross size: 12px or 14px
- Cross uses one of 3 PNG variants (rotate through)
```

### 2.4 PROJECTS Button (CTA)

```css
background: var(--rose-deep);
color: var(--paper);
border: none;
border-radius: 24px;
padding: 13px 36px;
font-size: 13px;
font-weight: 500;
letter-spacing: 0.05em;
text-transform: uppercase;

hover {
  background: var(--ink);
  transition: background 0.2s ease;
}
```

Used on: Home page, Information page (Download Resume).

### 2.5 Tag Pills (Lab page filter)

```css
default {
  padding: 6px 14px;
  border: 1px solid var(--hairline);
  border-radius: 16px;
  font-size: 12px;
  font-weight: 500;
  color: var(--ink-soft);
  background: transparent;
}

hover {
  border-color: var(--rose-deep);
  color: var(--rose-deep);
}

active {
  background: var(--ink);
  color: var(--paper);
  border-color: var(--ink);
}
```

---

## 3. Page Designs

### 3.1 Home — `/`

**Structure:**
```
[Header]

[Vertical center]
  Bean logo (180px) + breathing animation (6s)
  Scattered crosses (9 total, asymmetric)

[Below logo, left-aligned at padding-left: 80px, max-width: 580px]
  Art × Design × AIGC                              ← 18px / 500 / ink
  Exploring interaction design where               ← 14px / 400 / ink-soft
  visuals, technology, and people meet.            ← 14px / 400 / ink-soft
  
  [PROJECTS button]

[Footer]
```

**Logo breathing animation:**
```css
@keyframes breathe {
  0%, 100% { transform: translateY(0) scale(1); }
  50% { transform: translateY(-4px) scale(1.02); }
}
animation: breathe 6s ease-in-out infinite;
```

**Cross positions (approximate, must be asymmetric):**
- top:140 left:80 / top:200 left:280 / top:130 right:220
- top:220 right:80 / top:320 left:150 / top:380 right:140
- top:460 right:320 / top:420 right:60 / bottom:280 left:200

---

### 3.2 Projects List — `/projects`

**Structure:**
```
[Header]
[Page title: "Projects" 36px + sub-text]
[Top hairline + cross @ 18%]

[Row 1] (grid-cols: 60px 380px 1fr; gap: 32px)
  2024     [cover 4:3]    Time Will Tell
                          VJ Performance · 现场视听演出
                          (16px gap)
                          A live audiovisual performance...

[Hairline + cross @ 22% (right)]

[Row 2]
  ...

[Hairline + cross @ 36%]

[Row 3]
  ...

[Hairline + cross @ 28% (right)]

[Footer]
```

**Row styling:**
- Year: 14px italic rose-deep
- Cover: 4:3 aspect, no border-radius, object-fit: cover
- Title: 22px / 500 / ink, hover → rose-deep
- Type: 13px / ink-soft, format "EN · 中文"
- Summary: 14px / ink, 1.6 line-height, max-width 480px

**Row hover:**
```
- Whole row translateY(-3px), 0.3s ease
- Cover image scale(1.02), 0.4s ease
- Title color → rose-deep, 0.2s ease
- "→" arrow appears next to title (fade in + slide from -8px)
```

**Order:** By frontmatter `order` field, descending year.

---

### 3.3 Project Detail — `/projects/[slug]`

**Structure:**
```
[Header]

[← Back to Projects] (13px / ink-soft / hover rose-deep)

[Centered title block, padding: 80px 80px 40px]
  Time Will Tell                       ← 56px / 500 / ink
  2024                                 ← 18px italic / rose-deep
  VJ PERFORMANCE                       ← 14px / ALL CAPS / letter-spacing 0.05em
  TouchDesigner · MadMapper · Ableton  ← 13px / ink-soft

[Cover image, max-width 800px, centered, 4:3]

[Body text — JUSTIFIED + center last line]
  English paragraph (16px / 1.8 line-height / ink)
  Chinese paragraph (14px / 1.9 / ink-soft)
  
[Image 2, max-width 800px, centered, can be 16:9]

  More body text...

[Image 3...]

[Hairline + cross @ 42%]

[Prev/Next nav]
  PREVIOUS                              NEXT
  ← Wear or Not                         Mountains Must Have Stones →

[Footer]
```

**Body text alignment:**
```css
text-align: justify;
text-align-last: center;
max-width: 600px;
margin: 0 auto;
```

**This is editorial magazine style — important for the dreamcore/画册 aesthetic.**

**Image rules (CRITICAL — past attempts failed here):**
- All images centered, single column, no float
- Max-width 800px
- Original aspect ratio preserved (no cropping)
- 60px margin-bottom between sections
- **NO float left / float right / variants — period.**

**Prev/Next nav:**
- Linear, NOT circular
- First project: hide PREVIOUS
- Last project: hide NEXT
- 11px ALL CAPS label + 16px / 500 project name

---

### 3.4 Lab List — `/lab`

**Structure:**
```
[Header]
[Page title: "Lab" 36px + sub-text bilingual]
[Tag filter row: All / AIGC / One Minute Movie / Graphic Design / Sketches / Photography]

[Grid: 3 columns, gap 20px]
  [Card 1: 4:5 cover]   [Card 2]   [Card 3]
  [Card 4]              [Card 5]   [Card 6]
  ...

[Hairline + cross]
[Stats: "9 collections"]
[Footer]
```

**Card hover:**
```
- Card translateY(-4px)
- Cover image scale(1.02)
- Bottom info bar fades in:
    background: linear-gradient bottom (rgba(91,58,53,0.95) → 0)
    color: paper
    padding: 32px 16px 14px
    Title (14px / 500) + INFO (11px / 0.85 opacity / letter-spacing 0.04em)
```

**Tag filter:**
- Default: All selected
- Single-select (clicking new tag swaps active)
- Filter is client-side based on frontmatter `tag` field
- Order within each tag: by frontmatter `order` field

**Lab projects (initial):**

| Tag | Projects |
|-----|----------|
| One Minute Movie | I Am A Cow / Trapped in a Waking Dream / Wedding Fantasy |
| Sketches | 看展随笔 / Motion Graphic Experiments / 其他插画 |
| Photography | 旅游日记 |
| AIGC | AIGC Animation Experiments |
| Graphic Design | (TBD by user) |

---

### 3.5 Lab Detail — `/lab/[slug]`

**Lighter than /projects/[slug].** Less story, more visual.

**Structure:**
```
[Header]
[← Back to Lab]

[Centered intro block]
  ONE MINUTE MOVIE · 2024              ← 12px / 500 / rose-deep / letter-spacing 0.1em
  I Am A Cow                           ← 48px / 500 / ink
  English short description            ← 14px / ink-soft / max-width 540px
  中文简短说明                          ← 13px / ink-mute / max-width 540px

[YouTube embed area, 16:9, max-width 900px, centered]
  (For One Minute Movie type only — other types skip this)

[Image grid, 2 columns, gap 16px, max-width 900px]
  [Image 1 4:3] [Image 2 4:3]
  [Image 3 4:3] [Image 4 4:3]

[Hairline + cross]

[Prev/Next within same tag (loop within tag, not across tags)]
  PREVIOUS                              NEXT
  ← Wedding Fantasy                     Trapped in a Waking Dream →

[Footer]
```

**Per-tag prev/next:**
- Within "One Minute Movie": cycle through 3 projects
- Within "Sketches": cycle through 3 collections
- etc.

---

### 3.6 Information — `/information`

**Two-column structure:**
```
[Left col: 200px / Right col: 1fr / gap: 48px / max-width: 900px]

[Page title "Information" 36px - spans full width]

[Background crosses scattered LEFT-HEAVY]
  - 10 crosses on left side (label column area), opacity 0.15-0.20
  - 2 crosses on right side (only in paragraph gaps), opacity 0.13
  - LEFT MUST HAVE MORE THAN RIGHT — text on right is dense

[Section 1: Bio] (no left label, just content on right)
  Olivia Zhu                     ← 28px / 500 / ink
  朱怡宣                         ← 16px / ink-soft
  
  English paragraph              ← 16px / 1.8 / ink
  Chinese paragraph              ← 14px / 1.9 / ink-soft
  
  English paragraph
  Chinese paragraph

[Hairline + cross @ 24%]

[Section 2: EDUCATION]
  EDUCATION (left col label, 14px / 500 / letter-spacing 0.05em / ink-soft)
  
  Right col:
    [year 130px][content]
    2025 — 2027  MPS, Interactive Telecommunications
                 NYU Tisch School of the Arts
    
    2019 — 2023  BA (Hons), Interaction Design Art
                 UAL London College of Communication · First-class honors

[Hairline + cross @ 30% (right)]

[Section 3: EXPERIENCE]
  EXPERIENCE
  
  [year 130px][content]
  2025 — present  [Position / Role]
                  [Organization]
                  Brief description
  
  2024            [Position]
                  [Organization]
                  Brief description
  
  More to be added.   ← 13px italic ink-mute

[Hairline + cross @ 42%]

[Section 4: CONTACT]
  CONTACT
  
  EMAIL (11px label)
  yz12054@nyu.edu   ← 16px contact-link with hover
  
  ELSEWHERE (11px label)
  LinkedIn  Instagram  GitHub  小红书   ← 15px contact-links inline
  
  [Download Resume ↓ button]

[Footer]
```

**Contact link styling:**
```css
.contact-link {
  color: var(--ink);
  border-bottom: 1px solid var(--hairline);
  padding-bottom: 1px;
  text-decoration: none;
  transition: all 0.2s ease;
}
.contact-link:hover {
  color: var(--rose-deep);
  border-bottom-color: var(--rose-deep);
}
```

---

## 4. Animations & Interactions

### 4.1 Cross "Scroll Breathing"

**Globally on all pages.** When user scrolls, all visible crosses pulse scale 1 ↔ 1.15 in 1.2s loop. When scroll stops 150ms, crosses freeze at scale 1.

**Implementation:**
```js
// Add `.breathing` class on scroll start
// Remove `.breathing` class 150ms after scroll end
```

```css
.breathing {
  animation: breathePulse 1.2s ease-in-out infinite;
}
@keyframes breathePulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.15); }
}
```

This applies to:
- Background scattered crosses (Information page especially)
- Crosses on hairline dividers
- Crosses in nav indicators
- Cross next to current-page marker

### 4.2 Logo Breathing (Home only)

```css
@keyframes breathe {
  0%, 100% { transform: translateY(0) scale(1); }
  50% { transform: translateY(-4px) scale(1.02); }
}
animation: breathe 6s ease-in-out infinite;
```

Always running on home page center logo, regardless of scroll.

### 4.3 Hover States Reference

| Element | Hover effect |
|---------|--------------|
| Nav link | color → rose-deep, 0.2s |
| Project list row | translateY(-3px), cover scale(1.02), title → rose-deep, → arrow appears |
| Lab card | translateY(-4px), cover scale(1.02), info bar fades in |
| PROJECTS button | background → ink |
| Tag pill | border + color → rose-deep |
| Contact link | color + border → rose-deep |
| Back link | color → rose-deep |
| Prev/Next nav | color → rose-deep |

### 4.4 Page Transitions

NOT implementing custom page transitions in v1.
Default Next.js navigation behavior is fine. Add later if needed.

---

## 5. Implementation Plan

### Stage 1: Foundation Rebuild
**Objective:** Reset the entire visual system. Old code stays for content/structure, but Nav, colors, fonts, and decorations are rewritten.

Files to modify:
- `app/globals.css` — full rewrite with new color/font system
- `app/layout.tsx` — swap fonts (Inter + Noto Sans SC)
- `components/Nav.tsx` — full rewrite with new structure
- New: `components/Cross.tsx` — reusable cross component
- New: `components/CrossField.tsx` — scattered crosses
- New: `components/HairlineWithCross.tsx` — section divider
- New: `lib/useScrollBreathing.ts` — scroll-triggered breathing hook
- New: `public/decorations/` — host the 4 PNG files (logo + 3 cross variants)
- Rename: `app/work/` → `app/projects/`

**Verification:** Loading the site shows new colors, new fonts, new nav. Routes work but pages still empty.

### Stage 2: Home Page

Files:
- `app/page.tsx` — full rewrite
- Bean logo with breathing animation
- 9 scattered crosses
- Tagline + PROJECTS button

**Verification:** Home page matches mockup.

### Stage 3: Projects List + Detail

Files:
- `app/projects/page.tsx` — list page (3-column grid → year/cover/text rows)
- `app/projects/[slug]/page.tsx` — full rewrite, NO float images
- `lib/mdx-components.tsx` — simplify image component (centered only)
- `app/globals.css` — add `.mdx-article` styles for centered + justified text

**Important:** This page was the source of all previous bugs. Implementation must use:
- All images centered, max-width 800px, no variants
- `text-align: justify; text-align-last: center;`
- No `class` attribute → custom div component handles class→className

**Verification:** Detail page matches mockup with images and bilingual text.

### Stage 4: Lab List + Detail

Files:
- `app/lab/page.tsx` — new list page with tag filter
- `app/lab/[slug]/page.tsx` — new detail page
- `content/lab/` — new MDX directory
- `lib/lab.ts` — getLabProjects, getLabProject (similar to projects.ts)
- New: `components/TagFilter.tsx`
- New: `components/YouTubeEmbed.tsx` (for One Minute Movie type)

**Verification:** Lab page filters by tag, detail page shows YouTube embed for OMM type.

### Stage 5: Information Page

Files:
- `app/information/page.tsx` — new
- `public/resume.pdf` — placeholder, user uploads real one later

**Verification:** Information page matches mockup, Download Resume button works.

### Stage 6: Polish + Deploy

- Sound check all hover states
- Test on mobile (responsive)
- Run scroll-breathing on all pages
- Deploy to Vercel
- Hook up custom domain if desired

---

## 6. Known Risks (Lessons from Previous Attempts)

### 6.1 ❌ DO NOT recreate the float image system

Previous attempts to support `![](path "right")`, `"left"`, `"wide"`, `"center"` variants caused:
- CSS specificity wars
- aspect-ratio not applying due to selector mismatches  
- Multiple consecutive images breaking float behavior
- Connected `clear: both` bugs that cascaded into total CSS failure

**This time:** All MDX images are centered, single column. Period.
If user wants a wider/narrower image, control via `max-width` on the image, not via variants.

### 6.2 ❌ DO NOT use `<div class="zh">` directly in MDX

React strips `class`. Need either:
- Custom div component in `lib/mdx-components.tsx` that maps `class` → `className`, OR
- rehype plugin that does the rename

**This time:** Use the custom div component approach (already worked in v1).

### 6.3 ❌ DO NOT mix aspect-ratio + object-fit + width together

User explicitly said no cropping. Their photos are storytelling assets — cropping loses content.

**This time:**
- /projects detail images: original ratio, max-width 800px
- /lab list cards: forced 4:5 cover (these ARE cropped, but with intent)
- /lab detail images: 4:3 (standardized but minimal)

### 6.4 ⚠️ Watch for Turbopack cache issues

If CSS changes don't appear after save:
1. `rm -rf .next`
2. Restart dev server
3. Hard refresh browser (Cmd+Shift+R)

### 6.5 ⚠️ Decorative crosses must `pointer-events: none`

Otherwise they block clicks on text/links beneath them.

### 6.6 ⚠️ Z-index management

```
Background crosses: z-index 1 (or no z-index, default)
Content layer: position: relative, z-index: 2
Header: z-index: 10
Hover overlays / modals: z-index: 50+
```

### 6.7 ⚠️ Linear vs circular prev/next

User chose **linear**: first project hides PREVIOUS, last project hides NEXT.
DO NOT cycle around.

### 6.8 ⚠️ Copy/Paste error: User's Chinese name

It is **朱怡宣** (Zhu Yixuan), NOT 朱诗萱.
This was wrong in earlier code. All footer text and Information page must use 朱怡宣.

---

## 7. Content Inventory

### What user has:
- ✅ Bean logo PNG (`/public/decorations/logo-bean.png`)
- ✅ 3 cross variant PNGs (`/public/decorations/cross-a.png`, `-b.png`, `-c.png`)
- ✅ Project covers for 3 projects (already in `/public/images/projects/...`)
- ✅ Some process images for Time Will Tell project

### What user needs to add later:
- [ ] Project body content (200-500 words English + 100-200 Chinese per project)
- [ ] Lab project covers and image sets
- [ ] YouTube video URLs for One Minute Movie projects
- [ ] Information page bio refinement
- [ ] Education + Experience details
- [ ] Resume PDF
- [ ] LinkedIn / Instagram / GitHub / 小红书 actual URLs

### Initial placeholder content:
- Use TODO 待补充 in MDX for unfinished sections
- All images can use placeholder colors (gradients) until real images uploaded
- Site should look complete with dummy content while user fills in real content over time
