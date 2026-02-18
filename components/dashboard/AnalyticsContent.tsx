"use client";

import { useState } from "react";
import {
  Globe,
  Monitor,
  Smartphone,
  Tablet,
  TrendingUp,
  Eye,
  Clock,
  MousePointerClick,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  pageViewsData,
  sessionsByDevice,
  sessionsByCountry,
  hourlyTrafficData,
  userGrowthData,
} from "@/lib/data";
import { cn } from "@/lib/utils";

const analyticsKPIs = [
  { label: "Total Sessions", value: "22,048", change: 14.2, trend: "up" as const, icon: Eye },
  { label: "Avg. Session Duration", value: "3m 42s", change: 8.6, trend: "up" as const, icon: Clock },
  { label: "Bounce Rate", value: "34.2%", change: -3.1, trend: "up" as const, icon: MousePointerClick },
  { label: "Pages per Session", value: "4.8", change: 5.4, trend: "up" as const, icon: Globe },
];

const deviceIcons = { Desktop: Monitor, Mobile: Smartphone, Tablet: Tablet };

export default function AnalyticsContent() {
  const [activeTab, setActiveTab] = useState<"traffic" | "users">("traffic");
  const [hoveredCountry, setHoveredCountry] = useState<string | null>(null);
  const [hoveredPage, setHoveredPage] = useState<string | null>(null);

  return (
    <div className="mx-auto max-w-[1600px] space-y-6">
      {/* KPI Row */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {analyticsKPIs.map((kpi) => {
          const Icon = kpi.icon;
          return (
            <div
              key={kpi.label}
              className="group relative overflow-hidden rounded-2xl border border-[var(--border-color)] bg-[var(--surface)] p-5 transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:shadow-black/10"
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-[var(--muted)]">{kpi.label}</p>
                  <p className="mt-1 font-[family-name:var(--font-display)] text-2xl font-bold text-[var(--foreground)]">
                    {kpi.value}
                  </p>
                </div>
                <div className="rounded-xl bg-[var(--primary)]/10 p-2.5">
                  <Icon size={20} className="text-[var(--primary)]" />
                </div>
              </div>
              <div className="mt-3 flex items-center gap-1.5">
                {kpi.change > 0 ? (
                  <ArrowUpRight size={14} className="text-[var(--success)]" />
                ) : (
                  <ArrowDownRight size={14} className="text-[var(--danger)]" />
                )}
                <span className={cn("text-xs font-medium", kpi.change > 0 ? "text-[var(--success)]" : "text-[var(--danger)]")}>
                  {Math.abs(kpi.change)}%
                </span>
                <span className="text-xs text-[var(--muted)]">vs last month</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Traffic / Users Chart */}
      <div className="rounded-2xl border border-[var(--border-color)] bg-[var(--surface)] p-5">
        <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
          <h3 className="font-[family-name:var(--font-display)] text-lg font-semibold text-[var(--foreground)]">
            {activeTab === "traffic" ? "Hourly Traffic" : "User Growth"}
          </h3>
          <div className="flex rounded-xl bg-[var(--background)] p-1">
            {(["traffic", "users"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={cn(
                  "rounded-lg px-4 py-1.5 text-sm font-medium transition-all",
                  activeTab === tab
                    ? "bg-[var(--primary)] text-white shadow-md"
                    : "text-[var(--muted)] hover:text-[var(--foreground)]"
                )}
              >
                {tab === "traffic" ? "Traffic" : "Users"}
              </button>
            ))}
          </div>
        </div>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            {activeTab === "traffic" ? (
              <AreaChart data={hourlyTrafficData}>
                <defs>
                  <linearGradient id="trafficGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="var(--chart-2)" stopOpacity={0.3} />
                    <stop offset="100%" stopColor="var(--chart-2)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" />
                <XAxis dataKey="hour" tick={{ fill: "var(--muted)", fontSize: 12 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: "var(--muted)", fontSize: 12 }} axisLine={false} tickLine={false} />
                <Tooltip
                  contentStyle={{ background: "var(--surface)", border: "1px solid var(--border-color)", borderRadius: 12, color: "var(--foreground)" }}
                />
                <Area type="monotone" dataKey="visitors" stroke="var(--chart-2)" strokeWidth={2} fill="url(#trafficGrad)" dot={false} activeDot={{ r: 6, fill: "var(--chart-2)", stroke: "var(--surface)", strokeWidth: 2 }} />
              </AreaChart>
            ) : (
              <AreaChart data={userGrowthData}>
                <defs>
                  <linearGradient id="totalGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="var(--chart-1)" stopOpacity={0.3} />
                    <stop offset="100%" stopColor="var(--chart-1)" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="activeGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="var(--chart-3)" stopOpacity={0.3} />
                    <stop offset="100%" stopColor="var(--chart-3)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" />
                <XAxis dataKey="month" tick={{ fill: "var(--muted)", fontSize: 12 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: "var(--muted)", fontSize: 12 }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ background: "var(--surface)", border: "1px solid var(--border-color)", borderRadius: 12, color: "var(--foreground)" }} />
                <Area type="monotone" dataKey="totalUsers" name="Total Users" stroke="var(--chart-1)" strokeWidth={2} fill="url(#totalGrad)" dot={false} />
                <Area type="monotone" dataKey="activeUsers" name="Active Users" stroke="var(--chart-3)" strokeWidth={2} fill="url(#activeGrad)" dot={false} />
              </AreaChart>
            )}
          </ResponsiveContainer>
        </div>
      </div>

      {/* Two column: Top Pages + Device & Geo */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        {/* Top Pages */}
        <div className="rounded-2xl border border-[var(--border-color)] bg-[var(--surface)] p-5">
          <h3 className="mb-4 font-[family-name:var(--font-display)] text-lg font-semibold text-[var(--foreground)]">
            Top Pages
          </h3>
          <div className="space-y-2">
            {pageViewsData.map((page) => {
              const maxViews = pageViewsData[0].views;
              const widthPct = (page.views / maxViews) * 100;
              return (
                <div
                  key={page.page}
                  onMouseEnter={() => setHoveredPage(page.page)}
                  onMouseLeave={() => setHoveredPage(null)}
                  className={cn(
                    "group relative overflow-hidden rounded-xl px-4 py-3 transition-all duration-200",
                    hoveredPage === page.page ? "bg-[var(--primary)]/10" : "hover:bg-[var(--surface-hover)]"
                  )}
                >
                  <div className="absolute bottom-0 left-0 top-0 rounded-xl bg-[var(--primary)]/5 transition-all duration-500" style={{ width: `${widthPct}%` }} />
                  <div className="relative flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-[var(--foreground)]">{page.page}</p>
                      <p className="text-xs text-[var(--muted)]">{page.uniqueVisitors.toLocaleString()} unique visitors</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-semibold text-[var(--foreground)]">{page.views.toLocaleString()}</p>
                      <p className="text-xs text-[var(--muted)]">{page.avgTime} avg</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Device + Geo */}
        <div className="space-y-4">
          {/* Device breakdown */}
          <div className="rounded-2xl border border-[var(--border-color)] bg-[var(--surface)] p-5">
            <h3 className="mb-4 font-[family-name:var(--font-display)] text-base font-semibold text-[var(--foreground)]">
              Sessions by Device
            </h3>
            <div className="space-y-3">
              {sessionsByDevice.map((device) => {
                const Icon = deviceIcons[device.name as keyof typeof deviceIcons];
                return (
                  <div key={device.name} className="group">
                    <div className="mb-1.5 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Icon size={16} className="text-[var(--muted)]" />
                        <span className="text-sm text-[var(--foreground)]">{device.name}</span>
                      </div>
                      <span className="text-sm font-semibold text-[var(--foreground)]">{device.value}%</span>
                    </div>
                    <div className="h-2 overflow-hidden rounded-full bg-[var(--background)]">
                      <div
                        className="h-full rounded-full transition-all duration-700 group-hover:brightness-110"
                        style={{ width: `${device.value}%`, background: device.color }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Top countries */}
          <div className="rounded-2xl border border-[var(--border-color)] bg-[var(--surface)] p-5">
            <h3 className="mb-4 font-[family-name:var(--font-display)] text-base font-semibold text-[var(--foreground)]">
              Top Countries
            </h3>
            <div className="space-y-2">
              {sessionsByCountry.slice(0, 5).map((item, i) => (
                <div
                  key={item.country}
                  onMouseEnter={() => setHoveredCountry(item.country)}
                  onMouseLeave={() => setHoveredCountry(null)}
                  className={cn(
                    "flex items-center justify-between rounded-lg px-3 py-2 transition-all duration-200",
                    hoveredCountry === item.country ? "bg-[var(--primary)]/10" : "hover:bg-[var(--surface-hover)]"
                  )}
                >
                  <div className="flex items-center gap-3">
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[var(--background)] text-xs font-semibold text-[var(--muted)]">
                      {i + 1}
                    </span>
                    <span className="text-sm text-[var(--foreground)]">{item.country}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-medium text-[var(--foreground)]">{item.sessions.toLocaleString()}</span>
                    <span className="w-12 text-right text-xs text-[var(--muted)]">{item.percentage}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
