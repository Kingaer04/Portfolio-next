import Navbar   from "@/components/layout/Navbar";
import Footer   from "@/components/layout/Footer";
import Hero     from "@/components/sections/Hero";
import About    from "@/components/sections/About";
import Skills   from "@/components/sections/Skills";
import Projects from "@/components/sections/Projects";

export default function Home() {
  return (
    <main className="min-h-screen bg-bg">
      <Navbar />
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Footer />
    </main>
  );
}
