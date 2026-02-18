"use client";

import { useState, useRef, useEffect } from "react";
import { Calendar, ChevronDown, Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface DateRangePickerProps {
  value: string;
  onChange: (value: string) => void;
}

const presets = [
  { label: "Today", value: "today" },
  { label: "Last 7 days", value: "7d" },
  { label: "Last 30 days", value: "30d" },
  { label: "Last 90 days", value: "90d" },
  { label: "This year", value: "year" },
  { label: "Custom range", value: "custom" },
];

export default function DateRangePicker({ value, onChange }: DateRangePickerProps) {
  const [open, setOpen] = useState(false);
  const [customStart, setCustomStart] = useState("");
  const [customEnd, setCustomEnd] = useState("");
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const activeLabel = presets.find((p) => p.value === value)?.label || "Last 30 days";

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen(!open)}
        className={cn(
          "flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-medium transition-all",
          "bg-[var(--surface)] text-[var(--foreground)] border border-[var(--border-color)]",
          "hover:border-[var(--primary)]/30 hover:bg-[var(--surface-hover)]",
          open && "border-[var(--primary)]/50 ring-1 ring-[var(--primary)]/20"
        )}
      >
        <Calendar size={15} className="text-[var(--muted)]" />
        <span className="hidden sm:inline">{activeLabel}</span>
        <ChevronDown
          size={14}
          className={cn(
            "text-[var(--muted)] transition-transform duration-200",
            open && "rotate-180"
          )}
        />
      </button>

      {open && (
        <div className="absolute right-0 top-full z-50 mt-2 w-64 overflow-hidden rounded-xl border bg-[var(--surface)] border-[var(--border-color)] shadow-xl shadow-black/20">
          <div className="p-2">
            {presets.map((preset) => (
              <button
                key={preset.value}
                onClick={() => {
                  if (preset.value !== "custom") {
                    onChange(preset.value);
                    setOpen(false);
                  } else {
                    onChange("custom");
                  }
                }}
                className={cn(
                  "flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm transition-all",
                  value === preset.value
                    ? "bg-[var(--primary)]/10 text-[var(--primary)] font-medium"
                    : "text-[var(--foreground)] hover:bg-[var(--surface-hover)]"
                )}
              >
                <span>{preset.label}</span>
                {value === preset.value && <Check size={15} />}
              </button>
            ))}
          </div>

          {value === "custom" && (
            <div className="border-t border-[var(--border-color)] p-3 space-y-3">
              <div>
                <label className="block text-xs text-[var(--muted)] mb-1">Start date</label>
                <input
                  type="date"
                  value={customStart}
                  onChange={(e) => setCustomStart(e.target.value)}
                  className="w-full rounded-lg border bg-[var(--input-bg)] border-[var(--border-color)] px-3 py-1.5 text-sm text-[var(--foreground)] outline-none focus:border-[var(--primary)]/50 focus:ring-1 focus:ring-[var(--primary)]/20"
                />
              </div>
              <div>
                <label className="block text-xs text-[var(--muted)] mb-1">End date</label>
                <input
                  type="date"
                  value={customEnd}
                  onChange={(e) => setCustomEnd(e.target.value)}
                  className="w-full rounded-lg border bg-[var(--input-bg)] border-[var(--border-color)] px-3 py-1.5 text-sm text-[var(--foreground)] outline-none focus:border-[var(--primary)]/50 focus:ring-1 focus:ring-[var(--primary)]/20"
                />
              </div>
              <button
                onClick={() => setOpen(false)}
                className="w-full rounded-lg bg-[var(--primary)] py-2 text-sm font-medium text-white transition-all hover:opacity-90"
              >
                Apply Range
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
