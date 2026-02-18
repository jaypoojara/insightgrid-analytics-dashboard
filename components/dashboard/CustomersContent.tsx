"use client";

import { useState } from "react";
import {
  Search,
  Filter,
  UserPlus,
  Mail,
  MapPin,
  Calendar,
  ChevronDown,
  MoreHorizontal,
  TrendingUp,
  Users,
  DollarSign,
  UserCheck,
} from "lucide-react";
import { customersData, customerSegments } from "@/lib/data";
import { cn } from "@/lib/utils";

const statusColors = {
  active: { bg: "bg-[var(--success)]/15", text: "text-[var(--success)]", dot: "bg-[var(--success)]" },
  inactive: { bg: "bg-[var(--warning)]/15", text: "text-[var(--warning)]", dot: "bg-[var(--warning)]" },
  churned: { bg: "bg-[var(--danger)]/15", text: "text-[var(--danger)]", dot: "bg-[var(--danger)]" },
};

const planColors = {
  Starter: "bg-[var(--muted)]/15 text-[var(--muted)]",
  Pro: "bg-[var(--chart-2)]/15 text-[var(--chart-2)]",
  Business: "bg-[var(--chart-1)]/15 text-[var(--chart-1)]",
  Enterprise: "bg-[var(--chart-5)]/15 text-[var(--chart-5)]",
};

export default function CustomersContent() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [selectedCustomer, setSelectedCustomer] = useState<string | null>(null);
  const [filterOpen, setFilterOpen] = useState(false);

  const filtered = customersData.filter((c) => {
    const matchesSearch =
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || c.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const totalCustomers = customersData.length;
  const activeCount = customersData.filter((c) => c.status === "active").length;
  const totalRevenue = customersData.reduce((sum, c) => sum + c.spent, 0);
  const avgSpend = totalRevenue / totalCustomers;

  const summaryCards = [
    { label: "Total Customers", value: "765", icon: Users, color: "var(--chart-2)" },
    { label: "Active", value: `${activeCount * 76}`, icon: UserCheck, color: "var(--success)" },
    { label: "Total Revenue", value: `$${(totalRevenue * 10).toLocaleString()}`, icon: DollarSign, color: "var(--chart-1)" },
    { label: "Avg. Spend", value: `$${Math.round(avgSpend * 10).toLocaleString()}`, icon: TrendingUp, color: "var(--chart-5)" },
  ];

  return (
    <div className="mx-auto max-w-[1600px] space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {summaryCards.map((card) => {
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

      {/* Segment Breakdown */}
      <div className="rounded-2xl border border-[var(--border-color)] bg-[var(--surface)] p-5">
        <h3 className="mb-4 font-[family-name:var(--font-display)] text-base font-semibold text-[var(--foreground)]">
          Customer Segments
        </h3>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {customerSegments.map((seg) => (
            <div key={seg.segment} className="group rounded-xl border border-[var(--border-color)] p-4 transition-all duration-200 hover:border-[var(--primary)]/30 hover:bg-[var(--surface-hover)]">
              <div className="mb-2 flex items-center justify-between">
                <span className="text-sm font-medium text-[var(--foreground)]">{seg.segment}</span>
                <span className="rounded-full px-2 py-0.5 text-xs font-semibold" style={{ background: `color-mix(in srgb, ${seg.color} 15%, transparent)`, color: seg.color }}>
                  {seg.count}
                </span>
              </div>
              <p className="text-lg font-bold text-[var(--foreground)]">${(seg.revenue / 1000).toFixed(0)}K</p>
              <p className="text-xs text-[var(--muted)]">revenue</p>
            </div>
          ))}
        </div>
      </div>

      {/* Search + Filter Bar */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="flex flex-1 items-center gap-2 rounded-xl border border-[var(--border-color)] bg-[var(--input-bg)] px-3 py-2 focus-within:border-[var(--primary)]/50 focus-within:ring-1 focus-within:ring-[var(--primary)]/20">
          <Search size={16} className="text-[var(--muted)]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search customers..."
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
              <div className="absolute right-0 top-full z-50 mt-1 w-40 overflow-hidden rounded-xl border border-[var(--border-color)] bg-[var(--surface)] shadow-xl">
                {["all", "active", "inactive", "churned"].map((s) => (
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
        <button className="flex items-center gap-2 rounded-xl bg-[var(--primary)] px-4 py-2.5 text-sm font-medium text-white transition-all hover:brightness-110">
          <UserPlus size={15} /> Add Customer
        </button>
      </div>

      {/* Customer List */}
      <div className="overflow-hidden rounded-2xl border border-[var(--border-color)] bg-[var(--surface)]">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[800px]">
            <thead>
              <tr className="border-b border-[var(--border-color)]">
                <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-[var(--muted)]">Customer</th>
                <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-[var(--muted)]">Plan</th>
                <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-[var(--muted)]">Status</th>
                <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-[var(--muted)]">Spent</th>
                <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-[var(--muted)]">Last Active</th>
                <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-[var(--muted)]">Location</th>
                <th className="px-5 py-3 text-right text-xs font-semibold uppercase tracking-wider text-[var(--muted)]"></th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((customer) => {
                const colors = statusColors[customer.status];
                return (
                  <tr
                    key={customer.id}
                    onClick={() => setSelectedCustomer(selectedCustomer === customer.id ? null : customer.id)}
                    className={cn(
                      "cursor-pointer border-b border-[var(--border-color)] transition-all duration-200",
                      selectedCustomer === customer.id ? "bg-[var(--primary)]/5" : "hover:bg-[var(--surface-hover)]"
                    )}
                  >
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[var(--chart-1)] to-[var(--chart-2)] text-xs font-bold text-white">
                          {customer.avatar}
                        </div>
                        <div>
                          <p className="text-sm font-medium text-[var(--foreground)]">{customer.name}</p>
                          <p className="text-xs text-[var(--muted)]">{customer.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <span className={cn("rounded-full px-2.5 py-0.5 text-xs font-medium", planColors[customer.plan])}>
                        {customer.plan}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <div className={cn("flex w-fit items-center gap-1.5 rounded-full px-2.5 py-0.5", colors.bg)}>
                        <span className={cn("h-1.5 w-1.5 rounded-full", colors.dot)} />
                        <span className={cn("text-xs font-medium capitalize", colors.text)}>{customer.status}</span>
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <span className="text-sm font-semibold text-[var(--foreground)]">${customer.spent.toLocaleString()}</span>
                    </td>
                    <td className="px-5 py-4">
                      <span className="text-sm text-[var(--muted)]">{customer.lastActive}</span>
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-1.5">
                        <MapPin size={13} className="text-[var(--muted)]" />
                        <span className="text-sm text-[var(--muted)]">{customer.location}</span>
                      </div>
                    </td>
                    <td className="px-5 py-4 text-right">
                      <button className="rounded-lg p-1.5 text-[var(--muted)] transition-all hover:bg-[var(--surface-hover)] hover:text-[var(--foreground)]">
                        <MoreHorizontal size={16} />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        {filtered.length === 0 && (
          <div className="flex flex-col items-center justify-center py-12">
            <Users size={40} className="mb-3 text-[var(--muted)]" />
            <p className="text-sm text-[var(--muted)]">No customers found</p>
          </div>
        )}
      </div>
    </div>
  );
}
