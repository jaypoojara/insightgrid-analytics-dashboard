"use client";

import { useState } from "react";
import {
  User,
  Bell,
  Shield,
  Palette,
  Globe,
  CreditCard,
  Mail,
  Key,
  Smartphone,
  ChevronRight,
  Check,
  Camera,
  Save,
} from "lucide-react";
import { cn } from "@/lib/utils";

const tabs = [
  { id: "profile", label: "Profile", icon: User },
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "security", label: "Security", icon: Shield },
  { id: "billing", label: "Billing", icon: CreditCard },
  { id: "appearance", label: "Appearance", icon: Palette },
];

const notificationSettings = [
  { id: "email_orders", label: "New orders", desc: "Get notified when a new order is placed", enabled: true },
  { id: "email_customers", label: "New customers", desc: "Notification when someone signs up", enabled: true },
  { id: "email_reports", label: "Weekly reports", desc: "Receive a summary every Monday", enabled: false },
  { id: "email_alerts", label: "Revenue alerts", desc: "When revenue exceeds or drops below thresholds", enabled: true },
  { id: "push_orders", label: "Push notifications", desc: "Real-time alerts on your phone", enabled: false },
  { id: "email_marketing", label: "Product updates", desc: "News about new features and improvements", enabled: false },
];

export default function SettingsContent() {
  const [activeTab, setActiveTab] = useState("profile");
  const [saved, setSaved] = useState(false);
  const [notifications, setNotifications] = useState(notificationSettings);
  const [profileData, setProfileData] = useState({
    name: "John Doe",
    email: "john@company.com",
    phone: "+1 (555) 123-4567",
    timezone: "America/New_York",
    language: "English",
    role: "Admin",
  });

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const toggleNotification = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, enabled: !n.enabled } : n))
    );
  };

  return (
    <div className="mx-auto max-w-[1600px]">
      <div className="flex flex-col gap-6 lg:flex-row">
        {/* Sidebar tabs */}
        <div className="w-full shrink-0 lg:w-[240px]">
          <div className="rounded-2xl border border-[var(--border-color)] bg-[var(--surface)] p-2">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={cn(
                    "flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all duration-200",
                    activeTab === tab.id
                      ? "bg-[var(--primary)]/15 text-[var(--primary)]"
                      : "text-[var(--muted)] hover:bg-[var(--surface-hover)] hover:text-[var(--foreground)]"
                  )}
                >
                  <Icon size={18} />
                  <span>{tab.label}</span>
                  {activeTab === tab.id && <ChevronRight size={14} className="ml-auto" />}
                </button>
              );
            })}
          </div>
        </div>

        {/* Content area */}
        <div className="flex-1">
          {/* Profile Tab */}
          {activeTab === "profile" && (
            <div className="space-y-6">
              {/* Avatar section */}
              <div className="rounded-2xl border border-[var(--border-color)] bg-[var(--surface)] p-6">
                <h3 className="mb-5 font-[family-name:var(--font-display)] text-lg font-semibold text-[var(--foreground)]">
                  Profile Information
                </h3>
                <div className="flex flex-col items-start gap-6 sm:flex-row">
                  <div className="group relative">
                    <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-[var(--primary)] to-[var(--secondary)] text-2xl font-bold text-white">
                      JD
                    </div>
                    <button className="absolute -bottom-1 -right-1 flex h-7 w-7 items-center justify-center rounded-full bg-[var(--surface)] text-[var(--muted)] shadow-lg transition-all hover:bg-[var(--primary)] hover:text-white">
                      <Camera size={13} />
                    </button>
                  </div>
                  <div className="grid flex-1 grid-cols-1 gap-4 sm:grid-cols-2">
                    {[
                      { label: "Full Name", value: profileData.name, key: "name", icon: User },
                      { label: "Email", value: profileData.email, key: "email", icon: Mail },
                      { label: "Phone", value: profileData.phone, key: "phone", icon: Smartphone },
                      { label: "Role", value: profileData.role, key: "role", icon: Shield },
                    ].map((field) => {
                      const Icon = field.icon;
                      return (
                        <div key={field.key}>
                          <label className="mb-1.5 block text-xs font-medium text-[var(--muted)]">{field.label}</label>
                          <div className="flex items-center gap-2 rounded-xl border border-[var(--border-color)] bg-[var(--input-bg)] px-3 py-2.5 focus-within:border-[var(--primary)]/50 focus-within:ring-1 focus-within:ring-[var(--primary)]/20">
                            <Icon size={15} className="shrink-0 text-[var(--muted)]" />
                            <input
                              type="text"
                              value={field.value}
                              onChange={(e) => setProfileData((p) => ({ ...p, [field.key]: e.target.value }))}
                              className="flex-1 bg-transparent text-sm text-[var(--foreground)] outline-none"
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
                <div className="mt-6 flex justify-end">
                  <button
                    onClick={handleSave}
                    className={cn(
                      "flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-medium text-white transition-all",
                      saved ? "bg-[var(--success)]" : "bg-[var(--primary)] hover:brightness-110"
                    )}
                  >
                    {saved ? <Check size={16} /> : <Save size={16} />}
                    {saved ? "Saved!" : "Save Changes"}
                  </button>
                </div>
              </div>

              {/* Preferences */}
              <div className="rounded-2xl border border-[var(--border-color)] bg-[var(--surface)] p-6">
                <h3 className="mb-5 font-[family-name:var(--font-display)] text-base font-semibold text-[var(--foreground)]">
                  Preferences
                </h3>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label className="mb-1.5 block text-xs font-medium text-[var(--muted)]">Timezone</label>
                    <div className="flex items-center gap-2 rounded-xl border border-[var(--border-color)] bg-[var(--input-bg)] px-3 py-2.5">
                      <Globe size={15} className="text-[var(--muted)]" />
                      <select
                        value={profileData.timezone}
                        onChange={(e) => setProfileData((p) => ({ ...p, timezone: e.target.value }))}
                        className="flex-1 bg-transparent text-sm text-[var(--foreground)] outline-none"
                      >
                        <option value="America/New_York">Eastern Time (ET)</option>
                        <option value="America/Chicago">Central Time (CT)</option>
                        <option value="America/Denver">Mountain Time (MT)</option>
                        <option value="America/Los_Angeles">Pacific Time (PT)</option>
                        <option value="Europe/London">London (GMT)</option>
                        <option value="Europe/Paris">Paris (CET)</option>
                        <option value="Asia/Tokyo">Tokyo (JST)</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="mb-1.5 block text-xs font-medium text-[var(--muted)]">Language</label>
                    <div className="flex items-center gap-2 rounded-xl border border-[var(--border-color)] bg-[var(--input-bg)] px-3 py-2.5">
                      <Globe size={15} className="text-[var(--muted)]" />
                      <select
                        value={profileData.language}
                        onChange={(e) => setProfileData((p) => ({ ...p, language: e.target.value }))}
                        className="flex-1 bg-transparent text-sm text-[var(--foreground)] outline-none"
                      >
                        <option>English</option>
                        <option>Spanish</option>
                        <option>French</option>
                        <option>German</option>
                        <option>Japanese</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Notifications Tab */}
          {activeTab === "notifications" && (
            <div className="rounded-2xl border border-[var(--border-color)] bg-[var(--surface)] p-6">
              <h3 className="mb-5 font-[family-name:var(--font-display)] text-lg font-semibold text-[var(--foreground)]">
                Notification Preferences
              </h3>
              <div className="space-y-1">
                {notifications.map((notif) => (
                  <div key={notif.id} className="flex items-center justify-between rounded-xl px-4 py-4 transition-all hover:bg-[var(--surface-hover)]">
                    <div>
                      <p className="text-sm font-medium text-[var(--foreground)]">{notif.label}</p>
                      <p className="mt-0.5 text-xs text-[var(--muted)]">{notif.desc}</p>
                    </div>
                    <button
                      onClick={() => toggleNotification(notif.id)}
                      className={cn(
                        "relative h-6 w-11 rounded-full transition-all duration-300",
                        notif.enabled ? "bg-[var(--primary)]" : "bg-[var(--border-color)]"
                      )}
                    >
                      <span
                        className={cn(
                          "absolute top-0.5 h-5 w-5 rounded-full bg-white shadow-md transition-all duration-300",
                          notif.enabled ? "left-[22px]" : "left-0.5"
                        )}
                      />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Security Tab */}
          {activeTab === "security" && (
            <div className="space-y-6">
              <div className="rounded-2xl border border-[var(--border-color)] bg-[var(--surface)] p-6">
                <h3 className="mb-5 font-[family-name:var(--font-display)] text-lg font-semibold text-[var(--foreground)]">
                  Password
                </h3>
                <div className="max-w-md space-y-4">
                  {["Current Password", "New Password", "Confirm Password"].map((label) => (
                    <div key={label}>
                      <label className="mb-1.5 block text-xs font-medium text-[var(--muted)]">{label}</label>
                      <div className="flex items-center gap-2 rounded-xl border border-[var(--border-color)] bg-[var(--input-bg)] px-3 py-2.5 focus-within:border-[var(--primary)]/50 focus-within:ring-1 focus-within:ring-[var(--primary)]/20">
                        <Key size={15} className="text-[var(--muted)]" />
                        <input type="password" placeholder="••••••••" className="flex-1 bg-transparent text-sm text-[var(--foreground)] outline-none placeholder:text-[var(--muted)]" />
                      </div>
                    </div>
                  ))}
                  <button className="rounded-xl bg-[var(--primary)] px-5 py-2.5 text-sm font-medium text-white transition-all hover:brightness-110">
                    Update Password
                  </button>
                </div>
              </div>

              <div className="rounded-2xl border border-[var(--border-color)] bg-[var(--surface)] p-6">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-[family-name:var(--font-display)] text-base font-semibold text-[var(--foreground)]">
                      Two-Factor Authentication
                    </h3>
                    <p className="mt-1 text-sm text-[var(--muted)]">Add an extra layer of security to your account</p>
                  </div>
                  <span className="rounded-full bg-[var(--warning)]/15 px-3 py-1 text-xs font-semibold text-[var(--warning)]">Not enabled</span>
                </div>
                <button className="mt-4 flex items-center gap-2 rounded-xl border border-[var(--border-color)] bg-[var(--surface-hover)] px-4 py-2.5 text-sm font-medium text-[var(--foreground)] transition-all hover:border-[var(--primary)]/30">
                  <Smartphone size={16} /> Enable 2FA
                </button>
              </div>

              <div className="rounded-2xl border border-[var(--border-color)] bg-[var(--surface)] p-6">
                <h3 className="mb-4 font-[family-name:var(--font-display)] text-base font-semibold text-[var(--foreground)]">
                  Active Sessions
                </h3>
                <div className="space-y-3">
                  {[
                    { device: "MacBook Pro — Chrome", location: "New York, US", time: "Current session", current: true },
                    { device: "iPhone 15 — Safari", location: "New York, US", time: "2 hours ago", current: false },
                    { device: "Windows PC — Firefox", location: "London, UK", time: "3 days ago", current: false },
                  ].map((session, i) => (
                    <div key={i} className="flex items-center justify-between rounded-xl border border-[var(--border-color)] px-4 py-3">
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="text-sm font-medium text-[var(--foreground)]">{session.device}</p>
                          {session.current && (
                            <span className="rounded-full bg-[var(--success)]/15 px-2 py-0.5 text-[10px] font-semibold text-[var(--success)]">Current</span>
                          )}
                        </div>
                        <p className="mt-0.5 text-xs text-[var(--muted)]">{session.location} — {session.time}</p>
                      </div>
                      {!session.current && (
                        <button className="text-xs font-medium text-[var(--danger)] transition-all hover:underline">
                          Revoke
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Billing Tab */}
          {activeTab === "billing" && (
            <div className="space-y-6">
              <div className="rounded-2xl border border-[var(--primary)]/30 bg-gradient-to-r from-[var(--primary)]/5 to-transparent p-6">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <p className="text-sm text-[var(--muted)]">Current Plan</p>
                    <h3 className="mt-1 font-[family-name:var(--font-display)] text-2xl font-bold text-[var(--foreground)]">Business Plan</h3>
                    <p className="mt-1 text-sm text-[var(--muted)]">$189/month — Renews on Jan 15, 2025</p>
                  </div>
                  <button className="rounded-xl bg-[var(--primary)] px-5 py-2.5 text-sm font-medium text-white transition-all hover:brightness-110">
                    Upgrade Plan
                  </button>
                </div>
              </div>

              <div className="rounded-2xl border border-[var(--border-color)] bg-[var(--surface)] p-6">
                <h3 className="mb-4 font-[family-name:var(--font-display)] text-base font-semibold text-[var(--foreground)]">
                  Payment Method
                </h3>
                <div className="flex items-center gap-4 rounded-xl border border-[var(--border-color)] p-4">
                  <div className="flex h-10 w-14 items-center justify-center rounded-lg bg-[var(--chart-2)]/10">
                    <CreditCard size={20} className="text-[var(--chart-2)]" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-[var(--foreground)]">Visa ending in 4242</p>
                    <p className="text-xs text-[var(--muted)]">Expires 12/2026</p>
                  </div>
                  <button className="text-xs font-medium text-[var(--primary)] hover:underline">Update</button>
                </div>
              </div>

              <div className="rounded-2xl border border-[var(--border-color)] bg-[var(--surface)] p-6">
                <h3 className="mb-4 font-[family-name:var(--font-display)] text-base font-semibold text-[var(--foreground)]">
                  Recent Invoices
                </h3>
                <div className="space-y-2">
                  {[
                    { date: "Dec 15, 2024", amount: "$189.00", status: "Paid" },
                    { date: "Nov 15, 2024", amount: "$189.00", status: "Paid" },
                    { date: "Oct 15, 2024", amount: "$189.00", status: "Paid" },
                    { date: "Sep 15, 2024", amount: "$149.00", status: "Paid" },
                  ].map((invoice, i) => (
                    <div key={i} className="flex items-center justify-between rounded-xl px-4 py-3 transition-all hover:bg-[var(--surface-hover)]">
                      <div>
                        <p className="text-sm font-medium text-[var(--foreground)]">{invoice.date}</p>
                        <p className="text-xs text-[var(--muted)]">{invoice.amount}</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="rounded-full bg-[var(--success)]/15 px-2.5 py-0.5 text-xs font-medium text-[var(--success)]">{invoice.status}</span>
                        <button className="text-xs font-medium text-[var(--primary)] hover:underline">Download</button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Appearance Tab */}
          {activeTab === "appearance" && (
            <div className="rounded-2xl border border-[var(--border-color)] bg-[var(--surface)] p-6">
              <h3 className="mb-5 font-[family-name:var(--font-display)] text-lg font-semibold text-[var(--foreground)]">
                Appearance
              </h3>
              <p className="mb-4 text-sm text-[var(--muted)]">
                Choose how InsightGrid looks. You can toggle dark/light mode using the sun/moon icon in the header.
              </p>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <button className="group overflow-hidden rounded-xl border-2 border-[var(--primary)] p-4 transition-all">
                  <div className="mb-3 flex h-24 items-center justify-center rounded-lg bg-[#1C1917]">
                    <div className="flex gap-1">
                      <div className="h-3 w-3 rounded-full bg-[#FB923C]" />
                      <div className="h-3 w-3 rounded-full bg-[#38BDF8]" />
                      <div className="h-3 w-3 rounded-full bg-[#4ADE80]" />
                    </div>
                  </div>
                  <p className="text-sm font-medium text-[var(--foreground)]">Dark Mode</p>
                  <p className="text-xs text-[var(--muted)]">Warm charcoal theme</p>
                </button>
                <button className="group overflow-hidden rounded-xl border-2 border-[var(--border-color)] p-4 transition-all hover:border-[var(--primary)]/50">
                  <div className="mb-3 flex h-24 items-center justify-center rounded-lg bg-[#F5F0EB]">
                    <div className="flex gap-1">
                      <div className="h-3 w-3 rounded-full bg-[#EA580C]" />
                      <div className="h-3 w-3 rounded-full bg-[#0284C7]" />
                      <div className="h-3 w-3 rounded-full bg-[#16A34A]" />
                    </div>
                  </div>
                  <p className="text-sm font-medium text-[var(--foreground)]">Light Mode</p>
                  <p className="text-xs text-[var(--muted)]">Warm sand theme</p>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
