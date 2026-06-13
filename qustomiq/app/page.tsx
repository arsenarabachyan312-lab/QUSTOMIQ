import Hero    from "@/sections/Hero";
import Metrics  from "@/sections/Metrics";
import Services from "@/sections/Services";
import Process  from "@/sections/Process";
import Cases    from "@/sections/Cases";
import Contact  from "@/sections/Contact";
import Footer   from "@/sections/Footer";

export default function Home() {
  return (
    <>
      <main>
        <Hero />
        <Metrics />
        <Services />
        <Process />
        <Cases />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
