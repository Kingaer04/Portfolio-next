"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { TypeAnimation } from "react-type-animation";
import { FiDownload, FiArrowDown, FiGithub, FiLinkedin } from "react-icons/fi";

function MatrixCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const resize = () => { canvas.width = canvas.offsetWidth; canvas.height = canvas.offsetHeight; };
    resize();
    window.addEventListener("resize", resize);
    const chars = "01アイウエオカキクケコ{}[]<>/\\|;:_=+-*";
    const fontSize = 13;
    let cols = Math.floor(canvas.width / fontSize);
    const drops: number[] = Array(cols).fill(1);
    let animId: number;
    const draw = () => {
      ctx.fillStyle = "rgba(13,17,23,0.05)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      cols = Math.floor(canvas.width / fontSize);
      while (drops.length < cols) drops.push(1);
      ctx.font = `${fontSize}px monospace`;
      drops.forEach((y, i) => {
        const char = chars[Math.floor(Math.random() * chars.length)];
        const alpha = Math.random() > 0.97 ? 0.9 : 0.1 + Math.random() * 0.2;
        ctx.fillStyle = `rgba(63,185,80,${alpha})`;
        ctx.fillText(char, i * fontSize, y * fontSize);
        if (y * fontSize > canvas.height && Math.random() > 0.975) drops[i] = 0;
        drops[i]++;
      });
      animId = requestAnimationFrame(draw);
    };
    animId = requestAnimationFrame(draw);
    return () => { cancelAnimationFrame(animId); window.removeEventListener("resize", resize); };
  }, []);
  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full opacity-[0.18] pointer-events-none" />;
}

function CursorGlow() {
  const glowRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = glowRef.current;
    if (!el) return;
    const onMove = (e: MouseEvent) => { el.style.left = `${e.clientX}px`; el.style.top = `${e.clientY}px`; };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, []);
  return (
    <div ref={glowRef} className="pointer-events-none fixed z-0 w-80 h-80 rounded-full" style={{
      background: "radial-gradient(circle, rgba(63,185,80,0.06) 0%, transparent 70%)",
      transform: "translate(-50%, -50%)",
      transition: "left 0.1s ease-out, top 0.1s ease-out",
    }} />
  );
}

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.55, delay, ease: [0.25, 0.46, 0.45, 0.94] as [number,number,number,number] },
});

export default function Hero() {
  return (
    <section id="hero" className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-bg" />
      <MatrixCanvas />
      <div className="absolute inset-0 pointer-events-none" style={{
        background: "radial-gradient(ellipse 80% 60% at 50% 50%, rgba(13,17,23,0) 0%, rgba(13,17,23,0.88) 75%)",
      }} />
      <CursorGlow />

      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        {/* Status pill */}
        {/* <motion.div {...fadeUp(0.1)} className="inline-flex items-center gap-2 mb-8">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-green" />
          </span>
          <span className="font-mono text-xs text-muted border border-border rounded-full px-3 py-1 tracking-wide">
            Available for new opportunities
          </span>
        </motion.div> */}

        {/* Name */}
        <motion.h1 {...fadeUp(0.2)} className="font-mono font-bold text-text leading-none mb-3"
          style={{ fontSize: "clamp(2.8rem, 8vw, 5.5rem)" }}>
          {/* ── EDIT: your name ── */}
          <span className="text-green">&gt;&nbsp;</span>Daniel Anifowoshe
        </motion.h1>

        {/* Typing */}
        <motion.div {...fadeUp(0.35)} className="font-mono mb-6 flex items-center justify-center gap-2"
          style={{ fontSize: "clamp(1rem, 3vw, 1.4rem)" }}>
          <span className="text-border">[</span>
          <TypeAnimation
            sequence={[
              /* ── EDIT: your roles ── */
              "Software Developer", 2200,
              "C# .NET Engineer",     2200,
              "MERN stack Developer",     2200,
              "Next.js Craftsman",    2200,
              "A mobile Dev",     2200,
              
            ]}
            wrapper="span" speed={55} repeat={Infinity} className="text-cyan" />
          <span className="text-border">]</span>
        </motion.div>

        {/* Bio */}
        {/* <motion.p {...fadeUp(0.5)}
          className="font-sans text-muted max-w-xl mx-auto leading-relaxed mb-10 text-base md:text-lg">
          {/* ── EDIT: your bio ── 
          I architect and ship production-grade applications —{" "}
          <span className="text-text">C# .NET backends</span> paired with fast,
          accessible <span className="text-text">Next.js frontends. And also vertile in Mern stack for web development and React native for mobile development</span>. 
        </motion.p>*/}

        {/* CTAs */}
        <motion.div {...fadeUp(0.65)} className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-14">
          <a href="#projects" className="inline-flex items-center gap-2 font-mono text-sm font-bold px-7 py-3 bg-green text-bg rounded-md hover:bg-green/90 active:scale-95 transition-all">
            view_projects()
          </a>
          <a href="#skills" className="inline-flex items-center gap-2 font-mono text-sm px-7 py-3 border border-border text-muted rounded-md hover:border-green/40 hover:text-text transition-all">
            explore_skills()
          </a>
          <a href="/cv.pdf" download className="inline-flex items-center gap-2 font-mono text-sm px-4 py-3 text-muted hover:text-green transition-colors">
            <FiDownload size={14} /> download_cv
          </a>
        </motion.div>

        {/* Socials + stack */}
        <motion.div {...fadeUp(0.8)} className="flex flex-col items-center gap-8">
          <div className="flex items-center gap-5">
            {/* ── EDIT: your actual URLs ── */}
            <a href="https://github.com/Kingaer04/" target="_blank" rel="noopener noreferrer" className="text-muted hover:text-green transition-colors"><FiGithub size={19} /></a>
            <span className="text-border/50">|</span>
            <a href="https://www.linkedin.com/in/daniel-anifowoshe-528373251/" target="_blank" rel="noopener noreferrer" className="text-muted hover:text-cyan transition-colors"><FiLinkedin size={19} /></a>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 font-mono text-xs text-muted/50 max-w-xs mx-auto">
            {["C#", ".NET 8", "Next.js 14", "TypeScript", "MongoDB", "MERN"].map((t, i, arr) => (
              <span key={t} className="flex items-center gap-3">
                <span className="hover:text-muted/80 transition-colors cursor-default">{t}</span>
                {i < arr.length - 1 && <span className="text-border/40">·</span>}
              </span>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Scroll hint */}
      <motion.a href="#skills" aria-label="Scroll down"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }}
        className="absolute bottom-4 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-muted hover:text-green transition-colors animate-float">
        <span className="font-mono text-[10px] tracking-widest uppercase">scroll</span>
        <FiArrowDown size={14} />
      </motion.a>
    </section>
  );
}
