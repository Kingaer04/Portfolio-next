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
  title: "Your Name — Full-Stack Developer",
  description:
    "Full-stack developer specializing in C# .NET and Next.js. Building robust, scalable applications.",
  keywords: ["developer", "portfolio", "Next.js", "C#", ".NET", "full-stack"],
  authors: [{ name: "Your Name" }],
  openGraph: {
    title: "Your Name — Full-Stack Developer",
    description: "Full-stack developer specializing in C# .NET and Next.js.",
    type: "website",
    url: "https://yourname.dev",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Your Name — Full-Stack Developer",
    description: "Full-stack developer specializing in C# .NET and Next.js.",
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
