import Hero    from "@/sections/Hero";
import Metrics  from "@/sections/Metrics";
import Services from "@/sections/Services";
import About    from "@/sections/About";
import Process  from "@/sections/Process";
import Cases    from "@/sections/Cases";
import BI       from "@/sections/BI";
import Contact  from "@/sections/Contact";
import Footer   from "@/sections/Footer";

export default function Home() {
  return (
    <>
      <main>
        <Hero />
        <Metrics />
        <Services />
        <About />
        <Process />
        <Cases />
        <BI />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
