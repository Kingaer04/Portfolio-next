"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { FiCode, FiServer, FiDatabase, FiGlobe } from "react-icons/fi";

const FACTS = [
  /* ── EDIT: replace with your own facts ── */
  { icon: FiCode,     label: "Primary stack",   value: "C# + Next.js" },
  { icon: FiServer,   label: "Architecture",    value: "Onion / Clean" },
  { icon: FiDatabase, label: "Database",        value: "PostgreSQL" },
  { icon: FiGlobe,    label: "Based in",        value: "Lagos, Nigeria" },
];

export default function About() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });

  return (
    <section id="about" className="py-28 bg-surface relative">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />

      <div className="max-w-6xl mx-auto px-6">
        <div ref={ref} className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">

          {/* Left — code window bio */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            <p className="font-mono text-xs text-green mb-2 tracking-widest">
              <span className="opacity-50"># </span>01. about
            </p>
            <h2 className="font-mono text-3xl md:text-4xl font-bold text-text mb-4">
              About Me
            </h2>
            <div className="h-px w-12 bg-green mb-8" />

            {/* Code window */}
            <div className="bg-bg border border-border rounded-xl overflow-hidden">
              {/* Window chrome */}
              <div className="flex items-center gap-2 px-4 py-2.5 border-b border-border bg-surface">
                <span className="w-2.5 h-2.5 rounded-full bg-border" />
                <span className="w-2.5 h-2.5 rounded-full bg-border" />
                <span className="w-2.5 h-2.5 rounded-full bg-border" />
                <span className="font-mono text-xs text-muted ml-2">about.ts</span>
              </div>

              {/* Code content */}
              <div className="p-5 font-mono text-sm leading-7 space-y-1">
                <p><span className="text-muted">const</span> <span className="text-cyan">developer</span> <span className="text-muted">= {"{"}</span></p>
                <p className="pl-5">
                  <span className="text-green">name</span>
                  <span className="text-muted">: </span>
                  {/* ── EDIT: your name ── */}
                  <span className="text-orange">&quot;Your Name&quot;</span><span className="text-muted">,</span>
                </p>
                <p className="pl-5">
                  <span className="text-green">location</span>
                  <span className="text-muted">: </span>
                  {/* ── EDIT: your location ── */}
                  <span className="text-orange">&quot;Lagos, Nigeria&quot;</span><span className="text-muted">,</span>
                </p>
                <p className="pl-5">
                  <span className="text-green">role</span>
                  <span className="text-muted">: </span>
                  <span className="text-orange">&quot;Full-Stack Developer&quot;</span><span className="text-muted">,</span>
                </p>
                <p className="pl-5">
                  <span className="text-green">focus</span>
                  <span className="text-muted">: [</span>
                  <span className="text-orange">&quot;C# .NET&quot;</span>
                  <span className="text-muted">, </span>
                  <span className="text-orange">&quot;Next.js&quot;</span>
                  <span className="text-muted">],</span>
                </p>
                <p className="pl-5">
                  <span className="text-green">building</span>
                  <span className="text-muted">: </span>
                  {/* ── EDIT: what you're currently working on ── */}
                  <span className="text-orange">&quot;Healthcare Management System&quot;</span><span className="text-muted">,</span>
                </p>
                <p className="pl-5">
                  <span className="text-green">available</span>
                  <span className="text-muted">: </span>
                  <span className="text-cyan">true</span><span className="text-muted">,</span>
                </p>
                <p><span className="text-muted">{"}"};</span></p>
                <p className="pt-2 text-muted/60 text-xs">
                  {/* ── EDIT: your short bio ── */}
                  {"// I turn complex problems into clean, maintainable systems."}
                </p>
              </div>
            </div>
          </motion.div>

          {/* Right — facts grid */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="space-y-6"
          >
            <p className="font-sans text-muted leading-relaxed">
              {/* ── EDIT: your paragraph bio ── */}
              I&apos;m a full-stack developer passionate about building software that solves
              real problems. I specialise in crafting robust backend systems with{" "}
              <span className="text-text">C# and .NET</span>, and pairing them with
              modern, accessible frontends in{" "}
              <span className="text-text">Next.js and TypeScript</span>.
            </p>
            <p className="font-sans text-muted leading-relaxed">
              {/* ── EDIT: your second paragraph ── */}
              Currently rebuilding a full Healthcare Management System — applying
              Onion Architecture, real-time chat via SignalR, and role-based multi-tenant
              access — to deepen my systems design skills and ship something meaningful.
            </p>

            {/* Quick facts grid */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              {FACTS.map(({ icon: Icon, label, value }, i) => (
                <motion.div
                  key={label}
                  initial={{ opacity: 0, y: 12 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.3 + i * 0.08 }}
                  className="bg-bg border border-border rounded-lg p-4 hover:border-green/30 transition-colors"
                >
                  <Icon size={15} className="text-green mb-2" />
                  <p className="font-mono text-xs text-muted mb-0.5">{label}</p>
                  <p className="font-mono text-sm text-text font-bold">{value}</p>
                </motion.div>
              ))}
            </div>

            {/* CTA */}
            <div className="flex items-center gap-4 pt-2">
              <a href="#projects"
                className="font-mono text-sm text-green hover:text-green/80 transition-colors flex items-center gap-1.5">
                view_projects() <span className="text-muted">→</span>
              </a>
              <span className="text-border">|</span>
              <a href="/cv.pdf" download
                className="font-mono text-sm text-muted hover:text-text transition-colors">
                download_cv
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
