"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { FiGithub, FiExternalLink } from "react-icons/fi";
import { cn } from "@/lib/utils";
import type { Project, ProjectStatus } from "@/data/projects";
import Badge from "./Badge";

const statusConfig: Record<ProjectStatus, { label: string; classes: string; dot: string }> = {
  "completed":   { label: "ONLINE",       classes: "text-green  border-green/30  bg-green/5",  dot: "bg-green" },
  "in-progress": { label: "DEPLOYING",    classes: "text-orange border-orange/30 bg-orange/5", dot: "bg-orange" },
  "planned":     { label: "STANDBY",      classes: "text-muted  border-border    bg-surface",  dot: "bg-muted" },
};

type Props = { project: Project; index: number; inView: boolean };

export default function ProjectCard({ project, index, inView }: Props) {
  const status = statusConfig[project.status];
  const [hovered, setHovered] = useState(false);
  const [scanLine, setScanLine] = useState(false);

  const handleMouseEnter = () => {
    setHovered(true);
    setScanLine(true);
    setTimeout(() => setScanLine(false), 600);
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.4, delay: index * 0.09, ease: "easeOut" }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={() => setHovered(false)}
      className="group relative flex flex-col bg-bg border border-border/60 rounded-lg overflow-hidden transition-all duration-300"
      style={{
        boxShadow: hovered
          ? "0 0 0 1px rgba(63,185,80,0.4), 0 0 30px rgba(63,185,80,0.1), inset 0 0 30px rgba(63,185,80,0.03)"
          : "none",
      }}
    >
      {/* Scan line animation on hover */}
      {scanLine && (
        <motion.div
          initial={{ top: 0 }}
          animate={{ top: "100%" }}
          transition={{ duration: 0.5, ease: "linear" }}
          className="absolute left-0 right-0 h-px bg-green/60 z-20 pointer-events-none"
          style={{ position: "absolute" }}
        />
      )}

      {/* Corner brackets — terminator HUD style */}
      <span className="absolute top-2 left-2 w-3 h-3 border-t border-l border-green/40 z-10 transition-colors group-hover:border-green" />
      <span className="absolute top-2 right-2 w-3 h-3 border-t border-r border-green/40 z-10 transition-colors group-hover:border-green" />
      <span className="absolute bottom-2 left-2 w-3 h-3 border-b border-l border-green/40 z-10 transition-colors group-hover:border-green" />
      <span className="absolute bottom-2 right-2 w-3 h-3 border-b border-r border-green/40 z-10 transition-colors group-hover:border-green" />

      {/* Top bar */}
      <div className="flex items-center justify-between px-4 py-2.5 border-b border-border/60 bg-surface/80">
        <div className="flex items-center gap-2">
          <span className={cn("w-1.5 h-1.5 rounded-full", status.dot,
            project.status === "in-progress" ? "animate-pulse" : ""
          )} />
          <span className={cn("font-mono text-[10px] px-2 py-0.5 rounded border tracking-widest", status.classes)}>
            {status.label}
          </span>
        </div>
        <span className="font-mono text-[10px] text-muted/50 tracking-wider">
          SYS::{project.id.toUpperCase()}
        </span>
      </div>

      {/* Body */}
      <div className="flex flex-col flex-1 p-5 gap-4">
        {/* Target ID line */}
        <div className="flex items-center gap-2">
          <span className="font-mono text-[10px] text-green/40 tracking-widest">TARGET_ID</span>
          <div className="flex-1 h-px bg-border/40" />
          <span className="font-mono text-[10px] text-green/40">{project.year}</span>
        </div>

        <div>
          <h3 className={cn(
            "font-mono text-base font-bold leading-snug mb-2 transition-colors duration-200",
            hovered ? "text-green" : "text-text"
          )}>
            {hovered ? `> ${project.title}_` : project.title}
          </h3>
          <p className="font-sans text-sm text-muted leading-relaxed">
            {project.description}
          </p>
        </div>

        {/* Tech stack */}
        <div className="space-y-2 mt-auto pt-2">
          <p className="font-mono text-[10px] text-green/40 tracking-widest">TECH_STACK</p>
          <div className="flex flex-wrap gap-1.5">
            {project.tech.map((t) => (
              <Badge key={t} label={t} color="muted" />
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center gap-3 px-5 py-3 border-t border-border/60 bg-surface/40">
        <span className="font-mono text-[10px] text-green/30 flex-1 tracking-wider">
          {hovered ? "ACCESSING..." : "CLASSIFIED"}
        </span>
        {project.repoUrl && (
          <a href={project.repoUrl} target="_blank" rel="noopener noreferrer"
            aria-label="GitHub repo"
            className="font-mono text-[10px] text-muted hover:text-green transition-colors flex items-center gap-1 border border-border/60 hover:border-green/40 px-2 py-1 rounded">
            <FiGithub size={11} /> REPO
          </a>
        )}
        {project.liveUrl && (
          <a href={project.liveUrl} target="_blank" rel="noopener noreferrer"
            aria-label="Live demo"
            className="font-mono text-[10px] text-muted hover:text-cyan transition-colors flex items-center gap-1 border border-border/60 hover:border-cyan/40 px-2 py-1 rounded">
            <FiExternalLink size={11} /> LIVE
          </a>
        )}
      </div>
    </motion.article>
  );
}