"use client";

import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { HiMenuAlt3, HiX } from "react-icons/hi";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { label: "about",    href: "#about",    code: "01" },
  { label: "skills",   href: "#skills",   code: "02" },
  { label: "projects", href: "#projects", code: "03" },
];

function GlitchLogo() {
  const [displayText, setDisplayText] = useState("ANNY");
  const [glitching,   setGlitching]   = useState(false);
  const chars    = "アイウエオ#@$%01カキクケ><_";
  const original = "ANNY";

  const triggerGlitch = () => {
    if (glitching) return;
    setGlitching(true);
    let iterations = 0;
    const interval = setInterval(() => {
      setDisplayText(
        original.split("").map((_, i) =>
          i < iterations ? original[i] : chars[Math.floor(Math.random() * chars.length)]
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
      className="font-mono font-bold text-base tracking-tight cursor-pointer select-none flex items-center"
    >
      <span className="text-muted">&lt;</span>
      <span className="text-green relative inline-block min-w-[3rem] text-center">
        {displayText}
        {glitching && (
          <span className="absolute inset-0 text-cyan opacity-30 translate-x-[2px] pointer-events-none">
            {displayText}
          </span>
        )}
      </span>
      <span className="text-muted">/&gt;</span>
    </span>
  );
}

export default function Navbar() {
  const [scrolled,      setScrolled]      = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const [menuOpen,      setMenuOpen]      = useState(false);

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
      <nav className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between gap-8">

        {/* Logo — fixed width so it never shifts layout */}
        <div className="flex-shrink-0">
          <a href="#hero" aria-label="Home">
            <GlitchLogo />
          </a>
        </div>

        {/* Desktop nav — centered */}
        <ul className="hidden md:flex items-center gap-1 flex-1 justify-center">
          {NAV_LINKS.map(({ label, href, code }) => {
            const id       = href.replace("#", "");
            const isActive = activeSection === id;
            return (
              <li key={label}>
                <a href={href} className={cn(
                  "relative font-mono text-xs px-4 py-2 rounded transition-all duration-150 flex items-center gap-2 group border",
                  isActive
                    ? "text-green bg-green/5 border-green/30"
                    : "text-muted border-transparent hover:text-green hover:border-green/20 hover:bg-green/5"
                )}>
                  <span className={cn(
                    "text-[10px] transition-colors",
                    isActive ? "text-green/60" : "text-border group-hover:text-green/40"
                  )}>{code}</span>
                  <span className="tracking-widest uppercase text-[11px]">{label}</span>
                  {isActive && (
                    <motion.span
                      layoutId="nav-active"
                      className="absolute -bottom-px left-0 right-0 h-px bg-green"
                    />
                  )}
                </a>
              </li>
            );
          })}
        </ul>

        {/* Contact */}
        <div className="flex-shrink-0">
          <a href="mailto:danielanifowoshe04@gmail.com"
            className="hidden md:inline-flex items-center gap-1.5 font-mono text-xs px-4 py-2 border border-green/30 text-green rounded hover:bg-green/10 hover:border-green transition-all">
            <span className="animate-pulse text-green">■</span> contact()
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden flex-shrink-0 p-2 text-muted hover:text-green transition-colors"
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
            className="md:hidden overflow-hidden bg-bg/95 backdrop-blur-xl border-b border-border"
          >
            {/* Scanline effect */}
            <div className="px-6 py-2 border-b border-border/50">
              <p className="font-mono text-[10px] text-green/40 tracking-widest">
                // NAVIGATION_MENU :: ONLINE
              </p>
            </div>
            <ul className="flex flex-col px-6 py-4 gap-1">
              {NAV_LINKS.map(({ label, href, code }) => (
                <li key={label}>
                  <a href={href}
                    onClick={() => setMenuOpen(false)}
                    className="font-mono text-sm text-muted hover:text-green transition-colors flex items-center gap-3 py-2.5 border-b border-border/30">
                    <span className="text-xs text-green/40">{code}</span>
                    <span className="tracking-widest uppercase text-xs">{label}</span>
                    <span className="ml-auto text-green/30 text-xs">→</span>
                  </a>
                </li>
              ))}
              <li className="pt-3">
                <a href="mailto:danielanifowoshe04@gmail.com"
                  onClick={() => setMenuOpen(false)}
                  className="font-mono text-sm text-green flex items-center gap-2 py-2">
                  <span className="animate-pulse">■</span> contact()
                </a>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
