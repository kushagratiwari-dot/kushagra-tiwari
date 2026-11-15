import Image from "next/image";
import { ArrowDown, ArrowUpRight, Github, Linkedin, Mail, MapPin } from "lucide-react";
import Agents from "@/components/Agents";

const EMAIL = "kushagratiwari1064@gmail.com";
const LINKEDIN = "https://www.linkedin.com/in/kushagra-tiwari-709b86405";
const GITHUB = "https://github.com/kushagratiwari-dot";

const heroStats = [["2030", "Graduating"], ["1st", "Year, B.Tech AIML"], ["3", "Certificates"]];
const workStats = [["2", "Projects"], ["4", "Core languages"], ["1", "Workshop attended"]];

const projects = [
  {
    name: "LegStride",
    bullets: [
      "An assistive project built to help people who have difficulty walking to walk properly.",
      "Personal project from my B.Tech AIML journey at Allenhouse Institute of Technology.",
    ],
    chips: ["Assistive tech"],
    links: [["Code", GITHUB]],
  },
  {
    name: "This portfolio",
    bullets: [
      "Built with Next.js 15, TypeScript and Tailwind CSS v4.",
      "Every section builds itself live, drawn by a team of robot cursors.",
      "Includes a pause control, an agents switch and a hands-free scroll tour.",
    ],
    chips: ["Next.js", "TypeScript", "Tailwind"],
    links: [["Code", GITHUB]],
  },
];

const stack = ["Java", "C", "Python", "JavaScript", "Web development", "DSA in Java", "Problem solving", "GitHub"];

const record = [
  ["Expected 2030", "B.Tech, Artificial Intelligence and Machine Learning", "Allenhouse Institute of Technology, Kanpur. Currently in first year."],
  ["21 to 26 Sep 2026", "IWCNS-26 workshop", "One-week international workshop on cryptology and network security in the era of machine learning and data science."],
  ["25 Oct 2026", "Website UI/UX Designing using ChatGPT", "Course completed on Simplilearn SkillUP."],
  ["9 Nov 2026", "AWS Generative AI Developer, Professional", "Completed the official practice question set (AIP-C01)."],
];

const principles = [
  ["Learn by building", "I understand a topic best once I have made something with it."],
  ["Solve the problem first", "Clear thinking comes before clever code."],
  ["Keep it simple", "The simplest version that works is usually the right one."],
  ["Keep improving", "Every project should leave me a little better than the last."],
];

const skills = ["Java", "C", "Python", "JavaScript", "Web development", "DSA in Java", "Problem solving"];

export default function Home() {
  return (
    <>
      <Agents />
      <main>
        {/* HERO */}
        <section id="top" className="relative flex min-h-screen items-end overflow-hidden px-6 pt-24 lg:px-12">
          <div aria-hidden data-build="wipe" className="word pointer-events-none absolute inset-x-0 top-[6%] select-none text-center font-heading text-[24vw] leading-none">PORTFOLIO</div>
          <div aria-hidden className="absolute bottom-0 left-1/2 h-[75vh] w-[75vh] max-w-[140vw] -translate-x-1/2 rounded-full" style={{ background: "radial-gradient(circle, rgba(255,59,47,.5), transparent 65%)" }} />
          <div data-build="pop" className="absolute bottom-0 left-1/2 z-10 w-[78vw] max-w-[460px] -translate-x-1/2" style={{ maskImage: "linear-gradient(to bottom,#000 70%,transparent)", WebkitMaskImage: "linear-gradient(to bottom,#000 70%,transparent)" }}>
            <Image src="/headshot.png" alt="Portrait of Kushagra Tiwari" width={610} height={670} priority className="h-auto w-full grayscale contrast-125" />
          </div>
          <div className="relative z-20 mx-auto grid w-full max-w-7xl gap-8 pb-16 lg:grid-cols-[1fr_auto_1fr] lg:items-end lg:pb-20">
            <div className="order-1">
              <p data-build="type" className="font-hand text-3xl text-zinc-300">Hello, I&apos;m</p>
              <h1 data-build="wipe" className="font-heading text-[clamp(3rem,9vw,7rem)] uppercase leading-[0.95] text-white">Kushagra<br />Tiwari</h1>
              <p data-build="type" className="mt-3 font-mono text-sm uppercase tracking-widest text-accent">AIML Engineering Student</p>
              <p data-build="type" className="mt-4 max-w-md text-zinc-400">First-year B.Tech student in AI and Machine Learning. I write Java, C, Python and JavaScript, and I like building things that help people.</p>
              <div className="mt-6 flex flex-wrap items-center gap-4">
                <a data-build="pop" href="#work" className="btn">View work <ArrowDown size={16} /></a>
                <p data-build="type" className="flex items-center gap-1.5 font-mono text-xs text-zinc-500"><MapPin size={14} />Studying in Kanpur</p>
              </div>
            </div>
            <div className="order-3 h-[85vw] max-h-[480px] lg:order-2 lg:h-0 lg:w-[420px]" aria-hidden />
            <div className="order-2 flex gap-6 lg:order-3 lg:flex-col lg:items-end lg:gap-5">
              {heroStats.map(([n, l]) => (
                <div key={l} data-build="pop" className="lg:text-right">
                  <div className="font-heading text-5xl text-white lg:text-6xl">{n}</div>
                  <div className="font-mono text-xs text-zinc-500">{l}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* WORK */}
        <section id="work" className="mx-auto max-w-7xl px-6 py-24 lg:px-12">
          <div className="grid gap-8 lg:grid-cols-[1.4fr_1fr] lg:items-end">
            <div>
              <h2 data-build="wipe" className="font-heading text-5xl uppercase text-white sm:text-7xl">Work that ships</h2>
              <p data-build="type" className="mt-3 max-w-lg text-zinc-400">Projects I have built so far, with what they do and what they are made with.</p>
            </div>
            <div className="flex gap-8 lg:justify-end">
              {workStats.map(([n, l]) => (
                <div key={l} data-build="pop"><div className="font-heading text-4xl text-accent">{n}</div><div className="font-mono text-xs text-zinc-500">{l}</div></div>
              ))}
            </div>
          </div>
          <div className="mt-10 grid gap-5 md:grid-cols-2">
            {projects.map((p) => (
              <article key={p.name} data-build="pop" className="flex flex-col rounded-xl border border-zinc-800 bg-zinc-900/60 p-6 transition-colors hover:border-accent">
                <h3 className="font-heading text-3xl uppercase text-white">{p.name}</h3>
                <ul className="mt-4 space-y-2 text-zinc-400">
                  {p.bullets.map((b) => (<li key={b} className="flex gap-2"><span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />{b}</li>))}
                </ul>
                <div className="mt-5 flex flex-wrap gap-2">
                  {p.chips.map((c) => (<span key={c} className="rounded border border-zinc-700 px-2 py-0.5 font-mono text-xs text-zinc-300">{c}</span>))}
                </div>
                <div className="mt-5 flex gap-4 pt-1">
                  {p.links.map(([l, h]) => (<a key={l} href={h} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 font-mono text-sm text-accent hover:underline">{l} <ArrowUpRight size={14} /></a>))}
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* STACK */}
        <section id="stack" className="py-16">
          <h2 data-build="wipe" className="mx-auto mb-8 max-w-7xl px-6 font-heading text-5xl uppercase text-white sm:text-7xl lg:px-12">Stack</h2>
          <div data-build="wipe" className="marquee-wrap overflow-hidden border-y border-zinc-800 py-6" style={{ maskImage: "linear-gradient(90deg,transparent,#000 10%,#000 90%,transparent)", WebkitMaskImage: "linear-gradient(90deg,transparent,#000 10%,#000 90%,transparent)" }}>
            <div className="marquee">
              {[...stack, ...stack, ...stack, ...stack].map((s, i) => (
                <span key={i} className="mx-6 whitespace-nowrap font-heading text-4xl uppercase text-zinc-600 transition-colors hover:text-accent sm:text-6xl">{s}<span className="ml-12 text-accent">/</span></span>
              ))}
            </div>
          </div>
        </section>

        {/* RECORD */}
        <section id="record" className="mx-auto max-w-7xl px-6 py-24 lg:px-12">
          <h2 data-build="wipe" className="font-heading text-5xl uppercase text-white sm:text-7xl">Record</h2>
          <div className="mt-10 max-w-3xl border-l border-zinc-800">
            {record.map(([d, t, x]) => (
              <div key={t} data-build="pop" className="relative pb-10 pl-8 last:pb-0">
                <span className="absolute -left-[5px] top-2 h-2.5 w-2.5 rounded-full bg-accent" />
                <div className="font-mono text-xs text-accent">{d}</div>
                <h3 className="mt-1 text-xl font-semibold text-white">{t}</h3>
                <p className="mt-1 text-zinc-400">{x}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ABOUT */}
        <section id="about" className="mx-auto max-w-7xl px-6 py-24 lg:px-12">
          <h2 data-build="wipe" className="font-heading text-5xl uppercase text-white sm:text-7xl">About</h2>
          <div className="mt-10 grid gap-10 lg:grid-cols-2">
            <div className="space-y-4 text-lg text-zinc-400">
              <p data-build="type">I&apos;m Kushagra, a first-year B.Tech student in Artificial Intelligence and Machine Learning at Allenhouse Institute of Technology, graduating in 2030.</p>
              <p data-build="type">I enjoy solving problems with Java and Python, building for the web, and turning ideas like LegStride into something that can help people.</p>
              <p data-build="pop" className="font-hand text-3xl text-white">Always learning, always building.</p>
            </div>
            <div className="flex flex-wrap content-start gap-3">
              {skills.map((s) => (<span key={s} data-build="pop" className="rounded-lg border border-zinc-800 bg-zinc-900/60 px-4 py-2 font-mono text-sm text-zinc-200">{s}</span>))}
            </div>
          </div>
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {principles.map(([t, x], i) => (
              <div key={t} data-build="pop" className="rounded-xl border border-zinc-800 p-5">
                <div className="font-mono text-xs text-accent">0{i + 1}</div>
                <h3 className="mt-2 font-semibold text-white">{t}</h3>
                <p className="mt-1 text-sm text-zinc-400">{x}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CONTACT */}
        <section id="contact" className="mx-auto max-w-7xl px-6 pb-24 pt-12 lg:px-12">
          <div data-build="pop" className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-8 sm:p-14">
            <h2 className="font-heading text-5xl uppercase text-white sm:text-7xl">Let&apos;s build<br />something</h2>
            <p className="mt-4 max-w-md text-zinc-400">Open to learning, collaborating and new ideas. The fastest way to reach me is email.</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href={`mailto:${EMAIL}`} className="btn"><Mail size={16} /> {EMAIL}</a>
              <a href={LINKEDIN} target="_blank" rel="noopener noreferrer" className="btn ghost"><Linkedin size={16} /> LinkedIn</a>
              <a href={GITHUB} target="_blank" rel="noopener noreferrer" className="btn ghost"><Github size={16} /> GitHub</a>
            </div>
          </div>
        </section>
      </main>
      <footer className="border-t border-zinc-900 px-6 py-8 pb-24 text-center font-mono text-xs text-zinc-600">© 2026 Kushagra Tiwari. Built with Next.js.</footer>
    </>
  );
}
