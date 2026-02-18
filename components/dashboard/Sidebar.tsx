"use client";

import { useState } from "react";
import {
  LayoutDashboard,
  BarChart3,
  Users,
  Package,
  ShoppingCart,
  Settings,
  ChevronLeft,
  ChevronRight,
  Zap,
  LogOut,
  HelpCircle,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface SidebarProps {
  collapsed: boolean;
  mobileOpen: boolean;
  onToggle: () => void;
  onMobileClose: () => void;
}

const navItems = [
  { icon: LayoutDashboard, label: "Dashboard", id: "dashboard", badge: null },
  { icon: BarChart3, label: "Analytics", id: "analytics", badge: null },
  { icon: Users, label: "Customers", id: "customers", badge: "New" },
  { icon: Package, label: "Products", id: "products", badge: null },
  { icon: ShoppingCart, label: "Orders", id: "orders", badge: "12" },
  { icon: Settings, label: "Settings", id: "settings", badge: null },
];

export default function Sidebar({
  collapsed,
  mobileOpen,
  onToggle,
  onMobileClose,
}: SidebarProps) {
  const [activeItem, setActiveItem] = useState("dashboard");
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  return (
    <>
      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
          onClick={onMobileClose}
        />
      )}

      <aside
        className={cn(
          "fixed top-0 left-0 z-50 flex h-screen flex-col border-r transition-all duration-300 ease-in-out",
          "bg-[var(--sidebar-bg)] border-[var(--border-color)]",
          collapsed ? "w-[72px]" : "w-[260px]",
          mobileOpen
            ? "translate-x-0"
            : "-translate-x-full lg:translate-x-0"
        )}
      >
        {/* Logo */}
        <div className="flex h-16 items-center justify-between border-b border-[var(--border-color)] px-4">
          <div className="flex items-center gap-3 overflow-hidden">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-[var(--primary)] to-[var(--secondary)]">
              <Zap size={18} className="text-white" />
            </div>
            {!collapsed && (
              <span className="whitespace-nowrap font-[family-name:var(--font-display)] text-lg font-bold text-[var(--foreground)]">
                InsightGrid
              </span>
            )}
          </div>
          <button
            onClick={onMobileClose}
            className="rounded-lg p-1.5 text-[var(--muted)] hover:bg-[var(--surface)] hover:text-[var(--foreground)] lg:hidden"
          >
            <X size={18} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto px-3 py-4">
          <div className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeItem === item.id;
              const isHovered = hoveredItem === item.id;

              return (
                <button
                  key={item.id}
                  onClick={() => setActiveItem(item.id)}
                  onMouseEnter={() => setHoveredItem(item.id)}
                  onMouseLeave={() => setHoveredItem(null)}
                  className={cn(
                    "group relative flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200",
                    isActive
                      ? "bg-[var(--primary)]/15 text-[var(--primary)]"
                      : "text-[var(--muted)] hover:bg-[var(--surface)] hover:text-[var(--foreground)]"
                  )}
                  title={collapsed ? item.label : undefined}
                >
                  {isActive && (
                    <div className="absolute left-0 top-1/2 h-6 w-1 -translate-y-1/2 rounded-r-full bg-[var(--primary)]" />
                  )}
                  <Icon
                    size={20}
                    className={cn(
                      "shrink-0 transition-transform duration-200",
                      (isActive || isHovered) && "scale-110"
                    )}
                  />
                  {!collapsed && (
                    <>
                      <span className="whitespace-nowrap">{item.label}</span>
                      {item.badge && (
                        <span
                          className={cn(
                            "ml-auto rounded-full px-2 py-0.5 text-[10px] font-semibold",
                            item.badge === "New"
                              ? "bg-[var(--success)]/15 text-[var(--success)]"
                              : "bg-[var(--warning)]/15 text-[var(--warning)]"
                          )}
                        >
                          {item.badge}
                        </span>
                      )}
                    </>
                  )}

                  {/* Tooltip for collapsed state */}
                  {collapsed && isHovered && (
                    <div className="absolute left-full z-50 ml-3 whitespace-nowrap rounded-lg bg-[var(--surface)] px-3 py-1.5 text-sm font-medium text-[var(--foreground)] shadow-lg">
                      {item.label}
                      <div className="absolute -left-1 top-1/2 h-2 w-2 -translate-y-1/2 rotate-45 bg-[var(--surface)]" />
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </nav>

        {/* Bottom section */}
        <div className="border-t border-[var(--border-color)] p-3 space-y-1">
          <button
            className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-[var(--muted)] transition-all hover:bg-[var(--surface)] hover:text-[var(--foreground)]"
            title={collapsed ? "Help & Support" : undefined}
          >
            <HelpCircle size={20} className="shrink-0" />
            {!collapsed && <span>Help & Support</span>}
          </button>

          {/* User profile */}
          <div
            className={cn(
              "flex items-center gap-3 rounded-xl px-3 py-2.5 transition-all hover:bg-[var(--surface)] cursor-pointer",
              collapsed && "justify-center"
            )}
          >
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[var(--chart-3)] to-[var(--chart-2)] text-sm font-semibold text-white">
              JD
            </div>
            {!collapsed && (
              <div className="flex-1 min-w-0">
                <p className="truncate text-sm font-medium text-[var(--foreground)]">
                  John Doe
                </p>
                <p className="truncate text-xs text-[var(--muted)]">
                  john@company.com
                </p>
              </div>
            )}
            {!collapsed && (
              <LogOut
                size={16}
                className="shrink-0 text-[var(--muted)] hover:text-[var(--danger)] transition-colors"
              />
            )}
          </div>

          {/* Collapse toggle - desktop only */}
          <button
            onClick={onToggle}
            className="hidden lg:flex w-full items-center justify-center gap-2 rounded-xl px-3 py-2 text-sm text-[var(--muted)] transition-all hover:bg-[var(--surface)] hover:text-[var(--foreground)]"
          >
            {collapsed ? (
              <ChevronRight size={18} />
            ) : (
              <>
                <ChevronLeft size={18} />
                <span>Collapse</span>
              </>
            )}
          </button>
        </div>
      </aside>
    </>
  );
}
