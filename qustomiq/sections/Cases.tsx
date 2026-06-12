"use client";

import { useLang } from "@/lib/LangContext";
import SectionBg from "@/components/SectionBg";
import { type ReactNode, useRef, useEffect, useState, type MouseEvent } from "react";

/* ── SVG icons ─────────────────────────────────────────────── */
const IconSFA = () => (
  <svg width="38" height="38" viewBox="0 0 38 38" fill="none" aria-hidden="true">
    <rect x="9" y="2" width="20" height="34" rx="4" fill="rgba(16,185,129,0.12)" stroke="#10B981" strokeWidth="1.6"/>
    <circle cx="19" cy="13" r="5" fill="#10B981"/>
    <path d="M12 26c0-3.866 3.134-7 7-7s7 3.134 7 7" stroke="#10B981" strokeWidth="1.6" strokeLinecap="round"/>
    <circle cx="19" cy="33" r="1.8" fill="rgba(16,185,129,0.40)"/>
  </svg>
);
const IconDMS = () => (
  <svg width="38" height="38" viewBox="0 0 38 38" fill="none" aria-hidden="true">
    <circle cx="19" cy="19" r="5" fill="#A78BFA"/>
    <circle cx="5"  cy="7"  r="3.5" fill="rgba(167,139,250,0.20)" stroke="#A78BFA" strokeWidth="1.5"/>
    <circle cx="33" cy="7"  r="3.5" fill="rgba(167,139,250,0.20)" stroke="#A78BFA" strokeWidth="1.5"/>
    <circle cx="5"  cy="31" r="3.5" fill="rgba(167,139,250,0.20)" stroke="#A78BFA" strokeWidth="1.5"/>
    <circle cx="33" cy="31" r="3.5" fill="rgba(167,139,250,0.20)" stroke="#A78BFA" strokeWidth="1.5"/>
    <path d="M8 9l8 7M30 9l-8 7M8 29l8-7M30 29l-8-7" stroke="#A78BFA" strokeWidth="1.3"/>
  </svg>
);
const IconAIAgent = () => (
  <svg width="38" height="38" viewBox="0 0 38 38" fill="none" aria-hidden="true">
    <rect x="3" y="9" width="22" height="16" rx="4" fill="rgba(16,185,129,0.12)" stroke="#10B981" strokeWidth="1.6"/>
    <circle cx="10" cy="17" r="2.2" fill="#10B981"/><circle cx="17" cy="17" r="2.2" fill="#10B981"/>
    <path d="M25 14l10-5v18l-10-5" fill="rgba(16,185,129,0.15)" stroke="#10B981" strokeWidth="1.5"/>
    <path d="M9 25v5M17 25v5M9 30h8" stroke="#10B981" strokeWidth="1.6" strokeLinecap="round"/>
  </svg>
);
const IconAIAnalytics = () => (
  <svg width="38" height="38" viewBox="0 0 38 38" fill="none" aria-hidden="true">
    <rect x="2" y="2" width="34" height="34" rx="6" fill="rgba(167,139,250,0.08)" stroke="#A78BFA" strokeWidth="1.5"/>
    <path d="M7 28l7-9 6 5 6-12 5 7" stroke="#A78BFA" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
    <circle cx="30" cy="8" r="4.5" fill="#A78BFA"/>
    <path d="M29 8h2M30 7v2" stroke="white" strokeWidth="1.3" strokeLinecap="round"/>
  </svg>
);
const IconBI = () => (
  <svg width="38" height="38" viewBox="0 0 38 38" fill="none" aria-hidden="true">
    <rect x="2"  y="22" width="8"  height="14" rx="2.5" fill="#10B981"/>
    <rect x="12" y="16" width="8"  height="20" rx="2.5" fill="rgba(16,185,129,0.70)"/>
    <rect x="22" y="9"  width="8"  height="27" rx="2.5" fill="rgba(16,185,129,0.45)"/>
    <rect x="32" y="3"  width="4"  height="33" rx="2"   fill="rgba(16,185,129,0.25)"/>
    <path d="M5 20l10-9 10-4 10-5" stroke="#A78BFA" strokeWidth="1.6" strokeLinecap="round" strokeDasharray="2.5 2"/>
  </svg>
);

/* ── Count-up hook ─────────────────────────────────────────── */
function parseMetric(val: string): { prefix: string; num: number | null; suffix: string } {
  const m = val.match(/^([+\-]?)(\d+)(.*)$/);
  if (!m) return { prefix: "", num: null, suffix: val };
  return { prefix: m[1], num: parseInt(m[2]), suffix: m[3] };
}

function MetricValue({ value, color, visible }: { value: string; color: string; visible: boolean }) {
  const { prefix, num, suffix } = parseMetric(value);
  const [display, setDisplay] = useState(num !== null ? 0 : num);
  const started = useRef(false);

  useEffect(() => {
    if (!visible || num === null || started.current) return;
    started.current = true;
    const duration = 1200;
    const startTime = performance.now();
    const run = () => {
      const elapsed  = performance.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased    = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.round(eased * num));
      if (progress < 1) requestAnimationFrame(run);
    };
    requestAnimationFrame(run);
  }, [visible, num]);

  return (
    <div className="font-display font-extrabold text-[22px] leading-none tracking-[-0.5px]" style={{ color }}>
      {num !== null ? `${prefix}${display}${suffix}` : value}
    </div>
  );
}

/* ── Tilt + glow handler ─────────────────────────────────── */
function useCaseTilt(color: string) {
  const handleMove = (e: MouseEvent<HTMLElement>) => {
    const el = e.currentTarget;
    const r  = el.getBoundingClientRect();
    const x  = (e.clientX - r.left) / r.width  - 0.5;
    const y  = (e.clientY - r.top)  / r.height - 0.5;
    el.style.transform = `perspective(900px) rotateY(${x * 8}deg) rotateX(${-y * 8}deg) translateZ(8px)`;
    el.style.transition = "transform 0.08s ease, box-shadow 0.08s ease";
    el.style.boxShadow = `0 16px 48px rgba(0,0,0,0.45), 0 0 0 1px ${color}44, 0 0 30px ${color}22`;
    el.style.borderColor = `${color}44`;
  };
  const handleLeave = (e: MouseEvent<HTMLElement>) => {
    e.currentTarget.style.transform = "";
    e.currentTarget.style.transition = "transform 0.50s cubic-bezier(0.23,1,0.32,1), box-shadow 0.4s ease, border-color 0.4s ease";
    e.currentTarget.style.boxShadow = "";
    e.currentTarget.style.borderColor = "";
  };
  return { onMouseMove: handleMove, onMouseLeave: handleLeave };
}

/* ── Data ───────────────────────────────────────────────────── */
type Metric = { value: string; label: string };
type Case = { tag: string; accent: "emerald" | "violet"; icon: ReactNode; title: string; desc: string; metrics: Metric[]; stack: string[] };

const CASES: Case[] = [
  { tag: "SFA · Мобильные продажи", accent: "emerald", icon: <IconSFA />,
    title: "Мобильный SFA для полевых команд",
    desc: "Приложение для торговых представителей: маршруты, заказы и отчёты прямо со смартфона. Данные уходят в 1С и CRM в реальном времени.",
    metrics: [{ value: "+34%", label: "покрытие точек" }, { value: "-60%", label: "время отчётов" }, { value: "200+", label: "пользователей" }],
    stack: ["React Native", "Node.js", "PostgreSQL", "1С"] },
  { tag: "DMS · Дистрибуция", accent: "violet", icon: <IconDMS />,
    title: "DMS: управление дистрибьюторской сетью",
    desc: "Единая платформа для управления заказами, остатками и KPI дистрибьюторов. Интеграция с 1С:ERP и Bitrix24.",
    metrics: [{ value: "+28%", label: "точность заказов" }, { value: "-40%", label: "out-of-stock" }, { value: "45", label: "дистрибьюторов" }],
    stack: ["1С:ERP", "REST API", "Bitrix24", "PostgreSQL"] },
  { tag: "AI · Телесейлз", accent: "emerald", icon: <IconAIAgent />,
    title: "AI-ассистент для телеагентов",
    desc: "AI слушает разговор в реальном времени и предлагает подсказки, скрипты и ответы на возражения прямо во время звонка.",
    metrics: [{ value: "+41%", label: "конверсия" }, { value: "-35%", label: "время звонка" }, { value: "80", label: "операторов" }],
    stack: ["GPT-4o", "Claude", "RAG", "WebSocket"] },
  { tag: "AI · Аналитика", accent: "violet", icon: <IconAIAnalytics />,
    title: "AI-аналитика для супервайзеров",
    desc: "Дашборд на базе LLM: задаёшь вопрос текстом — система анализирует данные по полю и отвечает готовыми инсайтами.",
    metrics: [{ value: "+22%", label: "выполнение планов" }, { value: "Real-time", label: "мониторинг" }, { value: "LLM", label: "инсайты" }],
    stack: ["RAG", "Vector DB", "Claude", "Next.js"] },
  { tag: "BI + AI · Отчётность", accent: "emerald", icon: <IconBI />,
    title: "BI-платформа с AI-аналитикой",
    desc: "Автоматическая генерация отчётов и прогнозов. AI объясняет аномалии и предлагает конкретные действия.",
    metrics: [{ value: "-70%", label: "время отчётов" }, { value: "+18%", label: "точность планов" }, { value: "12", label: "регионов" }],
    stack: ["Python", "PostgreSQL", "GPT-4o", "Grafana"] },
];

const accentColor = (a: "emerald" | "violet") => a === "emerald" ? "#10B981" : "#A78BFA";
const accentBg    = (a: "emerald" | "violet") => a === "emerald" ? "rgba(16,185,129,0.10)" : "rgba(167,139,250,0.10)";

/* ── Card ─────────────────────────────────────────────────── */
function CaseCard({ item, i }: { item: Case; i: number }) {
  const color  = accentColor(item.accent);
  const bg     = accentBg(item.accent);
  const tilt   = useCaseTilt(color);
  const cardRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); io.disconnect(); } },
      { threshold: 0.25 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <article
      ref={cardRef}
      className={`rounded-card reveal reveal-delay-${(i % 4) + 1} flex flex-col gap-5 p-7 cursor-default`}
      style={{ willChange: "transform" }}
      {...tilt}
    >
      <div className="flex items-start justify-between gap-2">
        <div className="flex-shrink-0">{item.icon}</div>
        <span className="font-mono text-[10.5px] font-semibold uppercase tracking-[1.2px] px-2.5 py-1 rounded-full whitespace-nowrap"
          style={{ background: bg, color }}>
          {item.tag}
        </span>
      </div>

      <h3 className="font-display font-semibold text-[17px] tracking-[-0.3px] leading-snug" style={{ color: "var(--ink)" }}>
        {item.title}
      </h3>

      <p className="text-[13.5px] leading-[1.65] flex-1" style={{ color: "var(--muted)" }}>{item.desc}</p>

      <div className="grid grid-cols-3 gap-2 pt-3" style={{ borderTop: "1px solid var(--border)" }}>
        {item.metrics.map((m, mi) => (
          <div key={mi} className="text-center">
            <MetricValue value={m.value} color={color} visible={visible} />
            <div className="text-[10px] mt-1 leading-tight" style={{ color: "var(--muted)", opacity: 0.7 }}>
              {m.label}
            </div>
          </div>
        ))}
      </div>

      <div className="flex flex-wrap gap-1.5">
        {item.stack.map((s, si) => (
          <span key={si} className="font-mono text-[10px] px-2 py-0.5 rounded"
            style={{ background: "rgba(255,255,255,0.05)", color: "var(--muted)", border: "1px solid var(--border)" }}>
            {s}
          </span>
        ))}
      </div>
    </article>
  );
}

export default function Cases() {
  const { t } = useLang();
  const c = t.cases;

  return (
    <section id="cases" className="py-20 md:py-28 px-6 md:px-14 relative" aria-labelledby="cases-heading">
      <SectionBg />
      <div className="relative z-[1] max-w-[1200px] mx-auto">
        <div className="mb-14 reveal">
          <span className="section-label">Кейсы</span>
          <h2 id="cases-heading" className="mb-4">{c.heading}</h2>
          <p style={{ maxWidth: 640 }}>{c.sub}</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 lg:gap-6">
          {CASES.map((item, i) => <CaseCard key={i} item={item} i={i} />)}
        </div>
      </div>
    </section>
  );
}
