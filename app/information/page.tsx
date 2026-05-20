import { CrossField, type CrossSpec } from "@/components/CrossField"
import { HairlineWithCross } from "@/components/HairlineWithCross"

const informationCrosses: CrossSpec[] = [
  // Left-heavy background field: these sit in the label/empty margin area.
  { top: 280, left: 60, variant: "a", width: 26, height: 26, opacity: 0.18 },
  { top: 380, left: 180, variant: "b", width: 22, height: 22, opacity: 0.15 },
  { top: 520, left: 30, variant: "c", width: 24, height: 24, opacity: 0.2 },
  { top: 700, left: 120, variant: "d", width: 18, height: 18, opacity: 0.18 },
  { top: 820, left: 50, variant: "b", width: 22, height: 22, opacity: 0.16 },
  { top: 1020, left: 200, variant: "a", width: 28, height: 28, opacity: 0.18 },
  { top: 1180, left: 30, variant: "b", width: 22, height: 22, opacity: 0.16 },
  { top: 1340, left: 130, variant: "c", width: 24, height: 24, opacity: 0.18 },
  { top: 1480, left: 60, variant: "a", width: 26, height: 26, opacity: 0.2 },
  { top: 1640, left: 180, variant: "d", width: 18, height: 18, opacity: 0.16 },

  // Right side stays sparse and faint so it does not compete with body copy.
  { top: 660, right: 80, variant: "d", width: 18, height: 18, opacity: 0.13 },
  { top: 1380, right: 100, variant: "d", width: 18, height: 18, opacity: 0.13 },
]

const educationItems = [
  {
    year: "2025 — 2027",
    title: "MPS, Interactive Telecommunications Program",
    organization: "NYU Tisch School of the Arts",
    organizationZh: "互动通信项目硕士，纽约大学 Tisch 艺术学院",
  },
  {
    year: "2021 — 2024",
    title: "BA (Hons), Interaction Design Arts",
    organization:
      "UAL London College of Communication · First-class honors",
    organizationZh:
      "互动设计与艺术荣誉学士，伦敦艺术大学伦敦传媒学院 · 一等荣誉学位",
  },
] as const

const experienceItems = [
  {
    year: "2025",
    title: "AI Film Hackathon — NYU ITP × Ponder AI",
    description:
      "Created a retro Flash-inspired AI short film awarded Best Film and Funnest Film. Built the full workflow across Midjourney, Runway, Kling, and CapCut.",
    descriptionZh:
      "以 2000s 复古 Flash 风格创作 AI 短片，获得 Best Film 与 Funnest Film 双奖；完成从视觉风格定义、AI 影像生成到剪辑交付的完整流程。",
  },
  {
    year: "2025",
    title: "Time Will Tell — AI Visual VJ Project",
    description:
      "An audiovisual experiment combining illustration, stop-motion aesthetics, and AI-generated moving image workflows inspired by Hikaru Utada’s music.",
    descriptionZh:
      "以宇多田光同名歌曲为灵感，结合插画、定格动画美学与 AI 动态影像工作流，探索音乐节奏、情绪叙事与生成式视觉之间的关系。",
  },
  {
    year: "2024",
    title: "“Mountains Must Have Stones” Chinese Painting Exhibition",
    description:
      "Led exhibition identity, visual design, and curatorial coordination for a contemporary Chinese painting showcase in Hangzhou.",
    descriptionZh:
      "主导杭州当代中国画展览的主题策划、视觉设计与策展协调，包括海报、邀请函及整体视觉方案。",
  },
  {
    year: "2023",
    title: "Science Museum Lates — “Fake”",
    description:
      "Led a collaborative interactive exhibition project developed with the Science Museum in London, focusing on participation and speculative media experiences.",
    descriptionZh:
      "带领团队完成伦敦科学博物馆互动展览项目提案与执行，围绕参与式体验与媒介真实/虚构关系展开创作。",
  },
] as const

export default function InformationPage() {
  return (
    <div className="relative min-h-[calc(100vh-80px)] pb-10">
      <CrossField crosses={informationCrosses} className="hidden md:block" />

      <div className="relative z-10 px-5 md:px-20 pt-10 pb-4">
        <h1 className="text-4xl font-medium text-ink">Information</h1>
      </div>

      <main className="relative z-10 px-5 md:px-20">
        <section className="grid min-w-0 gap-8 md:grid-cols-[200px_1fr] md:gap-12 max-w-[900px] mx-auto pt-8 pb-12">
          <div aria-hidden="true" className="hidden md:block" />
          <div className="min-w-0">
            <h2 className="text-[28px] font-medium text-ink mb-1">
              Olivia Zhu / 朱怡宣
            </h2>

            <div className="mt-6 space-y-7">
              <BioPair
                en="First-year MPS student at the Interactive Telecommunications Program (ITP), NYU Tisch School of the Arts. Based between New York and Hangzhou."
                zh="我目前在 NYU Tisch School of the Arts 互动通信项目（ITP）攻读 MPS 一年级，生活和工作在纽约与杭州之间。"
              />
              <BioPair
                en="My practice moves across AI-generated imagery, interaction design, moving image, and curatorial experiences — exploring how emerging technologies reshape emotional perception, storytelling, and participation."
                zh="我的实践横跨 AI 生成影像、互动设计、动态视觉与策展体验，关注新兴技术如何重塑情绪感知、叙事方式与观众参与。"
              />
              <BioPair
                en="Through installations, speculative visuals, digital interfaces, and audiovisual experiments, I build systems that blur boundaries between art, media, and machine-generated creation."
                zh="我通过装置、数字界面、视听实验与生成式影像，探索艺术、媒介与机器生成创作之间不断变化的边界。"
              />
            </div>
          </div>
        </section>

        <Divider left="24%" variant="b" />

        <InfoSection label="EDUCATION">
          <div className="space-y-7">
            {educationItems.map((item) => (
              <TimelineItem key={item.year} year={item.year}>
                <h3 className="text-base font-medium text-ink">
                  {item.title}
                </h3>
                <p className="text-sm text-ink-soft mt-1">
                  {item.organization}
                </p>
                <p className="text-sm leading-[1.9] text-ink-soft mt-1">
                  {item.organizationZh}
                </p>
              </TimelineItem>
            ))}
          </div>
        </InfoSection>

        <Divider right="30%" variant="a" />

        <InfoSection label="EXPERIENCE">
          <div className="space-y-7">
            {experienceItems.map((item) => (
              <TimelineItem key={`${item.year}-${item.title}`} year={item.year}>
                <h3 className="text-base font-medium text-ink">
                  {item.title}
                </h3>
                <p className="text-sm leading-[1.8] text-ink mt-2">
                  {item.description}
                </p>
                <p className="text-sm leading-[1.9] text-ink-soft mt-2">
                  {item.descriptionZh}
                </p>
              </TimelineItem>
            ))}
            <p className="text-[13px] italic text-ink-mute">
              More to be added.
              <br />
              更多经历待补充。
            </p>
          </div>
        </InfoSection>

        <Divider left="42%" variant="c" />

        <InfoSection label="CONTACT">
          <div>
            <ContactLabel>EMAIL</ContactLabel>
            <a
              href="mailto:yz12054@nyu.edu"
              className="inline-block text-base text-ink border-b border-hairline pb-px transition-colors duration-200 hover:text-rose-deep hover:border-rose-deep"
            >
              yz12054@nyu.edu
            </a>

            <a
              href="/Yixuan_Zhu_CV.pdf"
              target="_blank"
              rel="noopener noreferrer"
              download
              className="mt-6 inline-flex max-w-full flex-wrap items-center justify-center gap-2.5 rounded-3xl bg-rose-deep px-6 py-3.5 text-center text-[13px] font-medium uppercase tracking-wider text-paper transition-colors duration-200 hover:bg-ink md:flex-nowrap md:px-9"
            >
              Download Resume
              <span aria-hidden="true">/</span>
              下载简历
              <span className="text-sm">↓</span>
            </a>
          </div>
        </InfoSection>
      </main>
    </div>
  )
}

function BioPair({ en, zh }: { en: string; zh: string }) {
  return (
    <div className="space-y-2">
      <p className="text-base leading-[1.8] text-ink">{en}</p>
      <p className="text-sm leading-[1.9] text-ink-soft">{zh}</p>
    </div>
  )
}

function InfoSection({
  label,
  children,
}: {
  label: string
  children: React.ReactNode
}) {
  return (
    <section className="grid min-w-0 gap-6 md:grid-cols-[200px_1fr] md:gap-12 max-w-[900px] mx-auto py-12">
      <div className="text-sm font-medium text-ink-soft tracking-[0.05em] mt-2">
        {label}
      </div>
      <div className="min-w-0">{children}</div>
    </section>
  )
}

function TimelineItem({
  year,
  children,
}: {
  year: string
  children: React.ReactNode
}) {
  return (
    <div className="grid min-w-0 gap-2 sm:grid-cols-[130px_1fr]">
      <p className="text-sm italic text-rose-deep">{year}</p>
      <div className="min-w-0">{children}</div>
    </div>
  )
}

function ContactLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[11px] text-ink-mute tracking-[0.1em] mb-2">
      {children}
    </p>
  )
}

function Divider({
  left,
  right,
  variant,
}: {
  left?: string
  right?: string
  variant: "a" | "b" | "c" | "d"
}) {
  return (
    <div className="max-w-[900px] mx-auto">
      <HairlineWithCross left={left} right={right} variant={variant} size={18} />
    </div>
  )
}
