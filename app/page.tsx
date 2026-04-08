"use client";

import { useState, useEffect } from "react";
import Navbar   from "@/components/layout/Navbar";
import Footer   from "@/components/layout/Footer";
import Hero     from "@/components/sections/Hero";
import About    from "@/components/sections/About";
import Skills   from "@/components/sections/Skills";
import Projects from "@/components/sections/Projects";
import { motion, AnimatePresence } from "framer-motion";

const BOOT_LINES = [
  { text: "CYBERDYNE SYSTEMS :: MODEL T-800 INITIALIZING...", delay: 0 },
  { text: "LOADING NEURAL NET PROCESSOR...",                  delay: 400 },
  { text: "CPU CORES ONLINE ████████████ 100%",              delay: 800 },
  { text: "SCANNING TARGET DATABASE...",                      delay: 1200 },
  { text: "TARGET ACQUIRED :: DANIEL ANIFOWOSHE",            delay: 1700 },
  { text: "CLASSIFICATION: SOFTWARE DEVELOPER",             delay: 2100 },
  { text: "THREAT LEVEL: EXCEPTIONAL",                        delay: 2500 },
  { text: "MISSION: DELIVER PRODUCTION-GRADE SOFTWARE",      delay: 2900 },
  { text: "STATUS: ALL SYSTEMS ONLINE ✓",                    delay: 3400 },
  { text: "BOOTING INTERFACE...",                             delay: 3900 },
];

function BootOverlay({ onDone }: { onDone: () => void }) {
  const [visibleLines, setVisibleLines] = useState<number[]>([]);
  const [progress,     setProgress]     = useState(0);
  const [exiting,      setExiting]      = useState(false);

  const skip = () => { setExiting(true); setTimeout(onDone, 600); };

  useEffect(() => {
    BOOT_LINES.forEach(({ delay }, i) => {
      setTimeout(() => setVisibleLines((p) => [...p, i]), delay);
    });
    const start = Date.now();
    const duration = 4000;
    const tick = () => {
      const elapsed = Date.now() - start;
      setProgress(Math.min(100, Math.round((elapsed / duration) * 100)));
      if (elapsed < duration) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
    setTimeout(() => { setExiting(true); setTimeout(onDone, 600); }, 4500);
    window.addEventListener("keydown", skip, { once: true });
    return () => window.removeEventListener("keydown", skip);
  }, []);

  return (
    <AnimatePresence>
      {!exiting && (
        <motion.div
          key="boot"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
          onClick={skip}
          className="fixed inset-0 z-[200] bg-bg flex flex-col items-center justify-center px-6 cursor-pointer"
        >
          <div className="absolute inset-0 opacity-10 pointer-events-none"
            style={{
              backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 2px, #3FB950 2px, #3FB950 3px)",
              backgroundSize: "100% 4px",
            }} />
          <div className="absolute inset-0 pointer-events-none"
            style={{ background: "radial-gradient(ellipse 60% 60% at 50% 50%, rgba(63,185,80,0.05) 0%, transparent 70%)" }} />

          <div className="relative z-10 w-full max-w-2xl">
            <div className="border border-green/30 rounded-lg overflow-hidden shadow-[0_0_40px_rgba(63,185,80,0.08)]">
              <div className="flex items-center justify-between px-4 py-2.5 bg-surface border-b border-green/20">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-500/50" />
                  <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/50" />
                  <span className="w-2.5 h-2.5 rounded-full bg-green/60 animate-pulse" />
                </div>
                <span className="font-mono text-xs text-green/60 tracking-widest">
                  CYBERDYNE_OS v2.4 :: BOOT_SEQUENCE
                </span>
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-green animate-pulse" />
                  <span className="font-mono text-[10px] text-green/60 tracking-wider">LIVE</span>
                </div>
              </div>

              <div className="p-6 space-y-2 min-h-[300px] bg-bg/80">
                {BOOT_LINES.map((line, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -12 }}
                    animate={visibleLines.includes(i) ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.2 }}
                    className="font-mono text-sm flex items-start gap-3"
                  >
                    <span className="text-green/40 mt-0.5 flex-shrink-0">&gt;</span>
                    <span className={
                      line.text.includes("ACQUIRED") || line.text.includes("EXCEPTIONAL") || line.text.includes("ONLINE ✓")
                        ? "text-green font-bold"
                        : line.text.includes("INITIALIZING") || line.text.includes("BOOTING")
                        ? "text-cyan"
                        : "text-green/70"
                    }>
                      {line.text}
                    </span>
                  </motion.div>
                ))}
                {visibleLines.length === BOOT_LINES.length && (
                  <div className="flex items-center gap-3 pt-1">
                    <span className="text-green/40 font-mono text-sm">&gt;</span>
                    <span className="w-2 h-4 bg-green animate-blink inline-block" />
                  </div>
                )}
              </div>

              <div className="px-6 py-4 border-t border-green/20 bg-surface/60">
                <div className="flex items-center justify-between font-mono text-[11px] text-green/50 mb-2">
                  <span className="tracking-wider">SYSTEM_LOAD</span>
                  <span>{progress}%</span>
                </div>
                <div className="w-full h-1.5 bg-green/10 rounded-full overflow-hidden">
                  <div className="h-full bg-green rounded-full transition-all duration-100"
                    style={{ width: `${progress}%` }} />
                </div>
              </div>
            </div>
            <p className="font-mono text-[10px] text-green/25 text-center mt-5 tracking-widest">
              CLICK ANYWHERE OR PRESS ANY KEY TO SKIP
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function TargetFlash({ onDone }: { onDone: () => void }) {
  useEffect(() => { setTimeout(onDone, 2200); }, []);
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="fixed inset-0 z-[199] bg-bg flex flex-col items-center justify-center gap-6 px-6"
    >
      <span className="absolute top-8 left-8 w-8 h-8 border-t-2 border-l-2 border-green/60" />
      <span className="absolute top-8 right-8 w-8 h-8 border-t-2 border-r-2 border-green/60" />
      <span className="absolute bottom-8 left-8 w-8 h-8 border-b-2 border-l-2 border-green/60" />
      <span className="absolute bottom-8 right-8 w-8 h-8 border-b-2 border-r-2 border-green/60" />
      <div className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{ backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 2px, #3FB950 2px, #3FB950 3px)", backgroundSize: "100% 4px" }} />
      <motion.div
        initial={{ top: 0 }} animate={{ top: "100%" }}
        transition={{ duration: 1.5, ease: "linear" }}
        className="absolute left-0 right-0 h-0.5 bg-green/40 pointer-events-none z-10"
        style={{ position: "absolute" }}
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, delay: 0.2 }}
        className="text-center"
      >
        <p className="font-mono text-xs text-green/50 tracking-[0.5em] uppercase mb-4">── System Ready ──</p>
        <h1 className="font-mono font-bold text-green tracking-widest uppercase"
          style={{ fontSize: "clamp(2rem, 6vw, 4rem)" }}>
          Target Acquired
        </h1>
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}
          className="font-mono text-cyan/80 text-sm mt-3 tracking-[0.3em]">
          DANIEL ANIFOWOSHE :: ONLINE
        </motion.p>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.9 }}
          className="flex items-center justify-center gap-2 mt-6">
          {[0,1,2,3,4,5,6,7].map((_, i) => (
            <motion.span key={i} className="w-1 bg-green/60 rounded-full"
              animate={{ height: ["8px", "24px", "8px"] }}
              transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.08 }} />
          ))}
        </motion.div>
        <motion.p
          initial={{ opacity: 0 }} animate={{ opacity: [0, 1, 0] }}
          transition={{ delay: 1.2, duration: 0.8, repeat: Infinity }}
          className="font-mono text-[11px] text-green/40 mt-6 tracking-widest">
          LOADING PORTFOLIO...
        </motion.p>
      </motion.div>
    </motion.div>
  );
}

type Stage = "booting" | "flash" | "ready";

export default function Home() {
  const [stage,     setStage]     = useState<Stage>("booting");
  // Increment this every time we reach "ready" so GlitchName re-runs
  const [glitchKey, setGlitchKey] = useState(0);

  const handleReady = () => {
    setGlitchKey((k) => k + 1); // force glitch to replay
    setStage("ready");
  };

  return (
    <main className="min-h-screen bg-bg">
      <AnimatePresence mode="wait">
        {stage === "booting" && (
          <BootOverlay key="boot" onDone={() => setStage("flash")} />
        )}
        {stage === "flash" && (
          <TargetFlash key="flash" onDone={handleReady} />
        )}
      </AnimatePresence>

      {/* Full site — blocked until ready */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={stage === "ready" ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.8 }}
        style={{ pointerEvents: stage === "ready" ? "auto" : "none" }}
      >
        <Navbar />
        {/* key prop forces Hero to fully remount on each load cycle */}
        <Hero key={glitchKey} glitchKey={glitchKey} />
        <About />
        <Skills />
        <Projects />
        <Footer />
      </motion.div>
    </main>
  );
}
