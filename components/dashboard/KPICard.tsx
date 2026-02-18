"use client";

import { useState } from "react";
import {
  DollarSign,
  Users,
  ShoppingCart,
  TrendingUp,
  TrendingDown,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";
import {
  LineChart,
  Line,
  ResponsiveContainer,
} from "recharts";
import { cn, formatCurrency, formatNumber } from "@/lib/utils";
import type { KPIMetric } from "@/lib/data";

const iconMap: Record<string, React.ElementType> = {
  revenue: DollarSign,
  users: Users,
  orders: ShoppingCart,
  conversion: TrendingUp,
};

const iconBgMap: Record<string, string> = {
  revenue: "from-[var(--chart-1)]/20 to-[var(--chart-1)]/5",
  users: "from-[var(--chart-2)]/20 to-[var(--chart-2)]/5",
  orders: "from-[var(--chart-4)]/20 to-[var(--chart-4)]/5",
  conversion: "from-[var(--chart-3)]/20 to-[var(--chart-3)]/5",
};

const iconColorMap: Record<string, string> = {
  revenue: "text-[var(--chart-1)]",
  users: "text-[var(--chart-2)]",
  orders: "text-[var(--chart-4)]",
  conversion: "text-[var(--chart-3)]",
};

const sparklineColorMap: Record<string, string> = {
  revenue: "var(--chart-1)",
  users: "var(--chart-2)",
  orders: "var(--chart-4)",
  conversion: "var(--chart-3)",
};

function formatValue(value: number, format: string): string {
  switch (format) {
    case "currency":
      return formatCurrency(value);
    case "percentage":
      return `${value}%`;
    default:
      return formatNumber(value);
  }
}

export default function KPICard({ id, label, value, change, trend, sparklineData, format }: KPIMetric) {
  const [isHovered, setIsHovered] = useState(false);
  const Icon = iconMap[id] || TrendingUp;
  const isUp = trend === "up";

  const chartData = sparklineData.map((v, i) => ({ value: v, index: i }));

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={cn(
        "group relative overflow-hidden rounded-2xl border p-5 transition-all duration-300 cursor-pointer",
        "bg-[var(--surface)] border-[var(--border-color)]",
        "hover:border-[var(--primary)]/30 hover:shadow-lg hover:shadow-[var(--primary)]/5",
        isHovered && "scale-[1.02]"
      )}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className={cn(
          "flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br",
          iconBgMap[id] || "from-[var(--primary)]/20 to-[var(--primary)]/5"
        )}>
          <Icon size={20} className={cn(iconColorMap[id] || "text-[var(--primary)]")} />
        </div>
        <div
          className={cn(
            "flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold",
            isUp
              ? "bg-[var(--success)]/10 text-[var(--success)]"
              : "bg-[var(--danger)]/10 text-[var(--danger)]"
          )}
        >
          {isUp ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
          {Math.abs(change)}%
        </div>
      </div>

      {/* Value */}
      <div className="mb-1">
        <p className="text-sm text-[var(--muted)] mb-1">{label}</p>
        <p className="font-[family-name:var(--font-display)] text-2xl font-bold text-[var(--foreground)]">
          {formatValue(value, format)}
        </p>
      </div>

      {/* Sparkline */}
      <div className="h-10 mt-3">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData}>
            <Line
              type="monotone"
              dataKey="value"
              stroke={sparklineColorMap[id] || "var(--primary)"}
              strokeWidth={2}
              dot={false}
              activeDot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Trend label */}
      <p className="mt-2 text-xs text-[var(--muted)]">
        <span className={cn(isUp ? "text-[var(--success)]" : "text-[var(--danger)]")}>
          {isUp ? <TrendingUp size={12} className="inline mr-1" /> : <TrendingDown size={12} className="inline mr-1" />}
          {isUp ? "+" : ""}{change}%
        </span>
        {" "}vs last month
      </p>

      {/* Hover gradient overlay */}
      <div
        className={cn(
          "absolute inset-0 bg-gradient-to-br from-[var(--primary)]/5 to-transparent opacity-0 transition-opacity duration-300 pointer-events-none",
          isHovered && "opacity-100"
        )}
      />
    </div>
  );
}
