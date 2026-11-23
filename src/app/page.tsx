import { About } from "@/components/sections/About";
import { Categories } from "@/components/sections/Categories";
import { FinalCta } from "@/components/sections/FinalCta";
import { Hero } from "@/components/sections/Hero";
import { Intro } from "@/components/sections/Intro";
import { Process } from "@/components/sections/Process";
import { WhyLjCollective } from "@/components/sections/WhyLjCollective";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Intro />
      <Process />
      <Categories />
      <WhyLjCollective />
      <About />
      <FinalCta />
    </>
  );
}
