export type ProjectStatus = "completed" | "in-progress" | "planned";

export type Project = {
  id: string;
  title: string;
  description: string;
  tech: string[];
  repoUrl?: string;
  liveUrl?: string;
  imageUrl?: string;
  featured: boolean;
  status: ProjectStatus;
  year: number;
};

// ── EDIT THIS FILE to add/update your projects ──
// To add a new project, copy one of the objects below and append it to the array.
export const projects: Project[] = [
  {
    id: "hms",
    title: "Healthcare Management System",
    description:
      "A full-stack HMS featuring role-based portals for receptionists, doctors, and patients. Includes real-time appointment booking, SignalR-powered chat, and JWT-secured multi-tenant architecture.",
    tech: ["Next.js", "C#", ".NET 8", "SQL Server", "JWT"],
    repoUrl: "https://github.com/kingaer04",
    liveUrl: "",
    imageUrl: "/projects/hms.png",
    featured: true,
    status: "in-progress",
    year: 2025,
  },
  // ── Add more projects below ──
  // {
  //   id: "project-id",
  //   title: "Project Name",
  //   description: "Short description of what this project does.",
  //   tech: ["Tech1", "Tech2"],
  //   repoUrl: "https://github.com/yourusername/project",
  //   liveUrl: "https://project.com",
  //   imageUrl: "/projects/project.png",
  //   featured: false,
  //   status: "completed",
  //   year: 2025,
  // },
];
