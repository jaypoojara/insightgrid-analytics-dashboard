"use client";

import { useState, useCallback } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { Globe } from "lucide-react";
import { cn, formatNumber } from "@/lib/utils";

interface DataPoint {
  name: string;
  value: number;
  color: string;
}

interface DonutChartWidgetProps {
  data: DataPoint[];
}

export default function DonutChartWidget({ data }: DonutChartWidgetProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const onPieEnter = useCallback((_: unknown, index: number) => {
    setActiveIndex(index);
  }, []);

  const onPieLeave = useCallback(() => {
    setActiveIndex(null);
  }, []);

  const total = data.reduce((sum, d) => sum + d.value, 0);
  const activeItem = activeIndex !== null ? data[activeIndex] : null;

  return (
    <div className="rounded-2xl border p-5 transition-all duration-300 bg-[var(--surface)] border-[var(--border-color)] hover:border-[var(--primary)]/20">
      {/* Header */}
      <div className="mb-4">
        <div className="flex items-center gap-2 mb-1">
          <Globe size={18} className="text-[var(--chart-3)]" />
          <h3 className="font-[family-name:var(--font-display)] text-base font-semibold text-[var(--foreground)]">
            Traffic Sources
          </h3>
        </div>
        <p className="text-sm text-[var(--muted)]">
          {formatNumber(total)} total visits
        </p>
      </div>

      {/* Chart */}
      <div className="relative h-[200px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={85}
              paddingAngle={3}
              dataKey="value"
              onMouseEnter={onPieEnter}
              onMouseLeave={onPieLeave}
              strokeWidth={0}
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={entry.color}
                  opacity={activeIndex === null || activeIndex === index ? 1 : 0.4}
                  style={{ transition: "opacity 200ms ease" }}
                />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>

        {/* Center label */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          {activeItem ? (
            <>
              <p className="text-lg font-bold text-[var(--foreground)]">
                {formatNumber(activeItem.value)}
              </p>
              <p className="text-xs text-[var(--muted)]">{activeItem.name}</p>
            </>
          ) : (
            <>
              <p className="text-lg font-bold text-[var(--foreground)]">
                {formatNumber(total)}
              </p>
              <p className="text-xs text-[var(--muted)]">Total</p>
            </>
          )}
        </div>
      </div>

      {/* Legend */}
      <div className="mt-4 space-y-2">
        {data.map((item, index) => {
          const percentage = ((item.value / total) * 100).toFixed(1);
          return (
            <button
              key={item.name}
              onMouseEnter={() => setActiveIndex(index)}
              onMouseLeave={() => setActiveIndex(null)}
              className={cn(
                "flex w-full items-center justify-between rounded-lg px-3 py-1.5 text-sm transition-all",
                activeIndex === index
                  ? "bg-[var(--surface-hover)]"
                  : "hover:bg-[var(--surface-hover)]"
              )}
            >
              <div className="flex items-center gap-2">
                <div
                  className="h-2.5 w-2.5 rounded-full"
                  style={{ backgroundColor: item.color }}
                />
                <span className="text-[var(--foreground)]">{item.name}</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-[var(--muted)]">{formatNumber(item.value)}</span>
                <span className="min-w-[3rem] text-right font-medium text-[var(--foreground)]">
                  {percentage}%
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
