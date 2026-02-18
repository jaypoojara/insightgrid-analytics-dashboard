"use client";

import { useState } from "react";
import {
  Search,
  Package,
  Star,
  TrendingUp,
  DollarSign,
  ShoppingBag,
  AlertTriangle,
  Grid3X3,
  List,
  MoreHorizontal,
  ArrowUpDown,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { productsData, productPerformance } from "@/lib/data";
import { cn } from "@/lib/utils";

const statusConfig = {
  in_stock: { label: "In Stock", bg: "bg-[var(--success)]/15", text: "text-[var(--success)]" },
  low_stock: { label: "Low Stock", bg: "bg-[var(--warning)]/15", text: "text-[var(--warning)]" },
  out_of_stock: { label: "Out of Stock", bg: "bg-[var(--danger)]/15", text: "text-[var(--danger)]" },
};

export default function ProductsContent() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<"revenue" | "sold" | "rating">("revenue");
  const [hoveredProduct, setHoveredProduct] = useState<string | null>(null);

  const totalRevenue = productsData.reduce((sum, p) => sum + p.revenue, 0);
  const totalSold = productsData.reduce((sum, p) => sum + p.sold, 0);
  const lowStockCount = productsData.filter((p) => p.status === "low_stock" || p.status === "out_of_stock").length;

  const filtered = productsData
    .filter((p) => p.name.toLowerCase().includes(searchQuery.toLowerCase()) || p.category.toLowerCase().includes(searchQuery.toLowerCase()))
    .sort((a, b) => (b[sortBy] as number) - (a[sortBy] as number));

  return (
    <div className="mx-auto max-w-[1600px] space-y-6">
      {/* Summary */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {[
          { label: "Total Revenue", value: `$${(totalRevenue / 1000).toFixed(0)}K`, icon: DollarSign, color: "var(--chart-1)" },
          { label: "Units Sold", value: totalSold.toLocaleString(), icon: ShoppingBag, color: "var(--chart-3)" },
          { label: "Low/Out of Stock", value: lowStockCount.toString(), icon: AlertTriangle, color: "var(--warning)" },
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

      {/* Performance Chart */}
      <div className="rounded-2xl border border-[var(--border-color)] bg-[var(--surface)] p-5">
        <h3 className="mb-4 font-[family-name:var(--font-display)] text-lg font-semibold text-[var(--foreground)]">
          Product Performance
        </h3>
        <div className="h-[280px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={productPerformance} barGap={2}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" />
              <XAxis dataKey="month" tick={{ fill: "var(--muted)", fontSize: 12 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: "var(--muted)", fontSize: 12 }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ background: "var(--surface)", border: "1px solid var(--border-color)", borderRadius: 12, color: "var(--foreground)" }} />
              <Legend wrapperStyle={{ fontSize: 12, color: "var(--muted)" }} />
              <Bar dataKey="subscriptions" name="Subscriptions" fill="var(--chart-1)" radius={[4, 4, 0, 0]} />
              <Bar dataKey="addons" name="Add-ons" fill="var(--chart-2)" radius={[4, 4, 0, 0]} />
              <Bar dataKey="services" name="Services" fill="var(--chart-3)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="flex flex-1 items-center gap-2 rounded-xl border border-[var(--border-color)] bg-[var(--input-bg)] px-3 py-2 focus-within:border-[var(--primary)]/50 focus-within:ring-1 focus-within:ring-[var(--primary)]/20">
          <Search size={16} className="text-[var(--muted)]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search products..."
            className="flex-1 bg-transparent text-sm text-[var(--foreground)] outline-none placeholder:text-[var(--muted)]"
          />
        </div>
        <div className="flex items-center gap-1 rounded-xl border border-[var(--border-color)] bg-[var(--surface)] p-1">
          {(["revenue", "sold", "rating"] as const).map((s) => (
            <button
              key={s}
              onClick={() => setSortBy(s)}
              className={cn("flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition-all", sortBy === s ? "bg-[var(--primary)] text-white" : "text-[var(--muted)] hover:text-[var(--foreground)]")}
            >
              <ArrowUpDown size={12} />
              <span className="capitalize">{s}</span>
            </button>
          ))}
        </div>
        <div className="flex items-center gap-1 rounded-xl border border-[var(--border-color)] bg-[var(--surface)] p-1">
          <button onClick={() => setViewMode("grid")} className={cn("rounded-lg p-2 transition-all", viewMode === "grid" ? "bg-[var(--primary)] text-white" : "text-[var(--muted)] hover:text-[var(--foreground)]")}>
            <Grid3X3 size={15} />
          </button>
          <button onClick={() => setViewMode("list")} className={cn("rounded-lg p-2 transition-all", viewMode === "list" ? "bg-[var(--primary)] text-white" : "text-[var(--muted)] hover:text-[var(--foreground)]")}>
            <List size={15} />
          </button>
        </div>
      </div>

      {/* Product Grid/List */}
      {viewMode === "grid" ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {filtered.map((product) => {
            const status = statusConfig[product.status];
            return (
              <div
                key={product.id}
                onMouseEnter={() => setHoveredProduct(product.id)}
                onMouseLeave={() => setHoveredProduct(null)}
                className={cn(
                  "group rounded-2xl border border-[var(--border-color)] bg-[var(--surface)] p-5 transition-all duration-300",
                  hoveredProduct === product.id ? "scale-[1.02] shadow-lg shadow-black/10 border-[var(--primary)]/30" : "hover:shadow-md"
                )}
              >
                <div className="mb-4 flex items-start justify-between">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--primary)]/10">
                    <Package size={20} className="text-[var(--primary)]" />
                  </div>
                  <span className={cn("rounded-full px-2.5 py-0.5 text-[10px] font-semibold", status.bg, status.text)}>
                    {status.label}
                  </span>
                </div>
                <h4 className="mb-1 text-sm font-semibold text-[var(--foreground)]">{product.name}</h4>
                <p className="mb-3 text-xs text-[var(--muted)]">{product.category}</p>
                <div className="mb-3 flex items-center gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} size={13} className={i < Math.floor(product.rating) ? "fill-[var(--warning)] text-[var(--warning)]" : "text-[var(--border-color)]"} />
                  ))}
                  <span className="ml-1 text-xs text-[var(--muted)]">{product.rating}</span>
                </div>
                <div className="flex items-center justify-between border-t border-[var(--border-color)] pt-3">
                  <div>
                    <p className="text-lg font-bold text-[var(--foreground)]">${product.price.toLocaleString()}</p>
                    <p className="text-xs text-[var(--muted)]">{product.sold.toLocaleString()} sold</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold text-[var(--success)]">${(product.revenue / 1000).toFixed(1)}K</p>
                    <p className="text-xs text-[var(--muted)]">revenue</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="overflow-hidden rounded-2xl border border-[var(--border-color)] bg-[var(--surface)]">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[700px]">
              <thead>
                <tr className="border-b border-[var(--border-color)]">
                  <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-[var(--muted)]">Product</th>
                  <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-[var(--muted)]">Price</th>
                  <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-[var(--muted)]">Sold</th>
                  <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-[var(--muted)]">Revenue</th>
                  <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-[var(--muted)]">Rating</th>
                  <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-[var(--muted)]">Status</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((product) => {
                  const status = statusConfig[product.status];
                  return (
                    <tr key={product.id} className="border-b border-[var(--border-color)] transition-all hover:bg-[var(--surface-hover)]">
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[var(--primary)]/10">
                            <Package size={16} className="text-[var(--primary)]" />
                          </div>
                          <div>
                            <p className="text-sm font-medium text-[var(--foreground)]">{product.name}</p>
                            <p className="text-xs text-[var(--muted)]">{product.category}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-5 py-4 text-sm font-medium text-[var(--foreground)]">${product.price.toLocaleString()}</td>
                      <td className="px-5 py-4 text-sm text-[var(--foreground)]">{product.sold.toLocaleString()}</td>
                      <td className="px-5 py-4 text-sm font-semibold text-[var(--success)]">${(product.revenue / 1000).toFixed(1)}K</td>
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-1">
                          <Star size={13} className="fill-[var(--warning)] text-[var(--warning)]" />
                          <span className="text-sm text-[var(--foreground)]">{product.rating}</span>
                        </div>
                      </td>
                      <td className="px-5 py-4">
                        <span className={cn("rounded-full px-2.5 py-0.5 text-[10px] font-semibold", status.bg, status.text)}>{status.label}</span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
