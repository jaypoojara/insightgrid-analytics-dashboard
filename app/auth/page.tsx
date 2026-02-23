"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  BarChart3,
  Loader2,
  AlertCircle,
  CheckCircle2,
} from "lucide-react";
import { getMemberstack } from "@/lib/memberstack";
import { useMemberstack } from "@/components/MemberstackProvider";

type AuthMode = "login" | "signup" | "forgot";

export default function AuthPage() {
  const router = useRouter();
  const { refresh } = useMemberstack();
  const [mode, setMode] = useState<AuthMode>("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [darkMode, setDarkMode] = useState(true);

  // Check if already logged in
  useEffect(() => {
    const checkAuth = async () => {
      const ms = getMemberstack();
      if (!ms) return;
      try {
        const result = await ms.getCurrentMember();
        if (result?.data) {
          router.replace("/");
        }
      } catch {
        // Not logged in — stay on auth page
      }
    };
    checkAuth();
  }, [router]);

  // Sync dark mode with document
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.remove("light-mode");
    } else {
      document.documentElement.classList.add("light-mode");
    }
  }, [darkMode]);

  const clearMessages = useCallback(() => {
    setError("");
    setSuccess("");
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    clearMessages();
    setIsSubmitting(true);

    const ms = getMemberstack();
    if (!ms) {
      setError(
        "Memberstack is not configured. Add your public key to .env.local."
      );
      setIsSubmitting(false);
      return;
    }

    try {
      if (mode === "login") {
        await ms.loginMemberEmailPassword({
          email,
          password,
        });
        await refresh();
        router.replace("/");
      } else if (mode === "signup") {
        await ms.signupMemberEmailPassword({
          email,
          password,
        });
        await refresh();
        router.replace("/");
      } else if (mode === "forgot") {
        await ms.sendMemberResetPasswordEmail({ email });
        setSuccess("Password reset email sent. Check your inbox.");
        setEmail("");
      }
    } catch (err: unknown) {
      const message =
        err instanceof Error
          ? err.message
          : typeof err === "object" && err !== null && "message" in err
            ? String((err as { message: unknown }).message)
            : "Something went wrong. Please try again.";
      setError(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const switchMode = (newMode: AuthMode) => {
    setMode(newMode);
    clearMessages();
    setPassword("");
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[var(--background)] px-4">
      {/* Background decorative elements */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-32 -top-32 h-96 w-96 rounded-full bg-[var(--primary)]/5 blur-3xl" />
        <div className="absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-[var(--secondary)]/5 blur-3xl" />
        <div className="absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[var(--primary)]/3 blur-3xl" />
      </div>

      {/* Subtle grid pattern */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `linear-gradient(var(--foreground) 1px, transparent 1px), linear-gradient(90deg, var(--foreground) 1px, transparent 1px)`,
          backgroundSize: "64px 64px",
        }}
      />

      <div className="relative z-10 w-full max-w-md">
        {/* Logo & Brand */}
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-[var(--primary)] to-[var(--secondary)] shadow-lg shadow-[var(--primary)]/20">
            <BarChart3 size={28} className="text-white" />
          </div>
          <h1 className="font-[family-name:var(--font-display)] text-2xl font-bold text-[var(--foreground)]">
            InsightGrid
          </h1>
          <p className="mt-1 text-sm text-[var(--muted)]">
            {mode === "login" && "Sign in to your dashboard"}
            {mode === "signup" && "Create your account"}
            {mode === "forgot" && "Reset your password"}
          </p>
        </div>

        {/* Auth Card */}
        <div className="rounded-2xl border border-[var(--border-color)] bg-[var(--surface)] p-8 shadow-xl shadow-black/10">
          {/* Mode Tabs (login/signup only) */}
          {mode !== "forgot" && (
            <div className="mb-6 flex rounded-xl bg-[var(--background)] p-1">
              <button
                onClick={() => switchMode("login")}
                className={`flex-1 rounded-lg py-2.5 text-sm font-medium transition-all ${
                  mode === "login"
                    ? "bg-[var(--surface)] text-[var(--foreground)] shadow-sm"
                    : "text-[var(--muted)] hover:text-[var(--foreground)]"
                }`}
              >
                Sign In
              </button>
              <button
                onClick={() => switchMode("signup")}
                className={`flex-1 rounded-lg py-2.5 text-sm font-medium transition-all ${
                  mode === "signup"
                    ? "bg-[var(--surface)] text-[var(--foreground)] shadow-sm"
                    : "text-[var(--muted)] hover:text-[var(--foreground)]"
                }`}
              >
                Sign Up
              </button>
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="mb-4 flex items-start gap-2 rounded-xl border border-[var(--danger)]/20 bg-[var(--danger)]/10 px-4 py-3">
              <AlertCircle
                size={16}
                className="mt-0.5 shrink-0 text-[var(--danger)]"
              />
              <p className="text-sm text-[var(--danger)]">{error}</p>
            </div>
          )}

          {/* Success Message */}
          {success && (
            <div className="mb-4 flex items-start gap-2 rounded-xl border border-[var(--success)]/20 bg-[var(--success)]/10 px-4 py-3">
              <CheckCircle2
                size={16}
                className="mt-0.5 shrink-0 text-[var(--success)]"
              />
              <p className="text-sm text-[var(--success)]">{success}</p>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email */}
            <div>
              <label className="mb-1.5 block text-sm font-medium text-[var(--foreground)]">
                Email
              </label>
              <div className="relative">
                <Mail
                  size={16}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--muted)]"
                />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  required
                  className="w-full rounded-xl border border-[var(--border-color)] bg-[var(--input-bg)] py-3 pl-10 pr-4 text-sm text-[var(--foreground)] outline-none transition-all placeholder:text-[var(--muted)] focus:border-[var(--primary)]/50 focus:ring-2 focus:ring-[var(--primary)]/20"
                />
              </div>
            </div>

            {/* Password (not shown for forgot) */}
            {mode !== "forgot" && (
              <div>
                <label className="mb-1.5 block text-sm font-medium text-[var(--foreground)]">
                  Password
                </label>
                <div className="relative">
                  <Lock
                    size={16}
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--muted)]"
                  />
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    required
                    minLength={8}
                    className="w-full rounded-xl border border-[var(--border-color)] bg-[var(--input-bg)] py-3 pl-10 pr-12 text-sm text-[var(--foreground)] outline-none transition-all placeholder:text-[var(--muted)] focus:border-[var(--primary)]/50 focus:ring-2 focus:ring-[var(--primary)]/20"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[var(--muted)] transition-colors hover:text-[var(--foreground)]"
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>
            )}

            {/* Forgot password link (login only) */}
            {mode === "login" && (
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => switchMode("forgot")}
                  className="text-sm text-[var(--primary)] transition-colors hover:text-[var(--primary)]/80"
                >
                  Forgot password?
                </button>
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="group flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[var(--primary)] to-[var(--primary)]/90 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-[var(--primary)]/20 transition-all hover:shadow-xl hover:shadow-[var(--primary)]/30 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSubmitting ? (
                <Loader2 size={18} className="animate-spin" />
              ) : (
                <>
                  {mode === "login" && "Sign In"}
                  {mode === "signup" && "Create Account"}
                  {mode === "forgot" && "Send Reset Link"}
                  <ArrowRight
                    size={16}
                    className="transition-transform group-hover:translate-x-0.5"
                  />
                </>
              )}
            </button>
          </form>

          {/* Back to login (forgot mode) */}
          {mode === "forgot" && (
            <button
              onClick={() => switchMode("login")}
              className="mt-4 w-full text-center text-sm text-[var(--muted)] transition-colors hover:text-[var(--foreground)]"
            >
              Back to sign in
            </button>
          )}
        </div>

        {/* Footer */}
        <p className="mt-6 text-center text-xs text-[var(--muted)]">
          Secured by{" "}
          <a
            href="https://www.memberstack.com"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-[var(--primary)] transition-colors hover:text-[var(--primary)]/80"
          >
            Memberstack
          </a>
        </p>
      </div>
    </div>
  );
}
