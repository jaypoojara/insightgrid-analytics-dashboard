"use client";

import { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { BarChart3, Download } from "lucide-react";
import { cn, formatFullCurrency } from "@/lib/utils";

interface DataPoint {
  category: string;
  sales: number;
  orders: number;
}

interface BarChartWidgetProps {
  data: DataPoint[];
}

const barColors = [
  "var(--chart-1)",
  "var(--chart-2)",
  "var(--chart-3)",
  "var(--chart-4)",
  "var(--chart-5)",
  "var(--chart-6)",
];

function CustomTooltip({ active, payload, label }: { active?: boolean; payload?: Array<{ value: number; dataKey: string }>; label?: string }) {
  if (!active || !payload) return null;
  const d = payload[0];
  return (
    <div className="rounded-xl border bg-[var(--surface)] border-[var(--border-color)] p-3 shadow-xl shadow-black/20">
      <p className="mb-2 text-xs font-medium text-[var(--foreground)]">{label}</p>
      <div className="space-y-1">
        <div className="flex items-center gap-2 text-sm">
          <div className="h-2.5 w-2.5 rounded-full bg-[var(--chart-1)]" />
          <span className="text-[var(--muted)]">Sales:</span>
          <span className="font-semibold text-[var(--foreground)]">
            {formatFullCurrency(d?.value ?? 0)}
          </span>
        </div>
      </div>
    </div>
  );
}

export default function BarChartWidget({ data }: BarChartWidgetProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [showOrders, setShowOrders] = useState(false);

  const totalSales = data.reduce((sum, d) => sum + d.sales, 0);

  return (
    <div className="rounded-2xl border p-5 transition-all duration-300 bg-[var(--surface)] border-[var(--border-color)] hover:border-[var(--primary)]/20">
      {/* Header */}
      <div className="mb-5 flex items-start justify-between">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <BarChart3 size={18} className="text-[var(--chart-2)]" />
            <h3 className="font-[family-name:var(--font-display)] text-base font-semibold text-[var(--foreground)]">
              Sales by Category
            </h3>
          </div>
          <p className="text-sm text-[var(--muted)]">
            Total: {formatFullCurrency(totalSales)}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowOrders(!showOrders)}
            className={cn(
              "rounded-lg px-3 py-1.5 text-xs font-medium transition-all",
              showOrders
                ? "bg-[var(--chart-2)]/15 text-[var(--chart-2)]"
                : "bg-[var(--surface-hover)] text-[var(--muted)] hover:text-[var(--foreground)]"
            )}
          >
            {showOrders ? "Orders" : "Revenue"}
          </button>
          <button className="rounded-lg p-2 text-[var(--muted)] transition-all hover:bg-[var(--surface-hover)] hover:text-[var(--foreground)]">
            <Download size={16} />
          </button>
        </div>
      </div>

      {/* Chart */}
      <div className="h-[280px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{ top: 5, right: 5, left: -15, bottom: 0 }}
            onMouseMove={(state) => {
              if (state?.activeTooltipIndex !== undefined) {
                setActiveIndex(Number(state.activeTooltipIndex));
              }
            }}
            onMouseLeave={() => setActiveIndex(null)}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="var(--border-color)"
              vertical={false}
            />
            <XAxis
              dataKey="category"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "var(--muted)", fontSize: 11 }}
              interval={0}
              angle={-20}
              textAnchor="end"
              height={50}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: "var(--muted)", fontSize: 12 }}
              tickFormatter={(v: number) =>
                showOrders ? String(v) : `$${(v / 1000).toFixed(0)}K`
              }
            />
            <Tooltip content={<CustomTooltip />} />
            <Bar
              dataKey={showOrders ? "orders" : "sales"}
              radius={[6, 6, 0, 0]}
              maxBarSize={48}
            >
              {data.map((_, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={barColors[index % barColors.length]}
                  opacity={activeIndex === null || activeIndex === index ? 1 : 0.3}
                  style={{ transition: "opacity 200ms ease" }}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
