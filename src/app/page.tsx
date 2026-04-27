import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Experience from "@/components/sections/Experience";
import FreelanceJourney from "@/components/sections/FreelanceJourney";
import Projects from "@/components/sections/Projects";
import Education from "@/components/sections/Education";
import Blogs from "@/components/sections/Blogs";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/sections/Footer";
import TopTape from "@/components/ui/TopTape";
import Navbar from "@/components/ui/Navbar";

export default function Page() {
  return (
    <main className="relative min-h-screen overflow-x-clip">
      <header className="sticky top-0 z-50">
        <TopTape />
        <Navbar />
      </header>
      <Hero />
      <About />
      <Experience />
      <FreelanceJourney />
      <Projects />
      <Education />
      <Blogs />
      <Contact />
      <Footer />
    </main>
  );
}
