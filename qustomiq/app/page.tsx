import Providers from "@/components/Providers";
import Hero from "@/sections/Hero";
import Clients from "@/sections/Clients";
import Services from "@/sections/Services";
import AIByDept from "@/sections/AIByDept";
import Process from "@/sections/Process";
import About from "@/sections/About";
import Team from "@/sections/Team";
import Metrics from "@/sections/Metrics";
import Cases from "@/sections/Cases";
import CTA from "@/sections/CTA";
import Footer from "@/sections/Footer";

export default function Home() {
  return (
    <Providers>
      <main>
        {/* Hero includes Nav — full-screen first view */}
        <Hero />
        <Clients />
        <Services />
<AIByDept />
        <Process />
        <About />
        <Team />
        <Metrics />
        <Cases />
        <CTA />
      </main>
      <Footer />
    </Providers>
  );
}
