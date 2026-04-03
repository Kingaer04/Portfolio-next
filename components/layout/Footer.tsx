import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

const SOCIALS = [
  { icon: FaGithub,   href: "https://github.com/yourusername",          label: "GitHub" },
  { icon: FaLinkedin, href: "https://linkedin.com/in/yourprofile",       label: "LinkedIn" },
  { icon: FaTwitter,  href: "https://twitter.com/yourhandle",            label: "Twitter" },
  { icon: MdEmail,    href: "mailto:you@email.com",                      label: "Email" },
];

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-border bg-surface">
      <div className="max-w-6xl mx-auto px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="font-mono text-xs text-muted">
          <span className="text-green">// </span>
          &copy; {year} Your Name. Built with Next.js.
        </p>
        <div className="flex items-center gap-5">
          {SOCIALS.map(({ icon: Icon, href, label }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="text-muted hover:text-green transition-colors duration-200"
            >
              <Icon size={18} />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
