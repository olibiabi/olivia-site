# Personal Website — Olivia (Yixuan Zhu)

## Project Context
Personal website for Olivia, a first-year MPS student at NYU ITP with a background in Interaction Design (UAL London College of Communication). The site serves two audiences:
- **Recruiters / hiring managers** → professional portfolio at `/work`
- **Creative community / peers** → experimental work at `/lab`

The visual identity leans toward "fairytale cult" (童话邪典) / dreamcore: decaying textures, Technicolor film grain, surreal atmosphere. Translate this into WebGL and imagery — UI chrome itself stays restrained and legible.

## Tech Stack
- Next.js 15 (App Router, TypeScript)
- Tailwind CSS v4
- React Three Fiber + drei + postprocessing (for WebGL hero / interactive moments)
- Framer Motion (2D transitions)
- MDX for project content (gray-matter + next-mdx-remote)
- Deploying to Vercel

## Content Architecture
- Project content lives in `/content/work/*.mdx` and `/content/lab/*.mdx`
- Each MDX file has frontmatter: `title`, `slug`, `order`, `year`, `cover`, `tools`, `role`, `tags`, `media[]`
- Images in `/public/images/projects/<slug>/` and `/public/images/lab/<slug>/`
- `media[]` array supports types: `image`, `youtube`, `video-loop`
- Sort projects by `order` field (use multiples of 10 to allow easy reordering)

## Routes
- `/` — landing page with WebGL hero
- `/work` — project grid (professional portfolio)
- `/work/[slug]` — single project detail page
- `/lab` — experimental works grid
- `/lab/[slug]` — single lab piece
- `/about` — bio + resume download
- `/contact` — contact info + social

## Design Principles
1. **Performance first.** WebGL scenes must hit 60fps on a 2019 MacBook Air. Simplify before adding effects.
2. **One hero effect per page.** Don't stack five shaders.
3. **Mobile fallback always.** On mobile, replace heavy WebGL with static image. Detect via `window.matchMedia('(max-width: 768px)')` and `prefers-reduced-motion`.
4. **Accessibility.** All interactive elements need keyboard navigation. Provide a "reduce motion" toggle.
5. **Typography carries the brand.** One serif (display) + one mono/sans (body). No more than 2 typefaces.

## Coding Conventions
- Components in `/components`, organized as `/components/three/` (R3F) and `/components/ui/` (DOM)
- Use `next/image` for all raster images
- Shaders in `/shaders/*.glsl`
- Never commit `node_modules`, `.next`, `.env.local`, `_raw-assets/`

## What to Ask Before Coding
- Is this for `/work` (professional) or `/lab` (experimental)? Different visual rules apply.
- Is there a simpler version we should ship first?
- Does this need to work on mobile?

## What NOT to Do
- Do not install heavy 3D libraries (Babylon, PlayCanvas) — stick with R3F.
- Do not write inline shaders longer than 20 lines — extract to a `.glsl` file.
- Do not autoplay audio.
- Do not animate inside R3F using Framer Motion — use R3F's own `useFrame` or react-spring.

## Current Content
Three work projects (in `/public/images/projects/`):
1. `project-01-time-will-tell-vj-project` — VJ performance project
2. `project-02-wear-or-not-animation` — animation work
3. `project-03-mountains-must-have-stones-curation` — curation project

Lab content (in `/public/images/lab/`):
- `midjourney-fairytale-cult` — AI-generated visual series (3 images, more videos coming)
- `sketches` — 13 sketches (will curate to ~6-8 strongest)

Videos: some on YouTube (Unlisted), more being uploaded. Local short loops will be added later for VJ and Midjourney pieces.
