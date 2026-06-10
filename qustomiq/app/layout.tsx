import type { Metadata, Viewport } from "next";
import "@fontsource/space-grotesk/400.css";
import "@fontsource/space-grotesk/500.css";
import "@fontsource/space-grotesk/600.css";
import "@fontsource/space-grotesk/700.css";
import "@fontsource/sora/400.css";
import "@fontsource/sora/500.css";
import "@fontsource/sora/600.css";
import "@fontsource/sora/700.css";
import "@fontsource/jetbrains-mono/400.css";
import "@fontsource/jetbrains-mono/500.css";
import "@fontsource/jetbrains-mono/600.css";
import "./globals.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: "QUSTOMIQ — Автоматизация бизнеса с помощью AI",
  description:
    "Кастомная разработка, системные интеграции и AI-решения для бизнеса. Технологический партнёр — надолго.",
  keywords: "разработка, интеграции, AI, автоматизация, CRM, ERP, Россия, СНГ",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <head />
      <body className="font-body bg-bg text-ink">
        <div className="bg-blob" aria-hidden="true" />
        <div style={{ position: "relative", zIndex: 1 }}>
          {children}
        </div>
      </body>
    </html>
  );
}
