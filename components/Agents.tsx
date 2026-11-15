"use client";
import { useEffect, useState } from "react";
import { Pause, Play, Bot, Route } from "lucide-react";

const NAMES = ["Scout", "Layout", "Typeset", "Motion", "QA", "Deploy", "Copy", "Lint", "Index", "Render", "Palette", "Review"];
const COLORS = ["#fbbf24", "#34d399", "#60a5fa", "#f472b6", "#a78bfa", "#fb923c", "#2dd4bf", "#f87171", "#a3e635", "#22d3ee", "#e879f9", "#facc15"];
const ease = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
const clamp = (v: number) => Math.max(0, Math.min(1, v));

type Phase = "idle" | "move" | "draw" | "build" | "out" | "park";
type Agent = { el: HTMLDivElement; wf: HTMLDivElement; x: number; y: number; sx: number; sy: number; tx: number; ty: number; t: number; dur: number; phase: Phase; target: HTMLElement | null; full: string; mode: string };

const robot = (c: string) =>
  `<svg width="16" height="16" viewBox="0 0 16 16"><line x1="8" y1="1" x2="8" y2="4" stroke="#09090b" stroke-width="1.2"/><circle class="ant" cx="8" cy="1.2" r="1.3" fill="#ff3b2f"/><rect x="2" y="4" width="12" height="10" rx="3" fill="#09090b"/><rect class="led" x="4.4" y="7.2" width="2.2" height="3" rx="1" fill="${c}"/><rect class="led" x="9.4" y="7.2" width="2.2" height="3" rx="1" fill="${c}"/></svg>`;

export default function Agents() {
  const [on, setOn] = useState(false);
  const [paused, setPaused] = useState(false);
  const [touring, setTouring] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    setOn(root.classList.contains("build-mode"));
    const nodes = Array.from(document.querySelectorAll<HTMLElement>("[data-build]"));
    const reveal = (el: HTMLElement) => {
      el.classList.add("built", "instant");
      if (el.dataset.full != null) el.textContent = el.dataset.full;
      el.style.minHeight = "";
    };
    nodes.forEach((n) => { if (n.dataset.build === "type") n.dataset.full = n.textContent || ""; });
    const q = new URLSearchParams(location.search).get("tour");
    const wantTour = sessionStorage.getItem("tour") === "1";
    if (!root.classList.contains("build-mode")) {
      nodes.forEach(reveal);
      document.getElementById("boot")?.remove();
      if (wantTour) { sessionStorage.removeItem("tour"); setTimeout(() => runTour(), 400); }
      return;
    }
    const mobile = innerWidth < 768;
    const count = mobile ? 6 : 12;
    const wrap = document.createElement("div");
    document.body.appendChild(wrap);
    const agents: Agent[] = Array.from({ length: count }, (_, i) => {
      const c = COLORS[i];
      const el = document.createElement("div");
      el.className = "cur";
      el.innerHTML = `<svg width="18" height="20" viewBox="0 0 18 20"><path d="M1 1 L1 15 L5 11.5 L8 18 L10.5 17 L7.6 10.5 L13 10.5 Z" fill="${c}" stroke="#09090b" stroke-width="1.2" stroke-linejoin="round"/></svg><div class="tag" style="background:${c}">${robot(c)}${NAMES[i]}</div>`;
      const wf = document.createElement("div");
      wf.className = "wf";
      wf.style.display = "none";
      wf.innerHTML = `<em></em><i style="left:-4px;top:-4px"></i><i style="right:-4px;top:-4px"></i><i style="left:-4px;bottom:-4px"></i><i style="right:-4px;bottom:-4px"></i>`;
      wrap.append(wf, el);
      const x = Math.random() * innerWidth, y = innerHeight + 40;
      return { el, wf, x, y, sx: x, sy: y, tx: x, ty: y, t: 0, dur: 1, phase: "idle", target: null, full: "", mode: "" };
    });

    const done = new Set<HTMLElement>();
    const queued = new Set<HTMLElement>();
    const ready: HTMLElement[] = [];
    let live = true, isPaused = false, last = performance.now(), started = false, heroDone = false;
    (window as unknown as { __pause: (v: boolean) => void }).__pause = (v) => { isPaused = v; };

    const io = new IntersectionObserver((es) => es.forEach((e) => {
      const el = e.target as HTMLElement;
      if (done.has(el) || queued.has(el)) return;
      if (e.isIntersecting) { queued.add(el); ready.push(el); }
      else if (e.boundingClientRect.bottom < 0) { reveal(el); done.add(el); io.unobserve(el); }
    }), { threshold: 0.05 });
    nodes.forEach((n) => io.observe(n));

    const park = (a: Agent) => {
      a.phase = "park"; a.sx = a.x; a.sy = a.y; a.t = 0; a.dur = 1.4;
      a.tx = Math.random() < 0.5 ? 6 + Math.random() * 30 : innerWidth - 90 - Math.random() * 30;
      a.ty = 80 + Math.random() * (innerHeight - 160);
    };
    const finish = (a: Agent) => {
      const el = a.target!;
      el.classList.add("built"); el.style.minHeight = ""; el.style.animation = "";
      if (a.full) el.textContent = a.full;
      done.add(el); io.unobserve(el); a.wf.style.display = "none"; a.target = null; park(a);
    };
    const assign = (a: Agent, el: HTMLElement) => {
      a.target = el; a.mode = el.dataset.build || "pop"; a.full = el.dataset.full || "";
      const r = el.getBoundingClientRect();
      if (a.full) el.style.minHeight = r.height + "px";
      a.phase = "move"; a.sx = a.x; a.sy = a.y; a.t = 0;
      a.tx = r.left; a.ty = r.top; a.dur = Math.max(0.5, Math.min(1.3, Math.hypot(a.tx - a.x, a.ty - a.y) / 900));
      a.wf.querySelector("em")!.textContent = `${el.tagName.toLowerCase()} · ${a.mode}`;
    };

    const tick = (now: number) => {
      if (!live) return;
      const dt = isPaused ? 0 : Math.min(0.05, (now - last) / 1000);
      last = now;
      if (started && !isPaused) {
        const active = agents.filter((a) => a.target).length;
        let free = Math.min(6 - active, 6);
        for (const a of agents) {
          if (free <= 0 || !ready.length) break;
          if (a.target || (a.phase !== "idle" && a.phase !== "park")) continue;
          const el = ready.shift()!;
          if (done.has(el)) continue;
          assign(a, el); free--;
        }
      }
      agents.forEach((a) => {
        a.t += dt;
        const p = clamp(a.t / a.dur);
        if (a.phase === "move" || a.phase === "park") {
          if (a.target) { const r = a.target.getBoundingClientRect(); a.tx = r.left; a.ty = r.top; }
          const e = ease(p); a.x = a.sx + (a.tx - a.sx) * e; a.y = a.sy + (a.ty - a.sy) * e;
          if (p >= 1) { if (a.phase === "move") { a.phase = "draw"; a.t = 0; a.dur = 0.45; a.wf.style.display = "block"; } else a.phase = "idle"; }
        } else if (a.phase === "draw" || a.phase === "build") {
          const r = a.target!.getBoundingClientRect();
          const k = a.phase === "draw" ? ease(p) : 1;
          a.wf.style.cssText = `display:block;left:${r.left}px;top:${r.top}px;width:${r.width * k}px;height:${r.height * k}px`;
          const prog = a.phase === "build" ? p : 1;
          a.x = r.left + r.width * (a.phase === "draw" ? k : a.mode === "pop" ? 1 : prog);
          a.y = r.top + r.height * (a.phase === "draw" ? k : 1);
          if (a.phase === "draw" && p >= 1) {
            a.phase = "build"; a.t = 0;
            a.dur = a.mode === "type" ? Math.max(0.5, Math.min(2.2, a.full.length / 55)) : a.mode === "wipe" ? 0.9 : 0.55;
            a.target!.classList.add("built");
            if (a.mode === "type") a.target!.textContent = "";
          } else if (a.phase === "build") {
            if (a.mode === "type") a.target!.textContent = a.full.slice(0, Math.ceil(a.full.length * p));
            if (p >= 1) { a.phase = "out"; a.t = 0; a.dur = 0.25; }
          }
        } else if (a.phase === "out") {
          if (p >= 1) finish(a);
        }
        a.el.style.transform = `translate3d(${a.x}px,${a.y}px,0)`;
        if (a.phase === "idle") a.el.style.transform += ` translateY(${Math.sin(now / 600 + a.sx) * 3}px)`;
      });
      if (!heroDone && started && !ready.length && !agents.some((a) => a.target)) {
        heroDone = true; window.dispatchEvent(new Event("hero-built"));
      }
      requestAnimationFrame(tick);
    };

    const bootEl = document.getElementById("boot");
    const bt = setTimeout(() => { bootEl?.classList.add("out"); setTimeout(() => bootEl?.remove(), 450); started = true; }, 900);
    requestAnimationFrame(tick);
    if (wantTour) {
      sessionStorage.removeItem("tour");
      window.addEventListener("hero-built", () => setTimeout(() => runTour(), 500), { once: true });
    }
    void q;
    return () => {
      live = false; clearTimeout(bt); io.disconnect(); wrap.remove();
    };
  }, []);

  function runTour() {
    const root = document.documentElement;
    root.style.scrollBehavior = "auto";
    window.scrollTo(0, 0);
    setTouring(true);
    const total = Math.max(0, root.scrollHeight - innerHeight);
    const T = Math.max(8000, (total / 110) * 1000), a = 0.1, t0 = performance.now();
    let stop = false;
    const end = () => { stop = true; setTouring(false); root.style.scrollBehavior = ""; };
    const key = (e: KeyboardEvent) => { if (e.key === "Escape") end(); };
    ["wheel", "touchstart"].forEach((n) => window.addEventListener(n, end, { once: true, passive: true }));
    window.addEventListener("keydown", key, { once: true });
    const f = (u: number) => (u < a ? (u * u) / (2 * a * (1 - a)) : u < 1 - a ? (u - a / 2) / (1 - a) : 1 - Math.pow(1 - u, 2) / (2 * a * (1 - a)));
    const step = (now: number) => {
      if (stop) return;
      const u = clamp((now - t0) / T);
      window.scrollTo(0, Math.min(total, root.scrollHeight - innerHeight) * f(u));
      if (u < 1) requestAnimationFrame(step); else end();
    };
    requestAnimationFrame(step);
  }

  const toggleAgents = () => {
    localStorage.setItem("agents", on ? "off" : "on");
    if (on) {
      document.documentElement.classList.remove("build-mode");
    }
    location.href = location.pathname + (on ? "?agents=off" : "?agents=on");
  };
  const togglePause = () => {
    const v = !paused; setPaused(v);
    (window as unknown as { __pause?: (v: boolean) => void }).__pause?.(v);
  };
  const tour = () => { sessionStorage.setItem("tour", "1"); location.reload(); };

  useEffect(() => {
    const k = (e: KeyboardEvent) => {
      const t = e.target as HTMLElement;
      if (t.tagName === "INPUT" || t.tagName === "TEXTAREA" || e.metaKey || e.ctrlKey || e.altKey) return;
      const key = e.key.toLowerCase();
      if (key === "t") tour();
      else if (key === "a") toggleAgents();
      else if (key === "p" && on) togglePause();
    };
    window.addEventListener("keydown", k);
    return () => window.removeEventListener("keydown", k);
  });

  return (
    <>
      <div id="boot"><span>booting agents...</span></div>
      <div className="dock fixed bottom-4 left-1/2 z-[95] flex -translate-x-1/2 items-center gap-1 rounded-xl border border-zinc-800 bg-zinc-950/95 p-1.5 shadow-xl" role="toolbar" aria-label="Animation controls">
        <button onClick={togglePause} disabled={!on} aria-pressed={paused} title="Pause (P)" className="flex items-center gap-1.5">
          {paused ? <Play size={14} /> : <Pause size={14} />} {paused ? "Resume" : "Pause"}
        </button>
        <button onClick={toggleAgents} aria-pressed={on} title="Agents (A)" className="flex items-center gap-1.5"><Bot size={14} /> Agents {on ? "on" : "off"}</button>
        <button onClick={tour} disabled={touring} title="Tour (T)" className="flex items-center gap-1.5"><Route size={14} /> Tour</button>
      </div>
    </>
  );
}

