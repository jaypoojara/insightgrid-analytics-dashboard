"use client";

import { useState, useMemo } from "react";
import {
  Search,
  Download,
  FileJson,
  ChevronUp,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Filter,
  MoreHorizontal,
  Eye,
  Copy,
  Trash2,
  X,
} from "lucide-react";
import { cn, formatDate, exportToCSV, exportToJSON } from "@/lib/utils";
import type { Transaction } from "@/lib/data";

interface DataTableProps {
  data: Transaction[];
}

type SortKey = keyof Transaction;
type SortDirection = "asc" | "desc";

const statusStyles: Record<string, string> = {
  completed: "bg-[var(--success)]/10 text-[var(--success)]",
  pending: "bg-[var(--warning)]/10 text-[var(--warning)]",
  failed: "bg-[var(--danger)]/10 text-[var(--danger)]",
  refunded: "bg-[var(--chart-6)]/10 text-[var(--chart-6)]",
};

const PAGE_SIZE_OPTIONS = [5, 10, 25];

export default function DataTable({ data }: DataTableProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortKey, setSortKey] = useState<SortKey>("date");
  const [sortDir, setSortDir] = useState<SortDirection>("desc");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [filterOpen, setFilterOpen] = useState(false);
  const [actionMenuRow, setActionMenuRow] = useState<string | null>(null);
  const [selectedRows, setSelectedRows] = useState<Set<string>>(new Set());

  // Filter and sort data
  const filteredData = useMemo(() => {
    let result = [...data];

    // Search
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (t) =>
          t.id.toLowerCase().includes(q) ||
          t.customer.toLowerCase().includes(q) ||
          t.email.toLowerCase().includes(q) ||
          t.product.toLowerCase().includes(q)
      );
    }

    // Status filter
    if (statusFilter !== "all") {
      result = result.filter((t) => t.status === statusFilter);
    }

    // Sort
    result.sort((a, b) => {
      const aVal = a[sortKey];
      const bVal = b[sortKey];
      if (typeof aVal === "number" && typeof bVal === "number") {
        return sortDir === "asc" ? aVal - bVal : bVal - aVal;
      }
      const aStr = String(aVal);
      const bStr = String(bVal);
      return sortDir === "asc"
        ? aStr.localeCompare(bStr)
        : bStr.localeCompare(aStr);
    });

    return result;
  }, [data, searchQuery, statusFilter, sortKey, sortDir]);

  // Pagination
  const totalPages = Math.ceil(filteredData.length / pageSize);
  const paginatedData = filteredData.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  function handleSort(key: SortKey) {
    if (sortKey === key) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortDir("asc");
    }
  }

  function toggleSelectAll() {
    if (selectedRows.size === paginatedData.length) {
      setSelectedRows(new Set());
    } else {
      setSelectedRows(new Set(paginatedData.map((t) => t.id)));
    }
  }

  function toggleSelectRow(id: string) {
    setSelectedRows((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  }

  function SortIcon({ column }: { column: SortKey }) {
    if (sortKey !== column) {
      return (
        <div className="ml-1 inline-flex flex-col opacity-30">
          <ChevronUp size={10} />
          <ChevronDown size={10} className="-mt-1" />
        </div>
      );
    }
    return sortDir === "asc" ? (
      <ChevronUp size={14} className="ml-1 text-[var(--primary)]" />
    ) : (
      <ChevronDown size={14} className="ml-1 text-[var(--primary)]" />
    );
  }

  const columns: { key: SortKey; label: string; className?: string }[] = [
    { key: "id", label: "Transaction ID" },
    { key: "customer", label: "Customer" },
    { key: "amount", label: "Amount", className: "text-right" },
    { key: "status", label: "Status" },
    { key: "date", label: "Date" },
    { key: "product", label: "Product" },
  ];

  return (
    <div className="rounded-2xl border bg-[var(--surface)] border-[var(--border-color)] transition-all duration-300 hover:border-[var(--primary)]/20">
      {/* Header */}
      <div className="flex flex-col gap-3 p-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h3 className="font-[family-name:var(--font-display)] text-base font-semibold text-[var(--foreground)]">
            Recent Transactions
          </h3>
          <p className="text-sm text-[var(--muted)]">
            {filteredData.length} transactions found
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {/* Search */}
          <div className="flex items-center gap-2 rounded-xl border bg-[var(--input-bg)] border-[var(--border-color)] px-3 py-2 focus-within:border-[var(--primary)]/50 focus-within:ring-1 focus-within:ring-[var(--primary)]/20">
            <Search size={15} className="text-[var(--muted)]" />
            <input
              type="text"
              placeholder="Search transactions..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              className="bg-transparent text-sm text-[var(--foreground)] outline-none placeholder:text-[var(--muted)] w-40"
            />
            {searchQuery && (
              <button
                onClick={() => {
                  setSearchQuery("");
                  setCurrentPage(1);
                }}
                className="text-[var(--muted)] hover:text-[var(--foreground)]"
              >
                <X size={14} />
              </button>
            )}
          </div>

          {/* Status filter */}
          <div className="relative">
            <button
              onClick={() => setFilterOpen(!filterOpen)}
              className={cn(
                "flex items-center gap-2 rounded-xl border px-3 py-2 text-sm font-medium transition-all",
                "bg-[var(--input-bg)] border-[var(--border-color)]",
                "hover:border-[var(--primary)]/30",
                statusFilter !== "all" && "border-[var(--primary)]/50 text-[var(--primary)]"
              )}
            >
              <Filter size={15} />
              <span className="hidden sm:inline">
                {statusFilter === "all" ? "All Status" : statusFilter.charAt(0).toUpperCase() + statusFilter.slice(1)}
              </span>
            </button>
            {filterOpen && (
              <div className="absolute right-0 top-full z-50 mt-2 w-40 overflow-hidden rounded-xl border bg-[var(--surface)] border-[var(--border-color)] shadow-xl shadow-black/20">
                {["all", "completed", "pending", "failed", "refunded"].map(
                  (status) => (
                    <button
                      key={status}
                      onClick={() => {
                        setStatusFilter(status);
                        setFilterOpen(false);
                        setCurrentPage(1);
                      }}
                      className={cn(
                        "flex w-full items-center px-3 py-2 text-sm transition-all",
                        statusFilter === status
                          ? "bg-[var(--primary)]/10 text-[var(--primary)] font-medium"
                          : "text-[var(--foreground)] hover:bg-[var(--surface-hover)]"
                      )}
                    >
                      {status === "all"
                        ? "All Status"
                        : status.charAt(0).toUpperCase() + status.slice(1)}
                    </button>
                  )
                )}
              </div>
            )}
          </div>

          {/* Export buttons */}
          <button
            onClick={() => exportToCSV(filteredData as unknown as Record<string, unknown>[], "transactions")}
            className="flex items-center gap-1.5 rounded-xl border border-[var(--border-color)] bg-[var(--input-bg)] px-3 py-2 text-sm font-medium text-[var(--foreground)] transition-all hover:border-[var(--primary)]/30 hover:bg-[var(--surface-hover)]"
          >
            <Download size={15} />
            <span className="hidden sm:inline">CSV</span>
          </button>
          <button
            onClick={() => exportToJSON(filteredData, "transactions")}
            className="flex items-center gap-1.5 rounded-xl border border-[var(--border-color)] bg-[var(--input-bg)] px-3 py-2 text-sm font-medium text-[var(--foreground)] transition-all hover:border-[var(--primary)]/30 hover:bg-[var(--surface-hover)]"
          >
            <FileJson size={15} />
            <span className="hidden sm:inline">JSON</span>
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-t border-b border-[var(--border-color)]">
              {/* Checkbox */}
              <th className="px-5 py-3">
                <input
                  type="checkbox"
                  checked={
                    paginatedData.length > 0 &&
                    selectedRows.size === paginatedData.length
                  }
                  onChange={toggleSelectAll}
                  className="h-4 w-4 rounded border-[var(--border-color)] accent-[var(--primary)] cursor-pointer"
                />
              </th>
              {columns.map((col) => (
                <th
                  key={col.key}
                  onClick={() => handleSort(col.key)}
                  className={cn(
                    "whitespace-nowrap px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-[var(--muted)] cursor-pointer transition-colors hover:text-[var(--foreground)]",
                    col.className
                  )}
                >
                  <div className={cn("flex items-center", col.className === "text-right" && "justify-end")}>
                    {col.label}
                    <SortIcon column={col.key} />
                  </div>
                </th>
              ))}
              <th className="px-4 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {paginatedData.map((row) => (
              <tr
                key={row.id}
                className={cn(
                  "border-b border-[var(--border-color)] transition-colors",
                  selectedRows.has(row.id)
                    ? "bg-[var(--primary)]/5"
                    : "hover:bg-[var(--surface-hover)]"
                )}
              >
                <td className="px-5 py-3">
                  <input
                    type="checkbox"
                    checked={selectedRows.has(row.id)}
                    onChange={() => toggleSelectRow(row.id)}
                    className="h-4 w-4 rounded border-[var(--border-color)] accent-[var(--primary)] cursor-pointer"
                  />
                </td>
                <td className="px-4 py-3">
                  <span className="text-sm font-medium text-[var(--primary)]">
                    {row.id}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <div>
                    <p className="text-sm font-medium text-[var(--foreground)]">
                      {row.customer}
                    </p>
                    <p className="text-xs text-[var(--muted)]">{row.email}</p>
                  </div>
                </td>
                <td className="px-4 py-3 text-right">
                  <span className="text-sm font-semibold text-[var(--foreground)]">
                    ${row.amount.toFixed(2)}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <span
                    className={cn(
                      "inline-flex rounded-full px-2.5 py-1 text-xs font-semibold capitalize",
                      statusStyles[row.status]
                    )}
                  >
                    {row.status}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <span className="text-sm text-[var(--muted)]">
                    {formatDate(row.date)}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <span className="text-sm text-[var(--foreground)]">
                    {row.product}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <div className="relative">
                    <button
                      onClick={() =>
                        setActionMenuRow(
                          actionMenuRow === row.id ? null : row.id
                        )
                      }
                      className="rounded-lg p-1.5 text-[var(--muted)] transition-all hover:bg-[var(--surface-hover)] hover:text-[var(--foreground)]"
                    >
                      <MoreHorizontal size={16} />
                    </button>
                    {actionMenuRow === row.id && (
                      <div className="absolute right-0 top-full z-50 mt-1 w-36 overflow-hidden rounded-xl border bg-[var(--surface)] border-[var(--border-color)] shadow-xl shadow-black/20">
                        <button className="flex w-full items-center gap-2 px-3 py-2 text-sm text-[var(--foreground)] transition-all hover:bg-[var(--surface-hover)]">
                          <Eye size={14} />
                          View
                        </button>
                        <button className="flex w-full items-center gap-2 px-3 py-2 text-sm text-[var(--foreground)] transition-all hover:bg-[var(--surface-hover)]">
                          <Copy size={14} />
                          Copy ID
                        </button>
                        <button className="flex w-full items-center gap-2 px-3 py-2 text-sm text-[var(--danger)] transition-all hover:bg-[var(--danger)]/10">
                          <Trash2 size={14} />
                          Delete
                        </button>
                      </div>
                    )}
                  </div>
                </td>
              </tr>
            ))}
            {paginatedData.length === 0 && (
              <tr>
                <td
                  colSpan={8}
                  className="px-4 py-12 text-center text-sm text-[var(--muted)]"
                >
                  No transactions found matching your criteria.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex flex-col gap-3 border-t border-[var(--border-color)] px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <span className="text-sm text-[var(--muted)]">
            Showing{" "}
            <span className="font-medium text-[var(--foreground)]">
              {filteredData.length === 0 ? 0 : (currentPage - 1) * pageSize + 1}
            </span>
            {" - "}
            <span className="font-medium text-[var(--foreground)]">
              {Math.min(currentPage * pageSize, filteredData.length)}
            </span>
            {" of "}
            <span className="font-medium text-[var(--foreground)]">
              {filteredData.length}
            </span>
          </span>
          <select
            value={pageSize}
            onChange={(e) => {
              setPageSize(Number(e.target.value));
              setCurrentPage(1);
            }}
            className="rounded-lg border bg-[var(--input-bg)] border-[var(--border-color)] px-2 py-1 text-sm text-[var(--foreground)] outline-none focus:border-[var(--primary)]/50"
          >
            {PAGE_SIZE_OPTIONS.map((size) => (
              <option key={size} value={size}>
                {size} / page
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-center gap-1">
          <button
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-[var(--muted)] transition-all hover:bg-[var(--surface-hover)] hover:text-[var(--foreground)] disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <ChevronLeft size={16} />
          </button>
          {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
            let page: number;
            if (totalPages <= 5) {
              page = i + 1;
            } else if (currentPage <= 3) {
              page = i + 1;
            } else if (currentPage >= totalPages - 2) {
              page = totalPages - 4 + i;
            } else {
              page = currentPage - 2 + i;
            }
            return (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={cn(
                  "flex h-8 w-8 items-center justify-center rounded-lg text-sm font-medium transition-all",
                  currentPage === page
                    ? "bg-[var(--primary)] text-white"
                    : "text-[var(--muted)] hover:bg-[var(--surface-hover)] hover:text-[var(--foreground)]"
                )}
              >
                {page}
              </button>
            );
          })}
          <button
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages || totalPages === 0}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-[var(--muted)] transition-all hover:bg-[var(--surface-hover)] hover:text-[var(--foreground)] disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
