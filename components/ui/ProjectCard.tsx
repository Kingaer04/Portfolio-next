"use client";

import { motion } from "framer-motion";
import { FiGithub, FiExternalLink } from "react-icons/fi";
import { cn } from "@/lib/utils";
import type { Project, ProjectStatus } from "@/data/projects";
import Badge from "./Badge";

const statusConfig: Record<ProjectStatus, { label: string; classes: string }> = {
  "completed":   { label: "● completed",   classes: "text-green  border-green/30  bg-green/5" },
  "in-progress": { label: "◐ in-progress", classes: "text-orange border-orange/30 bg-orange/5" },
  "planned":     { label: "○ planned",     classes: "text-muted  border-border    bg-surface" },
};

type Props = { project: Project; index: number; inView: boolean };

export default function ProjectCard({ project, index, inView }: Props) {
  const status = statusConfig[project.status];

  return (
    <motion.article
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.4, delay: index * 0.09, ease: "easeOut" }}
      className="group relative flex flex-col bg-bg border border-border rounded-xl overflow-hidden transition-all duration-300 hover:-translate-y-1"
      style={{ boxShadow: "0 0 0 0 rgba(63,185,80,0)" }}
      onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.boxShadow = "0 0 28px rgba(63,185,80,0.12)"; }}
      onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.boxShadow = "0 0 0 0 rgba(63,185,80,0)"; }}
    >
      {/* File-tab top bar */}
      <div className="flex items-center justify-between px-4 py-2.5 border-b border-border bg-surface">
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-border group-hover:bg-red-500/50 transition-colors" />
          <span className="w-2.5 h-2.5 rounded-full bg-border group-hover:bg-yellow-500/50 transition-colors" />
          <span className="w-2.5 h-2.5 rounded-full bg-border group-hover:bg-green/50 transition-colors" />
        </div>
        <span className="font-mono text-[11px] text-muted">{project.id}.tsx</span>
        <span className={cn("font-mono text-[10px] px-2 py-0.5 rounded border", status.classes)}>
          {status.label}
        </span>
      </div>

      {/* Body */}
      <div className="flex flex-col flex-1 p-5 gap-4">
        <div>
          <h3 className="font-mono text-base font-bold text-text group-hover:text-green transition-colors duration-200 mb-2 leading-snug">
            {project.title}
          </h3>
          <p className="font-sans text-sm text-muted leading-relaxed">
            {project.description}
          </p>
        </div>
        <div className="flex flex-wrap gap-1.5 mt-auto pt-2">
          {project.tech.map((t) => (
            <Badge key={t} label={t} color="muted" />
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center gap-3 px-5 py-3 border-t border-border">
        <span className="font-mono text-xs text-muted/60 flex-1">{project.year}</span>
        {project.repoUrl && (
          <a href={project.repoUrl} target="_blank" rel="noopener noreferrer"
            aria-label="GitHub repo"
            className="text-muted hover:text-green transition-colors p-1">
            <FiGithub size={15} />
          </a>
        )}
        {project.liveUrl && (
          <a href={project.liveUrl} target="_blank" rel="noopener noreferrer"
            aria-label="Live demo"
            className="text-muted hover:text-cyan transition-colors p-1">
            <FiExternalLink size={15} />
          </a>
        )}
      </div>
    </motion.article>
  );
}
