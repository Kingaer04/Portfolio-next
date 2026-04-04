"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import ProjectCard from "@/components/ui/ProjectCard";
import { projects } from "@/data/projects";

function HUDHeader() {
  const [time, setTime] = useState("");
  const [dots, setDots] = useState("...");

  useEffect(() => {
    const tick = () => setTime(new Date().toLocaleTimeString("en-US", { hour12: false }));
    tick();
    const t = setInterval(tick, 1000);
    const d = setInterval(() => setDots((p) => p.length >= 3 ? "." : p + "."), 500);
    return () => { clearInterval(t); clearInterval(d); };
  }, []);

  return (
    <div className="mb-12">
      {/* Top HUD bar */}
      <div className="flex items-center justify-between mb-6 font-mono text-[11px] text-green/40 border-b border-border/40 pb-3">
        <span className="tracking-widest">// PROJECT_DATABASE :: SCANNING{dots}</span>
        <span className="text-green/30">{time}</span>
      </div>

      {/* Section title */}
      <div className="flex items-start gap-4">
        <div className="flex flex-col items-center gap-1 pt-1">
          <span className="w-px h-8 bg-green/40" />
          <span className="w-2 h-2 rounded-full bg-green animate-pulse" />
        </div>
        <div>
          <p className="font-mono text-xs text-green/60 tracking-[0.3em] uppercase mb-1">
            03. projects
          </p>
          <h2 className="font-mono text-3xl md:text-4xl font-bold text-text mb-2">
            Mission Files
          </h2>
          <p className="font-sans text-muted text-sm max-w-md">
            Acquired targets — systems built, deployed, and operational. Each file is a completed or active mission.
          </p>
          <div className="mt-3 h-px w-12 bg-green" />
        </div>
      </div>

      {/* Stats row */}
      <div className="mt-8 flex items-center gap-6 font-mono text-[11px]">
        <span className="text-green/50">
          TOTAL_MISSIONS: <span className="text-green">{projects.length + 1}</span>
        </span>
        <span className="text-border/60">//</span>
        <span className="text-green/50">
          ACTIVE: <span className="text-orange">{projects.filter(p => p.status === "in-progress").length}</span>
        </span>
        <span className="text-border/60">//</span>
        <span className="text-green/50">
          COMPLETED: <span className="text-green">{projects.filter(p => p.status === "completed").length}</span>
        </span>
      </div>
    </div>
  );
}

export default function Projects() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.05 });
  const sorted = [
    ...projects.filter((p) => p.featured),
    ...projects.filter((p) => !p.featured),
  ];

  return (
    <section id="projects" className="py-28 bg-bg relative">
      {/* Top border glow */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-green/20 to-transparent" />

      {/* Subtle scanlines */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.015]"
        style={{ backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 2px, #3FB950 2px, #3FB950 3px)", backgroundSize: "100% 4px" }} />

      <div className="max-w-6xl mx-auto px-6" ref={ref}>
        <HUDHeader />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {sorted.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} inView={inView} />
          ))}

          {/* Ghost card — next mission */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: sorted.length * 0.1 + 0.1 }}
            className="relative flex flex-col items-center justify-center border border-dashed border-green/20 rounded-lg p-8 text-center min-h-[240px] group hover:border-green/40 transition-colors"
          >
            {/* Corner brackets */}
            <span className="absolute top-2 left-2 w-3 h-3 border-t border-l border-green/20 group-hover:border-green/50 transition-colors" />
            <span className="absolute top-2 right-2 w-3 h-3 border-t border-r border-green/20 group-hover:border-green/50 transition-colors" />
            <span className="absolute bottom-2 left-2 w-3 h-3 border-b border-l border-green/20 group-hover:border-green/50 transition-colors" />
            <span className="absolute bottom-2 right-2 w-3 h-3 border-b border-r border-green/20 group-hover:border-green/50 transition-colors" />

            <p className="font-mono text-green/40 text-3xl mb-3 group-hover:text-green/60 transition-colors">+</p>
            <p className="font-mono text-xs text-green/40 tracking-widest mb-1">NEXT_MISSION</p>
            <p className="font-mono text-[10px] text-muted/40 tracking-wider">INCOMING...</p>
            <div className="mt-4 flex gap-1">
              {[0,1,2].map(i => (
                <motion.span key={i} className="w-1 h-1 rounded-full bg-green/30"
                  animate={{ opacity: [0.3, 1, 0.3] }}
                  transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.2 }} />
              ))}
            </div>
          </motion.div>
        </div>

        {/* Bottom HUD */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8 }}
          className="mt-10 flex items-center gap-3 font-mono text-[10px] text-green/30"
        >
          <span className="animate-pulse">■</span>
          <span className="tracking-widest">MISSION_LOG :: MORE FILES BEING COMPILED</span>
          <div className="flex-1 h-px bg-border/20" />
          <span>EOF</span>
        </motion.div>
      </div>
    </section>
  );
}