"use client";

import { useState } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { TrendingUp, Maximize2 } from "lucide-react";
import { cn, formatFullCurrency } from "@/lib/utils";

interface DataPoint {
  month: string;
  revenue: number;
  expenses: number;
  profit: number;
}

interface AreaChartWidgetProps {
  data: DataPoint[];
}

type DataKey = "revenue" | "expenses" | "profit";

const metrics: { key: DataKey; label: string; color: string }[] = [
  { key: "revenue", label: "Revenue", color: "var(--chart-1)" },
  { key: "expenses", label: "Expenses", color: "var(--chart-5)" },
  { key: "profit", label: "Profit", color: "var(--chart-3)" },
];

function CustomTooltip({ active, payload, label }: { active?: boolean; payload?: Array<{ value: number; color: string; dataKey: string }>; label?: string }) {
  if (!active || !payload) return null;
  return (
    <div className="rounded-xl border bg-[var(--surface)] border-[var(--border-color)] p-3 shadow-xl shadow-black/20">
      <p className="mb-2 text-xs font-medium text-[var(--muted)]">{label}</p>
      {payload.map((entry) => (
        <div key={entry.dataKey} className="flex items-center gap-2 text-sm">
          <div
            className="h-2.5 w-2.5 rounded-full"
            style={{ backgroundColor: entry.color }}
          />
          <span className="text-[var(--muted)] capitalize">{entry.dataKey}:</span>
          <span className="font-semibold text-[var(--foreground)]">
            {formatFullCurrency(entry.value)}
          </span>
        </div>
      ))}
    </div>
  );
}

export default function AreaChartWidget({ data }: AreaChartWidgetProps) {
  const [visibleMetrics, setVisibleMetrics] = useState<Set<DataKey>>(
    new Set(["revenue", "profit"])
  );
  const [isHovered, setIsHovered] = useState(false);

  function toggleMetric(key: DataKey) {
    setVisibleMetrics((prev) => {
      const next = new Set(prev);
      if (next.has(key)) {
        if (next.size > 1) next.delete(key);
      } else {
        next.add(key);
      }
      return next;
    });
  }

  const totalRevenue = data.reduce((sum, d) => sum + d.revenue, 0);

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={cn(
        "rounded-2xl border p-5 transition-all duration-300",
        "bg-[var(--surface)] border-[var(--border-color)]",
        "hover:border-[var(--primary)]/20"
      )}
    >
      {/* Header */}
      <div className="mb-5 flex items-start justify-between">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <TrendingUp size={18} className="text-[var(--primary)]" />
            <h3 className="font-[family-name:var(--font-display)] text-base font-semibold text-[var(--foreground)]">
              Revenue Overview
            </h3>
          </div>
          <p className="text-sm text-[var(--muted)]">
            Total: {formatFullCurrency(totalRevenue)}
          </p>
        </div>
        <button
          className={cn(
            "rounded-lg p-2 text-[var(--muted)] transition-all",
            "hover:bg-[var(--surface-hover)] hover:text-[var(--foreground)]",
            "opacity-0 group-hover:opacity-100",
            isHovered && "opacity-100"
          )}
        >
          <Maximize2 size={16} />
        </button>
      </div>

      {/* Metric toggles */}
      <div className="mb-4 flex flex-wrap gap-2">
        {metrics.map((m) => (
          <button
            key={m.key}
            onClick={() => toggleMetric(m.key)}
            className={cn(
              "flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition-all",
              visibleMetrics.has(m.key)
                ? "bg-[var(--surface-hover)] text-[var(--foreground)]"
                : "text-[var(--muted)] hover:text-[var(--foreground)]"
            )}
          >
            <div
              className={cn(
                "h-2 w-2 rounded-full transition-opacity",
                !visibleMetrics.has(m.key) && "opacity-30"
              )}
              style={{ backgroundColor: m.color }}
            />
            {m.label}
          </button>
        ))}
      </div>

      {/* Chart */}
      <div className="h-[280px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 5, right: 5, left: -15, bottom: 0 }}>
            <defs>
              {metrics.map((m) => (
                <linearGradient key={m.key} id={`gradient-${m.key}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={m.color} stopOpacity={0.3} />
                  <stop offset="95%" stopColor={m.color} stopOpacity={0} />
                </linearGradient>
              ))}
            </defs>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="var(--border-color)"
              vertical={false}
            />
            <XAxis
              dataKey="month"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "var(--muted)", fontSize: 12 }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: "var(--muted)", fontSize: 12 }}
              tickFormatter={(v: number) => `$${(v / 1000).toFixed(0)}K`}
            />
            <Tooltip content={<CustomTooltip />} />
            {metrics.map((m) =>
              visibleMetrics.has(m.key) ? (
                <Area
                  key={m.key}
                  type="monotone"
                  dataKey={m.key}
                  stroke={m.color}
                  strokeWidth={2}
                  fill={`url(#gradient-${m.key})`}
                  dot={false}
                  activeDot={{
                    r: 5,
                    stroke: m.color,
                    strokeWidth: 2,
                    fill: "var(--surface)",
                  }}
                />
              ) : null
            )}
            <Legend
              verticalAlign="bottom"
              height={0}
              content={() => null}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
