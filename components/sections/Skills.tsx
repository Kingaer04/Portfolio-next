"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import SectionHeader from "@/components/ui/SectionHeader";
import Badge from "@/components/ui/Badge";
import { skillCategories } from "@/data/skills";

const colorAccent: Record<string, string> = {
  green:  "bg-green",
  cyan:   "bg-cyan",
  orange: "bg-orange",
  muted:  "bg-muted",
};

export default function Skills() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section id="skills" className="py-28 bg-bg relative">
      {/* Top divider */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-green/20 to-transparent" />

      <div className="max-w-6xl mx-auto px-6">
        <SectionHeader
          label="02. skills"
          title="Tech Stack"
          subtitle="Tools and technologies I use to bring ideas to production."
        />

        {/* Terminal window */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="bg-surface border border-border rounded-xl overflow-hidden mb-10"
        >
          {/* Window chrome */}
          <div className="flex items-center gap-2 px-4 py-3 border-b border-border bg-bg">
            <span className="w-3 h-3 rounded-full bg-red-500/60" />
            <span className="w-3 h-3 rounded-full bg-yellow-500/60" />
            <span className="w-3 h-3 rounded-full bg-green/60" />
            <span className="font-mono text-xs text-muted ml-3">skills.config.ts</span>
          </div>

          {/* Terminal content */}
          <div className="p-6 font-mono text-sm">
            <p className="text-muted mb-1">
              <span className="text-green">$</span> cat skills.config.ts
            </p>
            <p className="text-border mb-4">{"// Loaded 4 categories, 18 skills"}</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {skillCategories.map((cat, catIdx) => (
                <SkillGroup key={cat.label} category={cat} delay={catIdx * 0.12} inView={inView} />
              ))}
            </div>
          </div>
        </motion.div>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.6, duration: 0.4 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          {[
            { label: "years_coding",      value: "3+" },
            { label: "projects_shipped",  value: "10+" },
            { label: "tech_stack_size",   value: "18+" },
            { label: "cups_of_coffee",    value: "∞" },
          ].map(({ label, value }) => (
            <div key={label} className="bg-surface border border-border rounded-lg p-4 text-center hover:border-green/30 transition-colors">
              <p className="font-mono text-2xl font-bold text-green mb-1">{value}</p>
              <p className="font-mono text-xs text-muted">{label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function SkillGroup({
  category,
  delay,
  inView,
}: {
  category: (typeof skillCategories)[number];
  delay: number;
  inView: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.35, delay }}
    >
      {/* Category label */}
      <div className="flex items-center gap-2 mb-3">
        <span className={`w-2 h-2 rounded-full ${colorAccent[category.color]}`} />
        <span className="font-mono text-xs font-bold text-text uppercase tracking-widest">
          {category.label}
        </span>
        <div className="flex-1 h-px bg-border" />
      </div>

      {/* Badges */}
      <div className="flex flex-wrap gap-2">
        {category.skills.map((skill, i) => (
          <motion.div
            key={skill}
            initial={{ opacity: 0, scale: 0.85 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.2, delay: delay + i * 0.05 }}
          >
            <Badge label={skill} color={category.color} />
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
