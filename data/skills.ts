export type SkillCategory = {
  label: string;
  color: "green" | "cyan" | "orange" | "muted";
  skills: string[];
};

// ── EDIT THIS FILE to update your skills ──
export const skillCategories: SkillCategory[] = [
  {
    label: "Frontend",
    color: "cyan",
    skills: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Framer Motion"],
  },
  {
    label: "Backend",
    color: "green",
    skills: ["C#", ".NET 8", "ASP.NET Core", "SignalR", "REST APIs"],
  },
  {
    label: "Database",
    color: "orange",
    skills: ["PostgreSQL", "Redis", "Entity Framework Core", "SQL Server"],
  },
  {
    label: "DevOps & Tools",
    color: "muted",
    skills: ["Docker", "GitHub Actions", "Nginx", "Vercel", "Git"],
  },
];
