"use client";

import { useLang } from "@/lib/LangContext";
import SectionBg from "@/components/SectionBg";
import { type ReactNode } from "react";

/* ── SVG icons ─────────────────────────────────────────────── */

const IconSFA = () => (
  <svg width="38" height="38" viewBox="0 0 38 38" fill="none" aria-hidden="true">
    <rect x="9" y="2" width="20" height="34" rx="4" fill="rgba(236,100,38,0.10)" stroke="#EC6426" strokeWidth="1.6"/>
    <circle cx="19" cy="13" r="5" fill="#EC6426"/>
    <path d="M12 26c0-3.866 3.134-7 7-7s7 3.134 7 7" stroke="#EC6426" strokeWidth="1.6" strokeLinecap="round"/>
    <circle cx="19" cy="33" r="1.8" fill="rgba(236,100,38,0.40)"/>
    <rect x="15" y="4.5" width="8" height="1.5" rx="0.75" fill="rgba(236,100,38,0.35)"/>
  </svg>
);

const IconDMS = () => (
  <svg width="38" height="38" viewBox="0 0 38 38" fill="none" aria-hidden="true">
    <circle cx="19" cy="19" r="5" fill="#F8A91F"/>
    <circle cx="5"  cy="7"  r="3.5" fill="rgba(248,169,31,0.20)" stroke="#F8A91F" strokeWidth="1.5"/>
    <circle cx="33" cy="7"  r="3.5" fill="rgba(248,169,31,0.20)" stroke="#F8A91F" strokeWidth="1.5"/>
    <circle cx="5"  cy="31" r="3.5" fill="rgba(248,169,31,0.20)" stroke="#F8A91F" strokeWidth="1.5"/>
    <circle cx="33" cy="31" r="3.5" fill="rgba(248,169,31,0.20)" stroke="#F8A91F" strokeWidth="1.5"/>
    <path d="M8 9l8 7M30 9l-8 7M8 29l8-7M30 29l-8-7" stroke="#F8A91F" strokeWidth="1.3"/>
  </svg>
);

const IconAIAgent = () => (
  <svg width="38" height="38" viewBox="0 0 38 38" fill="none" aria-hidden="true">
    <rect x="3" y="9" width="22" height="16" rx="4" fill="rgba(236,100,38,0.10)" stroke="#EC6426" strokeWidth="1.6"/>
    <circle cx="10" cy="17" r="2.2" fill="#EC6426"/>
    <circle cx="17" cy="17" r="2.2" fill="#EC6426"/>
    <path d="M25 14l10-5v18l-10-5" fill="rgba(236,100,38,0.15)" stroke="#EC6426" strokeWidth="1.5"/>
    <path d="M9 25v5" stroke="#EC6426" strokeWidth="1.6" strokeLinecap="round"/>
    <path d="M17 25v5" stroke="#EC6426" strokeWidth="1.6" strokeLinecap="round"/>
    <path d="M9 30h8" stroke="#EC6426" strokeWidth="1.6" strokeLinecap="round"/>
  </svg>
);

const IconAIAnalytics = () => (
  <svg width="38" height="38" viewBox="0 0 38 38" fill="none" aria-hidden="true">
    <rect x="2" y="2" width="34" height="34" rx="6" fill="rgba(248,169,31,0.08)" stroke="#F8A91F" strokeWidth="1.5"/>
    <path d="M7 28l7-9 6 5 6-12 5 7" stroke="#F8A91F" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
    <circle cx="30" cy="8" r="4.5" fill="#F8A91F"/>
    <path d="M29 8h2M30 7v2" stroke="white" strokeWidth="1.3" strokeLinecap="round"/>
  </svg>
);

const IconBI = () => (
  <svg width="38" height="38" viewBox="0 0 38 38" fill="none" aria-hidden="true">
    <rect x="2"  y="22" width="8"  height="14" rx="2.5" fill="#EC6426"/>
    <rect x="12" y="16" width="8"  height="20" rx="2.5" fill="rgba(236,100,38,0.70)"/>
    <rect x="22" y="9"  width="8"  height="27" rx="2.5" fill="rgba(236,100,38,0.45)"/>
    <rect x="32" y="3"  width="4"  height="33" rx="2"   fill="rgba(236,100,38,0.25)"/>
    <path d="M5 20l10-9 10-4 10-5" stroke="#F8A91F" strokeWidth="1.6" strokeLinecap="round" strokeDasharray="2.5 2"/>
  </svg>
);

/* ── Cases data ─────────────────────────────────────────────── */

type Metric = { value: string; label: string };

type Case = {
  tag: string;
  tagColor: string;
  icon: ReactNode;
  title: string;
  desc: string;
  metrics: Metric[];
  stack: string[];
};

const CASES: Case[] = [
  {
    tag: "SFA · Мобильные продажи",
    tagColor: "#EC6426",
    icon: <IconSFA />,
    title: "Мобильный SFA для полевых команд",
    desc: "Приложение для торговых представителей: маршруты, заказы и отчёты прямо со смартфона. Данные уходят в 1С и CRM в реальном времени — без Excel и звонков в офис.",
    metrics: [
      { value: "+34%", label: "покрытие точек" },
      { value: "−60%", label: "время отчётов" },
      { value: "200+", label: "пользователей" },
    ],
    stack: ["React Native", "Node.js", "PostgreSQL", "1С"],
  },
  {
    tag: "DMS · Дистрибуция",
    tagColor: "#F8A91F",
    icon: <IconDMS />,
    title: "DMS: управление дистрибьюторской сетью",
    desc: "Единая платформа для управления заказами, остатками и KPI дистрибьюторов. Интеграция с 1С:ERP и Bitrix24 — данные синхронизируются автоматически.",
    metrics: [
      { value: "+28%", label: "точность заказов" },
      { value: "−40%", label: "out-of-stock" },
      { value: "45", label: "дистрибьюторов" },
    ],
    stack: ["1С:ERP", "REST API", "Bitrix24", "PostgreSQL"],
  },
  {
    tag: "AI · Телесейлз",
    tagColor: "#EC6426",
    icon: <IconAIAgent />,
    title: "AI-ассистент для телеагентов",
    desc: "AI слушает разговор в реальном времени и предлагает агенту подсказки, скрипты и ответы на возражения — прямо во время звонка. Без лишних переключений.",
    metrics: [
      { value: "+41%", label: "конверсия" },
      { value: "−35%", label: "время звонка" },
      { value: "80", label: "операторов" },
    ],
    stack: ["GPT-4o", "Claude", "RAG", "WebSocket"],
  },
  {
    tag: "AI · Аналитика",
    tagColor: "#F8A91F",
    icon: <IconAIAnalytics />,
    title: "AI-аналитика для супервайзеров",
    desc: "Дашборд на базе LLM: супервайзер задаёт вопрос текстом — система анализирует данные по полю и отвечает готовыми инсайтами и рекомендациями.",
    metrics: [
      { value: "+22%", label: "выполнение планов" },
      { value: "Real-time", label: "мониторинг" },
      { value: "LLM", label: "инсайты" },
    ],
    stack: ["RAG", "Vector DB", "Claude", "Next.js"],
  },
  {
    tag: "BI + AI · Отчётность",
    tagColor: "#EC6426",
    icon: <IconBI />,
    title: "BI-платформа с AI-аналитикой",
    desc: "Автоматическая генерация отчётов и прогнозов по продажам, полке и рынку по всем регионам. AI объясняет аномалии и предлагает конкретные действия.",
    metrics: [
      { value: "−70%", label: "время отчётов" },
      { value: "+18%", label: "точность планов" },
      { value: "12", label: "регионов" },
    ],
    stack: ["Python", "PostgreSQL", "GPT-4o", "Grafana"],
  },
];

/* ── Section ─────────────────────────────────────────────────── */

export default function Cases() {
  const { t } = useLang();
  const c = t.cases;

  return (
    <section id="cases" className="py-20 md:py-28 px-6 md:px-14 relative" aria-labelledby="cases-heading">
      <SectionBg />
      <div className="relative z-[1] max-w-[1200px] mx-auto">

        <div className="mb-14">
          <h2
            id="cases-heading"
            className="font-display font-bold text-[clamp(36px,5vw,52px)] tracking-[-1.5px] mb-4"
          >
            {c.heading}
          </h2>
          <p className="text-[17px] text-muted leading-[1.6] max-w-[640px]">{c.sub}</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {CASES.map((item, i) => (
            <article
              key={i}
              className="flex flex-col gap-5 p-7 rounded-2xl cursor-default"
              style={{
                background: "rgba(255,255,255,0.04)",
                backdropFilter: "blur(12px)",
                WebkitBackdropFilter: "blur(12px)",
                border: "1px solid rgba(255,255,255,0.08)",
                boxShadow: "0 4px 24px rgba(0,0,0,0.30)",
                transition: "transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease",
              }}
              onMouseEnter={e => {
                const el = e.currentTarget;
                el.style.transform = "translateY(-4px)";
                el.style.boxShadow = "0 16px 48px rgba(0,0,0,0.50), 0 0 0 1px rgba(245,166,35,0.25)";
                el.style.borderColor = "rgba(245,166,35,0.30)";
              }}
              onMouseLeave={e => {
                const el = e.currentTarget;
                el.style.transform = "translateY(0)";
                el.style.boxShadow = "0 4px 24px rgba(0,0,0,0.30)";
                el.style.borderColor = "rgba(255,255,255,0.08)";
              }}
            >
              {/* Icon + Tag */}
              <div className="flex items-start justify-between gap-2">
                <div className="flex-shrink-0">{item.icon}</div>
                <span
                  className="font-mono text-[10.5px] font-semibold uppercase tracking-[1.2px] px-2.5 py-1 rounded-full whitespace-nowrap"
                  style={{
                    background: item.tagColor === "#EC6426"
                      ? "rgba(236,100,38,0.10)"
                      : "rgba(248,169,31,0.14)",
                    color: item.tagColor,
                  }}
                >
                  {item.tag}
                </span>
              </div>

              {/* Title */}
              <h3
                className="font-display font-semibold text-[17px] tracking-[-0.3px] leading-snug"
                style={{ color: "#FFFFFF" }}
              >
                {item.title}
              </h3>

              {/* Description */}
              <p
                className="text-[13.5px] leading-[1.65] flex-1"
                style={{ color: "rgba(255,255,255,0.60)" }}
              >
                {item.desc}
              </p>

              {/* Metrics */}
              <div
                className="grid grid-cols-3 gap-2 pt-3"
                style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}
              >
                {item.metrics.map((m, mi) => (
                  <div key={mi} className="text-center">
                    <div
                      className="font-display font-extrabold text-[22px] leading-none tracking-[-0.5px]"
                      style={{ color: item.tagColor }}
                    >
                      {m.value}
                    </div>
                    <div
                      className="text-[10px] mt-1 leading-tight"
                      style={{ color: "rgba(255,255,255,0.50)" }}
                    >
                      {m.label}
                    </div>
                  </div>
                ))}
              </div>

              {/* Stack */}
              <div className="flex flex-wrap gap-1.5">
                {item.stack.map((s, si) => (
                  <span
                    key={si}
                    className="font-mono text-[10px] px-2 py-0.5 rounded"
                    style={{
                      background: "rgba(255,255,255,0.06)",
                      color: "rgba(255,255,255,0.55)",
                      border: "1px solid rgba(255,255,255,0.10)",
                    }}
                  >
                    {s}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>

      </div>
    </section>
  );
}
