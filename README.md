# Portfolio — Dark & Technical

A personal developer portfolio built with **Next.js 14**, **TypeScript**, and **Tailwind CSS**.

## Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Run the dev server
npm run dev

# 3. Open http://localhost:3000
```

## Personalizing the Portfolio

### 1. Your Name & Bio
Open `components/sections/Hero.tsx` and edit:
- **Line with "Your Name"** → replace with your actual name
- **TypeAnimation sequence** → replace roles with your own titles
- **Bio paragraph** → write your own short description
- **Tech line at the bottom** → update to your primary stack

### 2. Nav Logo
Open `components/layout/Navbar.tsx`:
- Change `&lt;YN /&gt;` to your initials

### 3. Contact Email
Search for `you@email.com` across the project and replace with your real email.

### 4. Social Links
Open `components/layout/Footer.tsx` and update the `SOCIALS` array with your actual URLs.

### 5. Skills
Open `data/skills.ts` and update the `skillCategories` array with your real skills.

### 6. Projects
Open `data/projects.ts` and update the `projects` array:
- Edit the existing HMS entry with your real GitHub repo URL
- Add more projects by appending new objects (a template is commented in the file)

### 7. CV / Resume
Place your CV PDF at `public/cv.pdf` — the "Download CV" button in the Hero will serve it automatically.

### 8. OG Image
Replace `public/og-image.png` with a 1200x630px image for social sharing previews.

### 9. Metadata
Open `app/layout.tsx` and update the `metadata` object: title, description, URL, and author.

## Adding a New Project

```ts
// data/projects.ts
{
  id: "my-new-project",
  title: "My New Project",
  description: "What it does in 2-3 sentences.",
  tech: ["Next.js", "PostgreSQL"],
  repoUrl: "https://github.com/you/project",
  liveUrl: "https://project.com",
  imageUrl: "/projects/my-new-project.png",
  featured: true,
  status: "completed",
  year: 2025,
}
```

Then `git push` — Vercel auto-deploys in ~30 seconds.

## Deploying to Vercel

```bash
# Push to GitHub
git init && git add . && git commit -m "feat: initial portfolio"
git remote add origin https://github.com/you/portfolio.git
git push -u origin main
```

Then go to [vercel.com](https://vercel.com), import the repo — zero config needed.

## Project Structure

```
portfolio/
├── app/
│   ├── layout.tsx          # Fonts, metadata, root layout
│   ├── page.tsx            # Assembles all sections
│   └── globals.css         # Tailwind + CSS variables
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx      # Fixed nav with scroll-spy
│   │   └── Footer.tsx      # Social links
│   ├── sections/
│   │   ├── Hero.tsx        # Typing animation, CTA buttons
│   │   ├── Skills.tsx      # Skill category grid
│   │   └── Projects.tsx    # Project cards grid
│   └── ui/
│       ├── Badge.tsx       # Skill token badge
│       ├── ProjectCard.tsx # Project card with glow
│       └── SectionHeader.tsx
├── data/
│   ├── skills.ts           # ← Edit your skills here
│   └── projects.ts         # ← Edit your projects here
├── lib/
│   └── utils.ts            # cn() helper
└── public/
    ├── cv.pdf              # ← Add your CV here
    ├── og-image.png        # ← Add your OG image here
    └── projects/           # ← Add project screenshots here
```
