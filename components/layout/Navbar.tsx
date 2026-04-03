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
      <nav className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">

        {/* Logo */}
        <a href="#hero" className="font-mono text-green font-bold text-base tracking-tight hover:opacity-75 transition-opacity flex items-center gap-1">
          <span className="text-muted">&lt;</span>ANNY<span className="text-muted">/&gt;</span>
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
        {/* ── EDIT: replace with your email ── */}
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
                    <span className="text-green/50"></span>{label}
                  </a>
                </li>
              ))}
              <li className="pt-2 border-t border-border mt-1">
                <a href="mailto:you@email.com"
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
