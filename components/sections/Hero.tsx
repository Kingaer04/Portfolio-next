"use client";

import { useEffect, useRef, useState } from "react";
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
    const onMove = (e: MouseEvent) => {
      el.style.left = `${e.clientX}px`;
      el.style.top  = `${e.clientY}px`;
    };
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

// ── Glitch decode ─────────────────────────────────────────────────────
const GLITCH_CHARS = "アイウエオカキ01#@$%&{}[]<>|_=+-*/\\;:!?~^";
const FULL_NAME    = "Daniel Anifowoshe";

function GlitchName({ runKey }: { runKey: number }) {
  const [display, setDisplay] = useState<string[]>(() => Array(FULL_NAME.length).fill("_"));
  const [settled, setSettled] = useState(false);
  const [flicker, setFlicker] = useState(false);

  useEffect(() => {
    setDisplay(Array(FULL_NAME.length).fill("_"));
    setSettled(false);
    setFlicker(false);

    // Phase 1 — chaos
    const chaosId = setInterval(() => {
      setDisplay(
        FULL_NAME.split("").map((ch) =>
          ch === " " ? " " : GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)]
        )
      );
    }, 50);

    // Phase 2 — decode
    setTimeout(() => {
      clearInterval(chaosId);
      let resolved = 0;

      const decodeNext = () => {
        if (resolved >= FULL_NAME.length) {
          setTimeout(() => {
            setFlicker(true);
            setTimeout(() => { setFlicker(false); setSettled(true); }, 180);
          }, 120);
          return;
        }
        let ticks = 0;
        const glitchId = setInterval(() => {
          setDisplay((prev) =>
            prev.map((_, i) => {
              if (i < resolved) return FULL_NAME[i];
              if (FULL_NAME[i] === " ") return " ";
              return GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)];
            })
          );
          ticks++;
          if (ticks >= 4) { clearInterval(glitchId); resolved++; decodeNext(); }
        }, 40);
      };

      decodeNext();
    }, 600);
  }, [runKey]); // re-runs every time runKey changes

  return (
    <span
      style={{
        filter:     flicker ? "brightness(3) blur(1px)" : settled ? "brightness(1)" : "brightness(1.4)",
        transition: "filter 0.15s ease",
        textShadow: settled ? "none" : "0 0 20px rgba(63,185,80,0.8), 0 0 40px rgba(63,185,80,0.4)",
      }}
    >
      {display.map((char, i) => {
        const isSpace  = FULL_NAME[i] === " ";
        const isLocked = char === FULL_NAME[i] || isSpace;
        const isGlitch = !isLocked && char !== "_";
        return (
          <span key={i} style={{
            color: isLocked
              ? settled ? "#E6EDF3" : "#3FB950"
              : isGlitch
              ? `rgba(88,166,255,${0.5 + Math.random() * 0.5})`
              : "rgba(63,185,80,0.25)",
            transition:  isLocked ? "color 0.3s ease" : "none",
            display:     "inline-block",
            minWidth:    isSpace ? "0.35em" : undefined,
          }}>
            {char}
          </span>
        );
      })}
    </span>
  );
}

const fadeUp = (delay = 0) => ({
  initial:    { opacity: 0, y: 20 },
  animate:    { opacity: 1, y: 0 },
  transition: { duration: 0.5, delay, ease: [0.25, 0.46, 0.45, 0.94] as [number,number,number,number] },
});

export default function Hero({ glitchKey }: { glitchKey: number }) {
  return (
    <section id="hero" className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-bg" />
      <MatrixCanvas />
      <div className="absolute inset-0 pointer-events-none" style={{
        background: "radial-gradient(ellipse 80% 60% at 50% 50%, rgba(13,17,23,0) 0%, rgba(13,17,23,0.88) 75%)",
      }} />
      <div className="absolute inset-0 pointer-events-none opacity-[0.025]"
        style={{
          backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 2px, #3FB950 2px, #3FB950 3px)",
          backgroundSize: "100% 4px",
        }} />
      <CursorGlow />

      <div className="relative z-10 w-full max-w-4xl mx-auto px-6 text-center pt-20 flex flex-col items-center">

        {/* Scan sweep */}
        <motion.div
          initial={{ scaleX: 0, opacity: 1 }}
          animate={{ scaleX: 1, opacity: 0 }}
          transition={{ duration: 0.9, delay: 0.1, ease: "easeInOut" }}
          className="absolute left-0 right-0 h-0.5 bg-green/50 origin-left pointer-events-none"
          style={{ top: "48%" }}
        />

        {/* Name — two lines on mobile, one on large screens */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className="font-mono font-bold leading-tight mb-4 w-full text-center"
          style={{ fontSize: "clamp(2rem, 5.5vw, 4.2rem)" }}
        >
          <span className="text-green">&gt;&nbsp;</span>
          <GlitchName runKey={glitchKey} />
        </motion.div>

        {/* Typing role */}
        <motion.div {...fadeUp(1.4)} className="font-mono mb-4 flex items-center justify-center gap-2"
          style={{ fontSize: "clamp(0.9rem, 2.2vw, 1.25rem)" }}>
          <span className="text-green/40">[</span>
          <TypeAnimation
            sequence={[
              "Software Developer",   2200,
              "C# .NET Engineer",     2200,
              "MERN Stack Developer", 2200,
              "Next.js Craftsman",    2200,
              "Mobile Dev",           2200,
            ]}
            wrapper="span" speed={55} repeat={Infinity} className="text-cyan" />
          <span className="text-green/40">]</span>
        </motion.div>

        {/* Bio */}
        <motion.p {...fadeUp(1.7)}
          className="font-sans text-muted max-w-lg mx-auto leading-relaxed mb-10 text-sm md:text-base">
          I architect and ship production-grade applications —{" "}
          <span className="text-text font-medium">C# .NET backends</span> paired with fast{" "}
          <span className="text-text font-medium">Next.js frontends</span>. Also versed in the{" "}
          <span className="text-text font-medium">MERN stack</span> and{" "}
          <span className="text-text font-medium">React Native</span> for mobile.
        </motion.p>

        {/* CTAs */}
        <motion.div {...fadeUp(2.0)}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10">
          <a href="#projects"
            className="inline-flex items-center gap-2 font-mono text-sm font-bold px-7 py-3 bg-green text-bg rounded hover:bg-green/90 active:scale-95 transition-all tracking-wider">
            ▶ view_projects()
          </a>
          <a href="#skills"
            className="inline-flex items-center gap-2 font-mono text-sm px-7 py-3 border border-green/30 text-green/80 rounded hover:border-green hover:text-green hover:bg-green/5 transition-all tracking-wider">
            ■ explore_skills()
          </a>
          <a href="/cv.pdf" download
            className="inline-flex items-center gap-2 font-mono text-xs px-4 py-3 text-muted hover:text-green transition-colors">
            <FiDownload size={13} /> download_cv
          </a>
        </motion.div>

        {/* Socials + stack */}
        <motion.div {...fadeUp(2.2)} className="flex flex-col items-center gap-5 pb-24">
          <div className="flex items-center gap-3 w-full max-w-xs">
            <div className="flex-1 h-px bg-border/50" />
            <span className="font-mono text-[10px] text-border tracking-widest">LINKS</span>
            <div className="flex-1 h-px bg-border/50" />
          </div>
          <div className="flex items-center gap-6">
            <a href="https://github.com/Kingaer04/" target="_blank" rel="noopener noreferrer"
              className="font-mono text-xs text-muted hover:text-green transition-colors flex items-center gap-1.5">
              <FiGithub size={16} /> github
            </a>
            <span className="text-border/50 text-xs">//</span>
            <a href="https://www.linkedin.com/in/daniel-anifowoshe-528373251/" target="_blank" rel="noopener noreferrer"
              className="font-mono text-xs text-muted hover:text-cyan transition-colors flex items-center gap-1.5">
              <FiLinkedin size={16} /> linkedin
            </a>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-2 font-mono text-[11px] text-muted/40 max-w-xs">
            {["C#", ".NET 8", "Next.js", "TypeScript", "MongoDB", "MERN"].map((t, i, arr) => (
              <span key={t} className="flex items-center gap-3">
                <span className="hover:text-muted/70 transition-colors cursor-default">{t}</span>
                {i < arr.length - 1 && <span className="text-border/30">·</span>}
              </span>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Scroll */}
      <motion.a
        href="#about"
        aria-label="Scroll down"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.6 }}
        className="absolute bottom-8 left-0 right-0 z-20 flex flex-col items-center gap-1 text-muted hover:text-green transition-colors animate-float"
      >
        <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-green/50">scroll</span>
        <FiArrowDown size={14} className="text-green/50" />
      </motion.a>
    </section>
  );
}