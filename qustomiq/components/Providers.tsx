"use client";

import { ThemeProvider } from "@/lib/ThemeContext";
import { LangProvider } from "@/lib/LangContext";
import CustomCursor from "@/components/CustomCursor";
import type { ReactNode } from "react";

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider>
      <LangProvider>
        <CustomCursor />
        {children}
      </LangProvider>
    </ThemeProvider>
  );
}
