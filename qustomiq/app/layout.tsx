import type { Metadata } from "next";
import { Space_Grotesk, Sora, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-display",
  display: "swap",
});

const sora = Sora({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-body",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-mono",
  display: "swap",
});

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
    <html lang="ru" suppressHydrationWarning>
      <head>
        {/* No-flash theme script — runs before React hydration */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('theme');if(t==='dark'){document.documentElement.classList.add('dark')}}catch(e){}})()`,
          }}
        />
      </head>
      <body
        className={`${spaceGrotesk.variable} ${sora.variable} ${jetbrainsMono.variable} font-body bg-bg text-ink`}
      >
        {children}
      </body>
    </html>
  );
}
