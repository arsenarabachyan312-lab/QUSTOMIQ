"use client";

import { motion, useReducedMotion } from "framer-motion";
import LineChart from "@/components/charts/LineChart";
import BarChart  from "@/components/charts/BarChart";
import RingChart from "@/components/charts/RingChart";
import { EASE_OUT } from "@/lib/animations";

/* ── Data ─────────────────────────────────────────────────── */
const REVENUE_DATA   = [22, 28, 25, 38, 35, 48, 56, 52, 62, 70, 78, 91];
const REVENUE_MONTHS = ["Янв","Фев","Мар","Апр","Май","Июн","Июл","Авг","Сен","Окт","Ноя","Дек"];

const DEPT_DATA   = [65, 80, 55, 90, 72, 88];
const DEPT_LABELS = ["CRM","ERP","HR","BI","API","AI"];

const KPI_DATA = [
  { value: "+34%", label: "Конверсия",       trend: "+8%",    dir: "up"     },
  { value: "−60%", label: "Время отчётов",   trend: "−12%",   dir: "down"   },
  { value: "2.4×", label: "ROI проектов",    trend: "+0.3×",  dir: "up"     },
  { value: "98%",  label: "NPS клиентов",    trend: "Топ-2%", dir: "stable" },
] as const;

const RING_DATA = [
  { value: 87, label: "Сдача\nв срок",   color: "#10B981" },
  { value: 94, label: "NPS\nклиентов",   color: "#A78BFA" },
  { value: 78, label: "Клиенты\nактивны",color: "#34F5C5" },
];

const TABLE_ROWS = [
  ["Дистрибьютор FMCG",              "FMCG",      "14", "3.6×", "✓ Активен", "#10B981"],
  ["Розничная сеть 300+ точек",       "Retail",    "9",  "2.9×", "✓ Активен", "#10B981"],
  ["Производитель продуктов питания", "FMCG",      "6",  "2.3×", "✓ Активен", "#10B981"],
  ["AI-платформа клиентского сервиса","AI",         "4",  "4.1×", "● Запуск",  "#A78BFA"],
  ["Логистический оператор FMCG",    "Logistics",  "5",  "2.1×", "✓ Активен", "#10B981"],
] as const;

/* ── KPI Card ─────────────────────────────────────────────── */
function KpiCard({ value, label, trend, dir }: typeof KPI_DATA[number]) {
  const color = dir === "down" ? "#A78BFA" : "#10B981";
  const arrow = dir === "up" ? "↑" : dir === "down" ? "↓" : "●";

  return (
    <div
      style={{
        background:   "rgba(255,255,255,0.03)",
        border:       "1px solid rgba(255,255,255,0.06)",
        borderRadius: 10,
        padding:      "16px 18px",
        flex:         1,
        minWidth:     0,
      }}
    >
      <div
        style={{
          fontFamily:    "var(--font-display)",
          fontSize:      "clamp(1.25rem, 2.5vw, 1.75rem)",
          fontWeight:    700,
          color,
          letterSpacing: "-0.02em",
          lineHeight:    1,
          marginBottom:  6,
        }}
      >
        {value}
      </div>
      <div style={{ fontSize: 11, color: "var(--text-hint)", marginBottom: 8 }}>{label}</div>
      <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
        <span style={{ fontSize: 10, color, fontFamily: "var(--font-mono)" }}>
          {arrow} {trend}
        </span>
        <span style={{ fontSize: 10, color: "var(--text-hint)" }}>vs пред.</span>
      </div>
    </div>
  );
}

/* ── Panel wrapper ────────────────────────────────────────── */
function Panel({ title, extra, children, style }: {
  title:     string;
  extra?:    React.ReactNode;
  children:  React.ReactNode;
  style?:    React.CSSProperties;
}) {
  return (
    <div
      style={{
        background:   "rgba(255,255,255,0.02)",
        border:       "1px solid rgba(255,255,255,0.05)",
        borderRadius: 10,
        padding:      "16px 18px",
        ...style,
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
        <span style={{ fontSize: 12, color: "var(--text-muted)", fontWeight: 500 }}>{title}</span>
        {extra}
      </div>
      {children}
    </div>
  );
}

/* ── Main export ──────────────────────────────────────────── */
export default function BI() {
  const reduce = useReducedMotion();

  return (
    <section
      id="bi"
      style={{ paddingBlock: "var(--section-py)", background: "var(--surface)" }}
    >
      <div className="q-container">

        {/* Section header */}
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65, ease: EASE_OUT }}
          style={{ marginBottom: "clamp(3rem, 6vw, 4.5rem)", maxWidth: 640 }}
        >
          <span className="eyebrow" style={{ marginBottom: 16 }}>BI & АНАЛИТИКА</span>
          <h2
            style={{
              fontSize:      "clamp(2rem, 5vw, 3rem)",
              letterSpacing: "-0.02em",
              marginBottom:  16,
            }}
          >
            Дашборды, которые управляют бизнесом
          </h2>
          <p style={{ color: "var(--text-muted)", fontSize: 17, lineHeight: 1.75 }}>
            Строим аналитические платформы, которые превращают данные в решения — в реальном времени.
          </p>
        </motion.div>

        {/* Browser Chrome Mockup */}
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 36, scale: 0.98 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.85, ease: EASE_OUT }}
          style={{
            background:  "var(--obsidian)",
            border:      "1px solid rgba(255,255,255,0.09)",
            borderRadius: 16,
            overflow:    "hidden",
            boxShadow:   "0 50px 100px rgba(0,0,0,0.55), 0 0 0 1px rgba(255,255,255,0.04), inset 0 1px 0 rgba(255,255,255,0.06)",
          }}
        >

          {/* ── Chrome bar ── */}
          <div
            style={{
              background:    "rgba(255,255,255,0.025)",
              borderBottom:  "1px solid rgba(255,255,255,0.06)",
              padding:       "11px 20px",
              display:       "flex",
              alignItems:    "center",
              gap:           16,
            }}
          >
            {/* Traffic lights */}
            <div style={{ display: "flex", gap: 6, flexShrink: 0 }}>
              {(["#FF5F57","#FFBD2E","#28CA41"] as const).map((c) => (
                <div key={c} style={{ width: 10, height: 10, borderRadius: "50%", background: c, opacity: 0.9 }} />
              ))}
            </div>

            {/* URL bar */}
            <div
              style={{
                flex:         1,
                maxWidth:     340,
                margin:       "0 auto",
                background:   "rgba(255,255,255,0.04)",
                border:       "1px solid rgba(255,255,255,0.07)",
                borderRadius: 6,
                padding:      "4px 12px",
                display:      "flex",
                alignItems:   "center",
                gap:          8,
              }}
            >
              <span style={{ fontSize: 9, color: "#10B981" }}>●</span>
              <span
                style={{
                  fontSize:    11,
                  color:       "var(--text-hint)",
                  fontFamily:  "var(--font-mono)",
                  letterSpacing: "0",
                }}
              >
                analytics.qustomiq.ru/dashboard
              </span>
            </div>

            {/* Controls */}
            <div style={{ display: "flex", gap: 8, marginLeft: "auto", flexShrink: 0 }}>
              {(["Последние 30 дней ▾", "Экспорт"] as const).map((btn, i) => (
                <div
                  key={btn}
                  style={{
                    fontSize:    11,
                    color:       i === 0 ? "var(--text-muted)" : "#10B981",
                    background:  "rgba(255,255,255,0.04)",
                    border:      `1px solid ${i === 0 ? "rgba(255,255,255,0.07)" : "rgba(16,185,129,0.22)"}`,
                    borderRadius: 5,
                    padding:     "4px 10px",
                    whiteSpace:  "nowrap",
                    cursor:      "default",
                  }}
                >
                  {btn}
                </div>
              ))}
            </div>
          </div>

          {/* ── Dashboard body ── */}
          <div style={{ padding: "22px 24px", overflowX: "auto" }}>

            {/* Dash header */}
            <div
              style={{
                display:        "flex",
                justifyContent: "space-between",
                alignItems:     "center",
                marginBottom:   18,
                minWidth:       620,
              }}
            >
              <div>
                <div style={{ fontSize: 14, fontWeight: 600, color: "var(--text-primary)", marginBottom: 2 }}>
                  Обзор бизнеса
                </div>
                <div style={{ fontSize: 11, color: "var(--text-hint)", fontFamily: "var(--font-mono)" }}>
                  Обновлено: только что · 12 источников данных
                </div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                {(["PDF отчёт", "+ Виджет"] as const).map((t, i) => (
                  <div
                    key={t}
                    style={{
                      fontSize:    11,
                      color:       i === 1 ? "#000" : "var(--text-muted)",
                      background:  i === 1 ? "#10B981" : "rgba(255,255,255,0.04)",
                      border:      "1px solid rgba(255,255,255,0.07)",
                      borderRadius: 6,
                      padding:     "4px 12px",
                      cursor:      "default",
                    }}
                  >
                    {t}
                  </div>
                ))}
              </div>
            </div>

            {/* KPI cards */}
            <div style={{ display: "flex", gap: 10, marginBottom: 16, minWidth: 620 }}>
              {KPI_DATA.map((k, i) => (
                <motion.div
                  key={i}
                  initial={reduce ? false : { opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, ease: EASE_OUT, delay: 0.1 + i * 0.07 }}
                  style={{ flex: 1 }}
                >
                  <KpiCard {...k} />
                </motion.div>
              ))}
            </div>

            {/* Charts row */}
            <div style={{ display: "grid", gridTemplateColumns: "3fr 2fr", gap: 12, marginBottom: 12, minWidth: 620 }}>

              {/* Revenue line chart */}
              <Panel
                title="Рост выручки клиентов"
                extra={
                  <span style={{ fontSize: 10, color: "#10B981", fontFamily: "var(--font-mono)" }}>
                    +91% за год ↑
                  </span>
                }
              >
                <LineChart data={REVENUE_DATA} labels={REVENUE_MONTHS} height={140} vw={460} />
              </Panel>

              {/* Right column: bar + rings */}
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                <Panel title="Автоматизация по направлениям" style={{ flex: 1 }}>
                  <BarChart data={DEPT_DATA} labels={DEPT_LABELS} height={110} vw={260} />
                </Panel>

                {/* Ring charts */}
                <div
                  style={{
                    background:    "rgba(255,255,255,0.02)",
                    border:        "1px solid rgba(255,255,255,0.05)",
                    borderRadius:  10,
                    padding:       "12px 18px",
                    display:       "flex",
                    justifyContent:"space-around",
                    alignItems:    "center",
                  }}
                >
                  {RING_DATA.map((r, i) => (
                    <motion.div
                      key={i}
                      initial={reduce ? false : { opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, ease: EASE_OUT, delay: 0.3 + i * 0.1 }}
                    >
                      <RingChart
                        value={r.value}
                        label={r.label}
                        color={r.color}
                        size={70}
                      />
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>

            {/* Data table */}
            <div style={{ minWidth: 620 }}>
              <div
                style={{
                  background:    "rgba(255,255,255,0.02)",
                  border:        "1px solid rgba(255,255,255,0.05)",
                  borderRadius:  10,
                  overflow:      "hidden",
                }}
              >
                {/* Table head */}
                <div
                  style={{
                    display:             "grid",
                    gridTemplateColumns: "2fr 1fr 0.7fr 0.7fr 1fr",
                    padding:             "9px 16px",
                    borderBottom:        "1px solid rgba(255,255,255,0.06)",
                    background:          "rgba(255,255,255,0.02)",
                  }}
                >
                  {(["Клиент / Проект","Отрасль","Проектов","ROI","Статус"] as const).map((h, i) => (
                    <span
                      key={h}
                      style={{
                        fontSize:      10,
                        color:         "var(--text-hint)",
                        fontFamily:    "var(--font-mono)",
                        textTransform: "uppercase",
                        letterSpacing: "0.1em",
                        textAlign:     i > 0 ? "right" : "left",
                      }}
                    >
                      {h}
                    </span>
                  ))}
                </div>

                {/* Table rows */}
                {TABLE_ROWS.map((row, ri) => (
                  <motion.div
                    key={ri}
                    initial={reduce ? false : { opacity: 0, x: -6 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.35, ease: EASE_OUT, delay: 0.15 + ri * 0.06 }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.025)";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLElement).style.background = "transparent";
                    }}
                    style={{
                      display:             "grid",
                      gridTemplateColumns: "2fr 1fr 0.7fr 0.7fr 1fr",
                      padding:             "10px 16px",
                      borderBottom:        ri < TABLE_ROWS.length - 1 ? "1px solid rgba(255,255,255,0.03)" : "none",
                      alignItems:          "center",
                      cursor:              "default",
                    }}
                  >
                    <span style={{ fontSize: 12, color: "var(--text-primary)", fontWeight: 500 }}>
                      {row[0]}
                    </span>
                    <span style={{ fontSize: 11, color: "var(--text-hint)", textAlign: "right", fontFamily: "var(--font-mono)" }}>
                      {row[1]}
                    </span>
                    <span style={{ fontSize: 12, color: "var(--text-muted)", textAlign: "right" }}>
                      {row[2]}
                    </span>
                    <span style={{ fontSize: 12, color: "#10B981", textAlign: "right", fontFamily: "var(--font-mono)", fontWeight: 600 }}>
                      {row[3]}
                    </span>
                    <span style={{ fontSize: 11, color: row[5], textAlign: "right", fontFamily: "var(--font-mono)" }}>
                      {row[4]}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
