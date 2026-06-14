import type { Metadata, Viewport } from "next";
import "@fontsource/space-grotesk/400.css";
import "@fontsource/space-grotesk/500.css";
import "@fontsource/space-grotesk/600.css";
import "@fontsource/space-grotesk/700.css";
import "@fontsource/inter/400.css";
import "@fontsource/inter/500.css";
import "@fontsource/inter/600.css";
import "@fontsource/inter/700.css";
import "@fontsource/jetbrains-mono/400.css";
import "@fontsource/jetbrains-mono/500.css";
import "@fontsource/jetbrains-mono/600.css";
import "./globals.css";
import Providers from "@/components/Providers";
import GrainOverlay from "@/components/noise/GrainOverlay";
import CustomCursor from "@/components/cursor/CustomCursor";
import ScrollProgress from "@/components/ScrollProgress";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://qustomiq.ru"),
  title: "QUSTOMIQ — системы, которые не ломаются",
  description: "SFA · DMS · AI-интеграции для компаний, которым важен результат",
  keywords: "SFA, DMS, AI-интеграции, автоматизация, разработка, enterprise",
  openGraph: {
    title: "QUSTOMIQ — системы, которые не ломаются",
    description: "SFA · DMS · AI-интеграции для компаний, которым важен результат",
    url: "https://qustomiq.ru",
    siteName: "QUSTOMIQ",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
    locale: "ru_RU",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "QUSTOMIQ — системы, которые не ломаются",
    description: "SFA · DMS · AI-интеграции для компаний, которым важен результат",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <head />
      <body style={{ background: "var(--obsidian)", color: "var(--snow)" }}>
        <Providers>
          <GrainOverlay />
          <CustomCursor />
          <ScrollProgress />
          {children}
        </Providers>
      </body>
    </html>
  );
}
