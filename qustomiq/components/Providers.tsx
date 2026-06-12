"use client";

import { LangProvider } from "@/lib/LangContext";
import CustomCursor from "@/components/CustomCursor";
import ScrollProgress from "@/components/ScrollProgress";
import RevealOnScroll from "@/components/RevealOnScroll";
import type { ReactNode } from "react";

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <LangProvider>
      <ScrollProgress />
      <CustomCursor />
      <RevealOnScroll />
      {children}
    </LangProvider>
  );
}
