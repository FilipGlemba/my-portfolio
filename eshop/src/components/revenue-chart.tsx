"use client";

import { useEffect, useRef, useState } from "react";
import { formatDate, formatPrice } from "@/lib/format";

type Day = { date: string; revenue: number; orders: number };

const H = 220;
const PAD = { top: 12, right: 4, bottom: 28, left: 48 };

// Round the axis max up to a friendly number so gridlines land on clean values.
function niceMax(value: number) {
  if (value <= 0) return 100;
  const magnitude = 10 ** Math.floor(Math.log10(value));
  return Math.ceil(value / magnitude) * magnitude;
}

export function RevenueChart({ daily }: { daily: Day[] }) {
  const [active, setActive] = useState<number | null>(null);
  // Draw at the real pixel width so labels stay 11px on every screen size
  // (a scaled viewBox would blow text up on desktop and shrink it on phones).
  const ref = useRef<HTMLElement>(null);
  const [W, setW] = useState(640);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new ResizeObserver(([entry]) => setW(Math.max(280, Math.round(entry.contentRect.width))));
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  const max = niceMax(Math.max(...daily.map((d) => d.revenue)));
  const plotW = W - PAD.left - PAD.right;
  const plotH = H - PAD.top - PAD.bottom;
  const slot = plotW / daily.length;
  const barW = Math.max(2, slot - 2); // 2px gap between bars
  const y = (value: number) => PAD.top + plotH - (value / max) * plotH;
  const ticks = [0, max / 2, max];
  const hovered = active === null ? null : daily[active];

  return (
    <figure ref={ref} className="relative">
      <svg viewBox={`0 0 ${W} ${H}`} width={W} height={H} className="block" role="img" aria-label="Revenue per day over the last 30 days">
        {ticks.map((tick) => (
          <g key={tick}>
            <line x1={PAD.left} x2={W - PAD.right} y1={y(tick)} y2={y(tick)} stroke="currentColor" className="text-black/10" />
            <text x={PAD.left - 8} y={y(tick)} dy="0.32em" textAnchor="end" className="fill-black/60 text-[11px] tabular-nums">
              €{Math.round(tick)}
            </text>
          </g>
        ))}
        {daily.map((day, i) => {
          const x = PAD.left + i * slot + 1;
          const h = Math.max(0, y(0) - y(day.revenue));
          return (
            <g
              key={day.date}
              tabIndex={0}
              onMouseEnter={() => setActive(i)}
              onMouseLeave={() => setActive(null)}
              onFocus={() => setActive(i)}
              onBlur={() => setActive(null)}
              className="cursor-default outline-none"
              aria-label={`${formatDate(day.date)}: ${formatPrice(day.revenue)}, ${day.orders} orders`}
            >
              {/* Hit target taller than the mark */}
              <rect x={x - 1} y={PAD.top} width={slot} height={plotH} fill="transparent" />
              {h > 0 ? (
                <path
                  d={`M${x},${y(0)} V${y(day.revenue) + Math.min(4, h)} q0,-${Math.min(4, h)} ${Math.min(4, barW / 2)},-${Math.min(4, h)} H${x + barW - Math.min(4, barW / 2)} q${Math.min(4, barW / 2)},0 ${Math.min(4, barW / 2)},${Math.min(4, h)} V${y(0)} Z`}
                  className={active === i ? "fill-flame-700" : "fill-flame-600"}
                />
              ) : null}
            </g>
          );
        })}
        {(W < 480 ? [0, 14, 29] : [0, 7, 14, 21, 29]).map((i) => (
          <text key={i} x={i === 0 ? PAD.left : i === daily.length - 1 ? W - PAD.right : PAD.left + i * slot + slot / 2} y={H - 8} textAnchor={i === 0 ? "start" : i === daily.length - 1 ? "end" : "middle"} className="fill-black/60 text-[11px]">
            {formatDate(daily[i].date).replace(/ \d{4}$/, "")}
          </text>
        ))}
      </svg>

      {hovered ? (
        <div
          className="pointer-events-none absolute top-0 whitespace-nowrap rounded-lg bg-ink px-3 py-2 text-xs text-white shadow-lg"
          style={{
            left: PAD.left + (active! + 0.5) * slot,
            // Keep the tooltip inside the card near the edges.
            transform: active! > daily.length * 0.75 ? "translateX(calc(-100% - 8px))" : active! < daily.length * 0.25 ? "translateX(8px)" : "translateX(-50%)",
          }}
        >
          <p className="font-semibold">{formatDate(hovered.date)}</p>
          <p className="tabular-nums text-white/80">
            {formatPrice(hovered.revenue)} · {hovered.orders} {hovered.orders === 1 ? "order" : "orders"}
          </p>
        </div>
      ) : null}

      {/* Table view for screen readers */}
      <table className="sr-only">
        <caption>Revenue per day, last 30 days</caption>
        <thead><tr><th>Date</th><th>Revenue</th><th>Orders</th></tr></thead>
        <tbody>
          {daily.map((day) => (
            <tr key={day.date}><td>{formatDate(day.date)}</td><td>{formatPrice(day.revenue)}</td><td>{day.orders}</td></tr>
          ))}
        </tbody>
      </table>
    </figure>
  );
}
