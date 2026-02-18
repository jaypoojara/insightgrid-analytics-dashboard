"use client";

import { useState } from "react";
import { Filter, Info } from "lucide-react";
import { cn, formatNumber } from "@/lib/utils";

interface FunnelStep {
  stage: string;
  value: number;
  color: string;
}

interface FunnelWidgetProps {
  data: FunnelStep[];
}

export default function FunnelWidget({ data }: FunnelWidgetProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const maxValue = data[0]?.value || 1;

  return (
    <div className="rounded-2xl border p-5 transition-all duration-300 bg-[var(--surface)] border-[var(--border-color)] hover:border-[var(--primary)]/20">
      {/* Header */}
      <div className="mb-5 flex items-start justify-between">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Filter size={18} className="text-[var(--chart-4)]" />
            <h3 className="font-[family-name:var(--font-display)] text-base font-semibold text-[var(--foreground)]">
              Conversion Funnel
            </h3>
          </div>
          <p className="text-sm text-[var(--muted)]">
            Overall conversion: {((data[data.length - 1]?.value / maxValue) * 100).toFixed(1)}%
          </p>
        </div>
        <button className="rounded-lg p-2 text-[var(--muted)] transition-all hover:bg-[var(--surface-hover)] hover:text-[var(--foreground)]">
          <Info size={16} />
        </button>
      </div>

      {/* Funnel visualization */}
      <div className="space-y-3">
        {data.map((step, index) => {
          const widthPercent = (step.value / maxValue) * 100;
          const dropOff =
            index > 0
              ? (((data[index - 1].value - step.value) / data[index - 1].value) * 100).toFixed(1)
              : null;
          const isHovered = hoveredIndex === index;

          return (
            <div
              key={step.stage}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              className="group cursor-pointer"
            >
              {/* Drop-off indicator */}
              {dropOff && (
                <div className="flex items-center justify-end mb-1 pr-2">
                  <span className="text-[10px] text-[var(--danger)]/70 font-medium">
                    -{dropOff}% drop-off
                  </span>
                </div>
              )}

              <div className="flex items-center gap-3">
                {/* Bar */}
                <div className="flex-1 relative">
                  <div
                    className={cn(
                      "h-10 rounded-xl transition-all duration-500 ease-out flex items-center px-4",
                      isHovered && "scale-[1.02] shadow-lg"
                    )}
                    style={{
                      width: `${widthPercent}%`,
                      backgroundColor: step.color,
                      opacity: isHovered ? 1 : 0.85,
                      boxShadow: isHovered
                        ? `0 4px 20px ${step.color}40`
                        : "none",
                      minWidth: "120px",
                    }}
                  >
                    <span className="text-sm font-medium text-white truncate">
                      {step.stage}
                    </span>
                  </div>
                </div>

                {/* Value */}
                <div className="w-24 text-right">
                  <p
                    className={cn(
                      "text-sm font-semibold transition-colors",
                      isHovered
                        ? "text-[var(--foreground)]"
                        : "text-[var(--muted)]"
                    )}
                  >
                    {formatNumber(step.value)}
                  </p>
                  <p className="text-[10px] text-[var(--muted)]">
                    {((step.value / maxValue) * 100).toFixed(0)}% of total
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Summary */}
      <div className="mt-5 flex items-center justify-between rounded-xl bg-[var(--background)] px-4 py-3">
        <span className="text-sm text-[var(--muted)]">Final conversion rate</span>
        <span className="text-lg font-bold text-[var(--success)]">
          {((data[data.length - 1]?.value / maxValue) * 100).toFixed(1)}%
        </span>
      </div>
    </div>
  );
}
