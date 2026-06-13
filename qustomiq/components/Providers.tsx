"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { LangProvider } from "@/lib/LangContext";
import CustomCursor from "@/components/CustomCursor";
import ScrollProgress from "@/components/ScrollProgress";
import RevealOnScroll from "@/components/RevealOnScroll";
import type { ReactNode } from "react";

export default function Providers({ children }: { children: ReactNode }) {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });

    let raf: number;
    function tick(time: number) {
      lenis.raf(time);
      raf = requestAnimationFrame(tick);
    }
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
    };
  }, []);

  return (
    <LangProvider>
      <ScrollProgress />
      <CustomCursor />
      <RevealOnScroll />
      {children}
    </LangProvider>
  );
}
