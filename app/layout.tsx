import type { Metadata } from "next";
import { JetBrains_Mono, DM_Sans } from "next/font/google";
import "./globals.css";

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Daniel Anifowoshe — Software Developer",
  description:
    "Software developer specializing in C# .NET, Next.js, MERN stack for web development and React Native for mobile development. Building robust, scalable applications.",
  keywords: ["developer", "portfolio", "Next.js", "C#", ".NET", "full-stack"],
  authors: [{ name: "Daniel Anifowoshe" }],
  openGraph: {
    title: "Daniel Anifowoshe — Software Developer",
    description: "Software developer specializing in C# .NET and Next.js.",
    type: "website",
    url: "https://portfolio-next-liart-psi.vercel.app",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Daniel Anifowoshe — Software Developer",
    description: "Software developer specializing in C# .NET and Next.js.",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${jetbrainsMono.variable} ${dmSans.variable} bg-bg text-text`}>
        {children}
      </body>
    </html>
  );
}
