"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HiMenuAlt3, HiX } from "react-icons/hi";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { label: "about",    href: "#about" },
  { label: "skills",   href: "#skills" },
  { label: "projects", href: "#projects" },
];

function GlitchLogo() {
  const [glitching, setGlitching] = useState(false);
  const [displayText, setDisplayText] = useState("ANNY");
  const chars = "アイウエオ#@$%01カキクケ";
  const original = "ANNY";

  const triggerGlitch = () => {
    if (glitching) return;
    setGlitching(true);
    let iterations = 0;
    const interval = setInterval(() => {
      setDisplayText(
        original.split("").map((char, i) =>
          i < iterations
            ? original[i]
            : chars[Math.floor(Math.random() * chars.length)]
        ).join("")
      );
      iterations += 0.4;
      if (iterations >= original.length + 1) {
        clearInterval(interval);
        setDisplayText(original);
        setGlitching(false);
      }
    }, 60);
  };

  useEffect(() => {
    setTimeout(triggerGlitch, 800);
    const loop = setInterval(triggerGlitch, 5000);
    return () => clearInterval(loop);
  }, []);

  return (
    <span
      onMouseEnter={triggerGlitch}
      className="font-mono font-bold text-base tracking-tight cursor-pointer select-none flex items-center gap-0.5 group"
    >
      <span className="text-muted group-hover:text-green transition-colors">&lt;</span>
      <span className="text-green relative">
        {displayText}
        {glitching && (
          <span className="absolute inset-0 text-cyan opacity-40 translate-x-0.5 pointer-events-none">
            {displayText}
          </span>
        )}
      </span>
      <span className="text-muted group-hover:text-green transition-colors">/&gt;</span>
    </span>
  );
}

export default function Navbar() {
  const [scrolled,       setScrolled]      = useState(false);
  const [activeSection,  setActiveSection] = useState("hero");
  const [menuOpen,       setMenuOpen]      = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sections = document.querySelectorAll<HTMLElement>("section[id]");
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) setActiveSection(e.target.id); }),
      { threshold: 0.35 }
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  return (
    <header className={cn(
      "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
      scrolled ? "bg-bg/80 backdrop-blur-xl border-b border-border/60" : "bg-transparent"
    )}>
      <nav className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">

        {/* Glitch logo */}
        <a href="#hero" aria-label="Home">
          <GlitchLogo />
        </a>

        {/* Desktop nav */}
        <ul className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map(({ label, href }) => {
            const id       = href.replace("#", "");
            const isActive = activeSection === id;
            return (
              <li key={label}>
                <a href={href} className={cn(
                  "relative font-mono text-sm px-3 py-2 rounded-md transition-colors duration-150 flex items-center gap-1.5",
                  isActive ? "text-green bg-green/5" : "text-muted hover:text-text hover:bg-white/5"
                )}>
                  {isActive && (
                    <motion.span layoutId="nav-dot" className="w-1 h-1 rounded-full bg-green" />
                  )}
                  {!isActive && <span className="w-1 h-1 rounded-full bg-transparent" />}
                  ./{label}
                </a>
              </li>
            );
          })}
        </ul>

        {/* Contact CTA */}
        <a href="mailto:danielanifowoshe04@gmail.com"
          className="hidden md:inline-flex items-center gap-1.5 font-mono text-xs px-4 py-2 border border-green/40 text-green rounded-md hover:bg-green/10 hover:border-green transition-all">
          <span className="text-green/70">&gt;</span> contact()
        </a>

        {/* Mobile hamburger */}
        <button
          className="md:hidden p-2 text-muted hover:text-text transition-colors rounded-md hover:bg-white/5"
          onClick={() => setMenuOpen((o) => !o)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <HiX size={20} /> : <HiMenuAlt3 size={20} />}
        </button>
      </nav>

      {/* Mobile drawer */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden overflow-hidden bg-surface/95 backdrop-blur-xl border-b border-border"
          >
            <ul className="flex flex-col px-6 py-5 gap-1">
              {NAV_LINKS.map(({ label, href }) => (
                <li key={label}>
                  <a href={href}
                    onClick={() => setMenuOpen(false)}
                    className="font-mono text-sm text-muted hover:text-green transition-colors flex items-center gap-2 py-2">
                    <span className="text-green/50">./</span>{label}
                  </a>
                </li>
              ))}
              <li className="pt-2 border-t border-border mt-1">
                <a href="mailto:danielanifowoshe04@gmail.com"
                  onClick={() => setMenuOpen(false)}
                  className="font-mono text-sm text-green flex items-center gap-2 py-2">
                  <span className="text-green/50">&gt;</span> contact()
                </a>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}