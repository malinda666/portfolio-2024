import SectionWrapper from "@/components/ui/SectionWrapper";
import About from "@/components/views/About";
import Hero from "@/components/views/Hero";
import Works from "@/components/views/Works";

export default function Home() {
  return (
    <>
      <Hero />

      <Works />
      <About />
      <SectionWrapper variant="full">contact</SectionWrapper>
    </>
  );
}
