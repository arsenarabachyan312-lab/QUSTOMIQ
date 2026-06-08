"use client";

import { ThemeProvider } from "@/lib/ThemeContext";
import { LangProvider } from "@/lib/LangContext";
import type { ReactNode } from "react";

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider>
      <LangProvider>{children}</LangProvider>
    </ThemeProvider>
  );
}
