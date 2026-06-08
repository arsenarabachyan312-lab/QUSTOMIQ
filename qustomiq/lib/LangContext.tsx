"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  type ReactNode,
} from "react";
import { dict, type Locale, type Dict } from "./i18n";

type LangCtx = {
  locale: Locale;
  t: Dict;
  toggle: () => void;
};

const LangContext = createContext<LangCtx>({
  locale: "ru",
  t: dict.ru,
  toggle: () => {},
});

export function LangProvider({ children }: { children: ReactNode }) {
  const [locale, setLocale] = useState<Locale>("ru");

  const toggle = useCallback(
    () => setLocale((l) => (l === "ru" ? "en" : "ru")),
    []
  );

  return (
    <LangContext.Provider value={{ locale, t: dict[locale] as typeof dict.ru, toggle }}>
      {children}
    </LangContext.Provider>
  );
}

export const useLang = () => useContext(LangContext);
