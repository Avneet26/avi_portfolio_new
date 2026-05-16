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
import ResumeBreaker from "@/components/ui/ResumeBreaker";

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

      {/* Breaker — after the career timeline, when recruiters are warmest */}
      <section
        aria-label="Download resume"
        className="border-b bg-cyber-b"
        style={{ borderColor: "var(--color-ink)" }}
      >
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10 py-14 lg:py-16">
          <ResumeBreaker
            code="REQ-01"
            label="// Recruiter brief"
            headline="Like the career log? Take the file."
            sub="Single page · A4 · Updated 2026 · Open to remote and relocation."
            variant="orange"
          />
        </div>
      </section>

      <FreelanceJourney />
      <Projects />

      {/* Breaker — after the project showcase, framed as a follow-up CTA */}
      <section
        aria-label="Download resume"
        className="border-b bg-cyber-a"
        style={{ borderColor: "var(--color-ink)" }}
      >
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10 py-14 lg:py-16">
          <ResumeBreaker
            code="REQ-02"
            label="// Hiring signal"
            headline="Need the formal one-pager?"
            sub="The same story in a clean, forwardable PDF."
            variant="cyan"
          />
        </div>
      </section>

      <Education />
      <Blogs />
      <Contact />
      <Footer />
    </main>
  );
}
