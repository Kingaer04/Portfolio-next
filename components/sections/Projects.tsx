"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import SectionHeader from "@/components/ui/SectionHeader";
import ProjectCard from "@/components/ui/ProjectCard";
import { projects } from "@/data/projects";

export default function Projects() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.05 });
  const sorted = [
    ...projects.filter((p) => p.featured),
    ...projects.filter((p) => !p.featured),
  ];

  return (
    <section id="projects" className="py-28 bg-surface relative">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan/20 to-transparent" />

      <div className="max-w-6xl mx-auto px-6" ref={ref}>
        <SectionHeader
          label="03. projects"
          title="Things I've Built"
          subtitle="Production systems, experiments, and everything in between. Adding more as they ship."
        />

        {sorted.length === 0 ? (
          <div className="font-mono text-center py-20 border border-dashed border-border rounded-xl">
            <p className="text-green text-lg mb-2">// coming_soon</p>
            <p className="text-muted text-sm">
              Add your first project in{" "}
              <span className="text-cyan">data/projects.ts</span>
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {sorted.map((project, i) => (
              <ProjectCard key={project.id} project={project} index={i} inView={inView} />
            ))}
            {/* "More coming" ghost card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: sorted.length * 0.1 + 0.1 }}
              className="flex flex-col items-center justify-center border border-dashed border-border rounded-lg p-8 text-center min-h-[220px] hover:border-green/30 transition-colors"
            >
              <p className="font-mono text-green text-2xl mb-2">+</p>
              <p className="font-mono text-xs text-muted">more_coming_soon</p>
              <p className="font-sans text-xs text-muted/60 mt-2 max-w-[160px]">
                New projects added as they complete
              </p>
            </motion.div>
          </div>
        )}
      </div>
    </section>
  );
}
