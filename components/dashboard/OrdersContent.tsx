"use client";

import { useState } from "react";
import {
  Search,
  Filter,
  ChevronDown,
  Package,
  Truck,
  CheckCircle2,
  XCircle,
  RotateCcw,
  Clock,
  DollarSign,
  ShoppingCart,
  TrendingUp,
  MoreHorizontal,
  Copy,
  Eye,
} from "lucide-react";
import { ordersData, orderStatusSummary } from "@/lib/data";
import { cn } from "@/lib/utils";

const statusConfig = {
  processing: { icon: Clock, label: "Processing", bg: "bg-[var(--chart-2)]/15", text: "text-[var(--chart-2)]", dot: "bg-[var(--chart-2)]" },
  shipped: { icon: Truck, label: "Shipped", bg: "bg-[var(--chart-1)]/15", text: "text-[var(--chart-1)]", dot: "bg-[var(--chart-1)]" },
  delivered: { icon: CheckCircle2, label: "Delivered", bg: "bg-[var(--success)]/15", text: "text-[var(--success)]", dot: "bg-[var(--success)]" },
  cancelled: { icon: XCircle, label: "Cancelled", bg: "bg-[var(--danger)]/15", text: "text-[var(--danger)]", dot: "bg-[var(--danger)]" },
  returned: { icon: RotateCcw, label: "Returned", bg: "bg-[var(--chart-5)]/15", text: "text-[var(--chart-5)]", dot: "bg-[var(--chart-5)]" },
};

export default function OrdersContent() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [filterOpen, setFilterOpen] = useState(false);
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const filtered = ordersData.filter((o) => {
    const matchesSearch = o.id.toLowerCase().includes(searchQuery.toLowerCase()) || o.customer.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || o.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const totalOrders = ordersData.length;
  const totalValue = ordersData.reduce((sum, o) => sum + o.total, 0);
  const avgOrder = totalValue / totalOrders;

  const handleCopyId = (id: string) => {
    navigator.clipboard.writeText(id);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="mx-auto max-w-[1600px] space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {[
          { label: "Total Orders", value: "184", icon: ShoppingCart, color: "var(--chart-2)" },
          { label: "Revenue", value: `$${(totalValue * 3).toLocaleString()}`, icon: DollarSign, color: "var(--chart-1)" },
          { label: "Avg. Order Value", value: `$${Math.round(avgOrder).toLocaleString()}`, icon: TrendingUp, color: "var(--chart-3)" },
        ].map((card) => {
          const Icon = card.icon;
          return (
            <div key={card.label} className="group rounded-2xl border border-[var(--border-color)] bg-[var(--surface)] p-5 transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:shadow-black/10">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-[var(--muted)]">{card.label}</p>
                  <p className="mt-1 font-[family-name:var(--font-display)] text-2xl font-bold text-[var(--foreground)]">{card.value}</p>
                </div>
                <div className="rounded-xl p-2.5" style={{ background: `color-mix(in srgb, ${card.color} 15%, transparent)` }}>
                  <Icon size={20} style={{ color: card.color }} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Status Pipeline */}
      <div className="rounded-2xl border border-[var(--border-color)] bg-[var(--surface)] p-5">
        <h3 className="mb-4 font-[family-name:var(--font-display)] text-base font-semibold text-[var(--foreground)]">
          Order Pipeline
        </h3>
        <div className="flex flex-wrap gap-3">
          {orderStatusSummary.map((item) => {
            const totalCount = orderStatusSummary.reduce((s, i) => s + i.count, 0);
            const pct = ((item.count / totalCount) * 100).toFixed(1);
            return (
              <button
                key={item.status}
                onClick={() => setStatusFilter(statusFilter === item.status.toLowerCase() ? "all" : item.status.toLowerCase())}
                className={cn(
                  "group flex flex-1 min-w-[140px] flex-col items-center gap-2 rounded-xl border p-4 transition-all duration-200",
                  statusFilter === item.status.toLowerCase()
                    ? "border-[var(--primary)]/50 bg-[var(--primary)]/5"
                    : "border-[var(--border-color)] hover:border-[var(--primary)]/30 hover:bg-[var(--surface-hover)]"
                )}
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-full" style={{ background: `color-mix(in srgb, ${item.color} 15%, transparent)` }}>
                  <span className="text-lg font-bold" style={{ color: item.color }}>{item.count}</span>
                </div>
                <span className="text-xs font-medium text-[var(--foreground)]">{item.status}</span>
                <span className="text-[10px] text-[var(--muted)]">{pct}%</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Search + Filter */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="flex flex-1 items-center gap-2 rounded-xl border border-[var(--border-color)] bg-[var(--input-bg)] px-3 py-2 focus-within:border-[var(--primary)]/50 focus-within:ring-1 focus-within:ring-[var(--primary)]/20">
          <Search size={16} className="text-[var(--muted)]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search orders or customers..."
            className="flex-1 bg-transparent text-sm text-[var(--foreground)] outline-none placeholder:text-[var(--muted)]"
          />
        </div>
        <div className="relative">
          <button onClick={() => setFilterOpen(!filterOpen)} className="flex items-center gap-2 rounded-xl border border-[var(--border-color)] bg-[var(--surface)] px-4 py-2.5 text-sm text-[var(--foreground)] transition-all hover:bg-[var(--surface-hover)]">
            <Filter size={15} />
            <span className="capitalize">{statusFilter === "all" ? "All Status" : statusFilter}</span>
            <ChevronDown size={14} className={cn("transition-transform", filterOpen && "rotate-180")} />
          </button>
          {filterOpen && (
            <>
              <div className="fixed inset-0 z-40" onClick={() => setFilterOpen(false)} />
              <div className="absolute right-0 top-full z-50 mt-1 w-44 overflow-hidden rounded-xl border border-[var(--border-color)] bg-[var(--surface)] shadow-xl">
                {["all", "processing", "shipped", "delivered", "cancelled", "returned"].map((s) => (
                  <button
                    key={s}
                    onClick={() => { setStatusFilter(s); setFilterOpen(false); }}
                    className={cn("flex w-full px-4 py-2 text-left text-sm capitalize transition-all hover:bg-[var(--surface-hover)]", statusFilter === s ? "text-[var(--primary)] font-medium" : "text-[var(--foreground)]")}
                  >
                    {s === "all" ? "All Status" : s}
                  </button>
                ))}
              </div>
            </>
          )}
        </div>
      </div>

      {/* Orders List */}
      <div className="space-y-3">
        {filtered.map((order) => {
          const config = statusConfig[order.status];
          const StatusIcon = config.icon;
          const isExpanded = expandedOrder === order.id;

          return (
            <div
              key={order.id}
              className={cn(
                "overflow-hidden rounded-2xl border border-[var(--border-color)] bg-[var(--surface)] transition-all duration-300",
                isExpanded ? "shadow-lg shadow-black/10" : "hover:shadow-md"
              )}
            >
              <button
                onClick={() => setExpandedOrder(isExpanded ? null : order.id)}
                className="flex w-full items-center gap-4 p-5 text-left transition-all hover:bg-[var(--surface-hover)]"
              >
                <div className={cn("flex h-10 w-10 shrink-0 items-center justify-center rounded-xl", config.bg)}>
                  <StatusIcon size={18} className={config.text} />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold text-[var(--foreground)]">{order.id}</span>
                    <span className={cn("rounded-full px-2 py-0.5 text-[10px] font-semibold", config.bg, config.text)}>
                      {config.label}
                    </span>
                  </div>
                  <p className="mt-0.5 text-xs text-[var(--muted)]">{order.customer} — {order.date}</p>
                </div>
                <div className="hidden text-right sm:block">
                  <p className="text-sm font-bold text-[var(--foreground)]">${order.total.toLocaleString()}</p>
                  <p className="text-xs text-[var(--muted)]">{order.items} item{order.items > 1 ? "s" : ""}</p>
                </div>
                <ChevronDown size={16} className={cn("shrink-0 text-[var(--muted)] transition-transform", isExpanded && "rotate-180")} />
              </button>

              {isExpanded && (
                <div className="border-t border-[var(--border-color)] bg-[var(--background)] px-5 py-4">
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    <div>
                      <p className="text-xs text-[var(--muted)]">Customer</p>
                      <p className="mt-0.5 text-sm font-medium text-[var(--foreground)]">{order.customer}</p>
                    </div>
                    <div>
                      <p className="text-xs text-[var(--muted)]">Payment</p>
                      <p className="mt-0.5 text-sm font-medium text-[var(--foreground)]">{order.paymentMethod}</p>
                    </div>
                    <div>
                      <p className="text-xs text-[var(--muted)]">Tracking</p>
                      <p className="mt-0.5 text-sm font-medium text-[var(--foreground)]">
                        {order.trackingId || "Not assigned"}
                      </p>
                    </div>
                    <div className="flex items-end gap-2">
                      <button
                        onClick={(e) => { e.stopPropagation(); handleCopyId(order.id); }}
                        className="flex items-center gap-1.5 rounded-lg bg-[var(--surface)] px-3 py-1.5 text-xs font-medium text-[var(--foreground)] transition-all hover:bg-[var(--surface-hover)]"
                      >
                        <Copy size={12} />
                        {copiedId === order.id ? "Copied!" : "Copy ID"}
                      </button>
                      <button className="flex items-center gap-1.5 rounded-lg bg-[var(--primary)]/10 px-3 py-1.5 text-xs font-medium text-[var(--primary)] transition-all hover:bg-[var(--primary)]/20">
                        <Eye size={12} /> View Details
                      </button>
                    </div>
                  </div>

                  {/* Status Timeline */}
                  {(order.status === "shipped" || order.status === "delivered") && (
                    <div className="mt-4 flex items-center gap-2">
                      {["Processing", "Shipped", "Delivered"].map((step, i) => {
                        const isComplete = order.status === "delivered" || (order.status === "shipped" && i < 2);
                        const isCurrent = (order.status === "shipped" && i === 1) || (order.status === "delivered" && i === 2);
                        return (
                          <div key={step} className="flex flex-1 items-center gap-2">
                            <div className={cn("flex h-6 w-6 items-center justify-center rounded-full text-[10px] font-bold transition-all", isComplete ? "bg-[var(--success)] text-white" : "bg-[var(--background)] text-[var(--muted)]", isCurrent && "ring-2 ring-[var(--success)]/30")}>
                              {isComplete ? <CheckCircle2 size={14} /> : i + 1}
                            </div>
                            <span className={cn("text-xs", isComplete ? "font-medium text-[var(--foreground)]" : "text-[var(--muted)]")}>{step}</span>
                            {i < 2 && <div className={cn("h-0.5 flex-1 rounded-full", isComplete ? "bg-[var(--success)]" : "bg-[var(--border-color)]")} />}
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}

        {filtered.length === 0 && (
          <div className="flex flex-col items-center justify-center rounded-2xl border border-[var(--border-color)] bg-[var(--surface)] py-12">
            <Package size={40} className="mb-3 text-[var(--muted)]" />
            <p className="text-sm text-[var(--muted)]">No orders found</p>
          </div>
        )}
      </div>
    </div>
  );
}
