"use client";

import { LangProvider } from "@/lib/LangContext";
import CustomCursor from "@/components/CustomCursor";
import type { ReactNode } from "react";

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <LangProvider>
      <CustomCursor />
      {children}
    </LangProvider>
  );
}
