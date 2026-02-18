"use client";

import { useState, useEffect, useCallback } from "react";
import {
  Search,
  Bell,
  Sun,
  Moon,
  Menu,
  X,
  Activity,
  RefreshCw,
} from "lucide-react";
import Sidebar from "@/components/dashboard/Sidebar";
import KPICard from "@/components/dashboard/KPICard";
import AreaChartWidget from "@/components/dashboard/AreaChartWidget";
import BarChartWidget from "@/components/dashboard/BarChartWidget";
import DonutChartWidget from "@/components/dashboard/DonutChartWidget";
import FunnelWidget from "@/components/dashboard/FunnelWidget";
import DataTable from "@/components/dashboard/DataTable";
import DateRangePicker from "@/components/dashboard/DateRangePicker";
import AnalyticsContent from "@/components/dashboard/AnalyticsContent";
import CustomersContent from "@/components/dashboard/CustomersContent";
import ProductsContent from "@/components/dashboard/ProductsContent";
import OrdersContent from "@/components/dashboard/OrdersContent";
import SettingsContent from "@/components/dashboard/SettingsContent";
import {
  kpiMetrics,
  revenueData,
  salesByCategory,
  trafficSources,
  funnelData,
  transactionsData,
} from "@/lib/data";
import type { KPIMetric } from "@/lib/data";
import { cn } from "@/lib/utils";

const pageTitles: Record<string, string> = {
  dashboard: "Dashboard",
  analytics: "Analytics",
  customers: "Customers",
  products: "Products",
  orders: "Orders",
  settings: "Settings",
};

export default function Dashboard() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeItem, setActiveItem] = useState("dashboard");
  const [dateRange, setDateRange] = useState("30d");
  const [darkMode, setDarkMode] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [liveVisitors, setLiveVisitors] = useState(847);
  const [liveKPIs, setLiveKPIs] = useState<KPIMetric[]>(kpiMetrics);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Toggle dark/light mode
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.remove("light-mode");
    } else {
      document.documentElement.classList.add("light-mode");
    }
  }, [darkMode]);

  // Simulated real-time visitor count
  useEffect(() => {
    const interval = setInterval(() => {
      setLiveVisitors((prev) => {
        const change = Math.floor(Math.random() * 21) - 10;
        return Math.max(700, prev + change);
      });
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Simulated KPI fluctuations
  useEffect(() => {
    const interval = setInterval(() => {
      setLiveKPIs((prev) =>
        prev.map((kpi) => {
          const fluctuation = (Math.random() - 0.5) * 0.02;
          const newValue =
            kpi.format === "percentage"
              ? +(kpi.value * (1 + fluctuation)).toFixed(2)
              : Math.round(kpi.value * (1 + fluctuation));
          return { ...kpi, value: newValue };
        })
      );
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleRefresh = useCallback(() => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 1500);
  }, []);

  const handleItemChange = useCallback((id: string) => {
    setActiveItem(id);
    setMobileMenuOpen(false);
  }, []);

  const notifications = [
    {
      id: 1,
      title: "New milestone reached",
      desc: "Revenue exceeded $80K this month",
      time: "2 min ago",
      unread: true,
    },
    {
      id: 2,
      title: "Unusual traffic spike",
      desc: "35% increase from organic search",
      time: "15 min ago",
      unread: true,
    },
    {
      id: 3,
      title: "Export completed",
      desc: "Your CSV report is ready to download",
      time: "1 hour ago",
      unread: false,
    },
    {
      id: 4,
      title: "New user segment",
      desc: "Enterprise users grew by 12%",
      time: "3 hours ago",
      unread: false,
    },
  ];

  const unreadCount = notifications.filter((n) => n.unread).length;

  return (
    <div className="flex h-screen overflow-hidden bg-[var(--background)]">
      {/* Sidebar */}
      <Sidebar
        collapsed={sidebarCollapsed}
        mobileOpen={mobileMenuOpen}
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
        onMobileClose={() => setMobileMenuOpen(false)}
        activeItem={activeItem}
        onItemChange={handleItemChange}
      />

      {/* Main content area */}
      <div
        className={cn(
          "flex flex-1 flex-col overflow-hidden transition-all duration-300",
          sidebarCollapsed ? "lg:pl-[72px]" : "lg:pl-[260px]"
        )}
      >
        {/* Header */}
        <header className="sticky top-0 z-30 flex h-16 shrink-0 items-center justify-between border-b border-[var(--border-color)] bg-[var(--background)]/80 px-4 backdrop-blur-xl sm:px-6">
          {/* Left side */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="rounded-lg p-2 text-[var(--muted)] transition-all hover:bg-[var(--surface)] hover:text-[var(--foreground)] lg:hidden"
            >
              <Menu size={20} />
            </button>

            <div className="hidden items-center gap-3 sm:flex">
              <h1 className="font-[family-name:var(--font-display)] text-lg font-semibold text-[var(--foreground)]">
                {pageTitles[activeItem] || "Dashboard"}
              </h1>
              {activeItem === "dashboard" && (
                <div className="flex items-center gap-2 rounded-full bg-[var(--success)]/10 px-3 py-1">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-pulse-ring absolute inline-flex h-full w-full rounded-full bg-[var(--success)] opacity-75" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-[var(--success)]" />
                  </span>
                  <span className="text-xs font-medium text-[var(--success)]">
                    {liveVisitors.toLocaleString()} live
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Right side */}
          <div className="flex items-center gap-2">
            {/* Refresh */}
            <button
              onClick={handleRefresh}
              className="rounded-lg p-2 text-[var(--muted)] transition-all hover:bg-[var(--surface)] hover:text-[var(--foreground)]"
              title="Refresh data"
            >
              <RefreshCw
                size={17}
                className={cn(isRefreshing && "animate-spin")}
              />
            </button>

            {/* Search */}
            <div className="relative">
              <button
                onClick={() => setSearchOpen(!searchOpen)}
                className="rounded-lg p-2 text-[var(--muted)] transition-all hover:bg-[var(--surface)] hover:text-[var(--foreground)] md:hidden"
              >
                <Search size={17} />
              </button>
              <div
                className={cn(
                  "items-center gap-2 rounded-xl border bg-[var(--input-bg)] border-[var(--border-color)] px-3 py-2",
                  "focus-within:border-[var(--primary)]/50 focus-within:ring-1 focus-within:ring-[var(--primary)]/20",
                  searchOpen
                    ? "absolute right-0 top-full mt-2 flex w-64 shadow-xl md:relative md:top-0 md:mt-0 md:w-auto md:shadow-none"
                    : "hidden md:flex"
                )}
              >
                <Search size={15} className="shrink-0 text-[var(--muted)]" />
                <input
                  type="text"
                  placeholder="Search anything..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-40 bg-transparent text-sm text-[var(--foreground)] outline-none placeholder:text-[var(--muted)]"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="text-[var(--muted)] hover:text-[var(--foreground)]"
                  >
                    <X size={14} />
                  </button>
                )}
              </div>
            </div>

            {/* Date range */}
            <DateRangePicker value={dateRange} onChange={setDateRange} />

            {/* Notifications */}
            <div className="relative">
              <button
                onClick={() => setNotificationsOpen(!notificationsOpen)}
                className="relative rounded-lg p-2 text-[var(--muted)] transition-all hover:bg-[var(--surface)] hover:text-[var(--foreground)]"
              >
                <Bell size={17} />
                {unreadCount > 0 && (
                  <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-[var(--danger)] text-[10px] font-bold text-white">
                    {unreadCount}
                  </span>
                )}
              </button>

              {notificationsOpen && (
                <>
                  <div
                    className="fixed inset-0 z-40"
                    onClick={() => setNotificationsOpen(false)}
                  />
                  <div className="absolute right-0 top-full z-50 mt-2 w-80 overflow-hidden rounded-xl border bg-[var(--surface)] border-[var(--border-color)] shadow-xl shadow-black/20">
                    <div className="border-b border-[var(--border-color)] px-4 py-3">
                      <div className="flex items-center justify-between">
                        <h4 className="text-sm font-semibold text-[var(--foreground)]">
                          Notifications
                        </h4>
                        <span className="rounded-full bg-[var(--primary)]/10 px-2 py-0.5 text-xs font-medium text-[var(--primary)]">
                          {unreadCount} new
                        </span>
                      </div>
                    </div>
                    <div className="max-h-80 overflow-y-auto">
                      {notifications.map((notif) => (
                        <button
                          key={notif.id}
                          className={cn(
                            "flex w-full gap-3 px-4 py-3 text-left transition-all hover:bg-[var(--surface-hover)]",
                            notif.unread && "bg-[var(--primary)]/5"
                          )}
                        >
                          <div
                            className={cn(
                              "mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full",
                              notif.unread
                                ? "bg-[var(--primary)]/15"
                                : "bg-[var(--surface-hover)]"
                            )}
                          >
                            <Activity
                              size={14}
                              className={
                                notif.unread
                                  ? "text-[var(--primary)]"
                                  : "text-[var(--muted)]"
                              }
                            />
                          </div>
                          <div className="min-w-0 flex-1">
                            <p className="text-sm font-medium text-[var(--foreground)]">
                              {notif.title}
                            </p>
                            <p className="truncate text-xs text-[var(--muted)]">
                              {notif.desc}
                            </p>
                            <p className="mt-1 text-[10px] text-[var(--muted)]">
                              {notif.time}
                            </p>
                          </div>
                          {notif.unread && (
                            <div className="mt-2 h-2 w-2 shrink-0 rounded-full bg-[var(--primary)]" />
                          )}
                        </button>
                      ))}
                    </div>
                    <div className="border-t border-[var(--border-color)] p-2">
                      <button className="w-full rounded-lg py-2 text-center text-sm font-medium text-[var(--primary)] transition-all hover:bg-[var(--primary)]/10">
                        View all notifications
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Theme toggle */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="rounded-lg p-2 text-[var(--muted)] transition-all hover:bg-[var(--surface)] hover:text-[var(--foreground)]"
              title={darkMode ? "Switch to light mode" : "Switch to dark mode"}
            >
              {darkMode ? <Sun size={17} /> : <Moon size={17} />}
            </button>

            {/* User avatar */}
            <button className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-[var(--primary)] to-[var(--secondary)] text-sm font-semibold text-white transition-all hover:shadow-lg hover:shadow-[var(--primary)]/20">
              JD
            </button>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6">
          {/* Dashboard */}
          {activeItem === "dashboard" && (
            <div className="mx-auto max-w-[1600px] space-y-6">
              {/* Page heading - mobile */}
              <div className="sm:hidden">
                <h1 className="font-[family-name:var(--font-display)] text-xl font-bold text-[var(--foreground)]">
                  Dashboard
                </h1>
                <div className="mt-1 flex items-center gap-2">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-pulse-ring absolute inline-flex h-full w-full rounded-full bg-[var(--success)] opacity-75" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-[var(--success)]" />
                  </span>
                  <span className="text-xs text-[var(--success)]">
                    {liveVisitors.toLocaleString()} live visitors
                  </span>
                </div>
              </div>

              {/* KPI Cards */}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
                {liveKPIs.map((kpi) => (
                  <KPICard key={kpi.id} {...kpi} />
                ))}
              </div>

              {/* Charts Row 1: Area + Donut */}
              <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
                <div className="lg:col-span-2">
                  <AreaChartWidget data={revenueData} />
                </div>
                <div>
                  <DonutChartWidget data={trafficSources} />
                </div>
              </div>

              {/* Charts Row 2: Bar + Funnel */}
              <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                <BarChartWidget data={salesByCategory} />
                <FunnelWidget data={funnelData} />
              </div>

              {/* Data Table */}
              <DataTable data={transactionsData} />
            </div>
          )}

          {/* Analytics */}
          {activeItem === "analytics" && <AnalyticsContent />}

          {/* Customers */}
          {activeItem === "customers" && <CustomersContent />}

          {/* Products */}
          {activeItem === "products" && <ProductsContent />}

          {/* Orders */}
          {activeItem === "orders" && <OrdersContent />}

          {/* Settings */}
          {activeItem === "settings" && <SettingsContent />}
        </main>
      </div>
    </div>
  );
}
