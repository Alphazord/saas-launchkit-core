"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/contexts/auth-context";
import { SignupModal } from "./signup-modal";
import { BRANDING } from "@/config/branding";

const FEATURES = [
  {
    title: "Google OAuth with PKCE",
    description:
      "Production-grade authentication with S256 code challenge, session rotation, and HTTP-only cookies.",
    icon: (
      <svg
        className="w-6 h-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.5}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M15.75 5.25a3 3 0 013 3m3 0a6 6 0 01-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1121.75 8.25z"
        />
      </svg>
    ),
  },
  {
    title: "Edge-Ready Backend",
    description: "Hono on Cloudflare Workers with D1 database, CSP headers, rate limiting, and request IDs.",
    icon: (
      <svg
        className="w-6 h-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.5}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M5.25 14.25h13.5m-13.5 0a3 3 0 01-3-3m3 3a3 3 0 100 6h13.5a3 3 0 100-6m-16.5-3a3 3 0 013-3h13.5a3 3 0 013 3m-19.5 0a4.5 4.5 0 01.9-2.7L5.737 5.1a3.375 3.375 0 012.7-1.35h7.126c1.062 0 2.062.5 2.7 1.35l2.587 3.45a4.5 4.5 0 01.9 2.7m0 0a3 3 0 01-3 3m0 3h.008v.008h-.008v-.008zm0-6h.008v.008h-.008v-.008zm-3 6h.008v.008h-.008v-.008zm0-6h.008v.008h-.008v-.008z"
        />
      </svg>
    ),
  },
  {
    title: "Encrypted Token Storage",
    description: "AES-256-GCM encrypted refresh tokens with PBKDF2 key derivation. Raw tokens never touch the database.",
    icon: (
      <svg
        className="w-6 h-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.5}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
        />
      </svg>
    ),
  },
  {
    title: "Type-Safe Monorepo",
    description: "Nx-powered workspace with @repo/auth, @repo/http, @repo/types — zero runtime overhead, full type safety.",
    icon: (
      <svg
        className="w-6 h-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.5}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5"
        />
      </svg>
    ),
  },
];

const STEPS = [
  {
    step: "1",
    title: "Clone the repo",
    description: "Free and open source under MIT. Star it, fork it, read the commits.",
  },
  {
    step: "2",
    title: "Configure your env",
    description: "Set your Google OAuth credentials and database URL. That's it.",
  },
  {
    step: "3",
    title: "Deploy",
    description: "Push to Cloudflare Workers or your platform of choice.",
  },
];

function LandingPageInner() {
  const [modalOpen, setModalOpen] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);
  const { user } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (searchParams.get("auth_error")) {
      setAuthError("Sign-in failed. Please try again.");
      const url = new URL(window.location.href);
      url.searchParams.delete("auth_error");
      window.history.replaceState({}, "", url.toString());
    }
  }, [searchParams]);

  const handleAction = () => {
    if (user) {
      router.push("/dashboard");
    } else {
      setModalOpen(true);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {authError && (
        <div
          role="alert"
          className="flex items-center justify-between gap-4 px-6 py-3 bg-red-50 border-b border-red-200 text-red-700 text-sm"
        >
          <span>{authError}</span>
          <button
            onClick={() => setAuthError(null)}
            className="font-semibold hover:underline cursor-pointer shrink-0"
            aria-label="Dismiss error"
          >
            Dismiss
          </button>
        </div>
      )}

      <header className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
        <span className="text-xl font-bold text-gray-900">{BRANDING.name}</span>
        <nav className="hidden md:flex items-center gap-8">
          <a
            href="#features"
            className="text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors"
          >
            Features
          </a>
          <a
            href="https://github.com/Adnan-the-coder/saas-launchkit-core"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors"
          >
            GitHub
          </a>
        </nav>
        <button
          onClick={handleAction}
          className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition-colors cursor-pointer"
        >
          {user ? "Dashboard" : "Get Started"}
        </button>
      </header>

      <main className="flex-1">
        {/* Hero */}
        <section className="flex flex-col items-center justify-center text-center px-6 py-24">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-50 border border-green-200 text-green-700 text-xs font-semibold mb-6">
            <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
            Free &amp; Open Source — MIT License
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-4 tracking-tight">
            Build faster.
            <br />
            Ship sooner.
          </h1>
          <p className="text-lg text-gray-500 max-w-lg mb-8">{BRANDING.tagline}</p>
          <div className="flex items-center gap-4">
            <button
              onClick={handleAction}
              className="px-8 py-3 text-base font-semibold text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-600/25 cursor-pointer"
            >
              {user ? "Go to Dashboard" : "Get Started Free"}
            </button>
            <a
              href="https://github.com/Adnan-the-coder/saas-launchkit-core"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-3 text-base font-semibold text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
            >
              View on GitHub
            </a>
          </div>
        </section>

        {/* Features */}
        <section id="features" className="px-6 py-20 bg-gray-50">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-3">
              Everything you need
            </h2>
            <p className="text-gray-500 text-center mb-12 max-w-md mx-auto">
              Authentication, infrastructure, and security — wired up and ready to go.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {FEATURES.map((feature) => (
                <div
                  key={feature.title}
                  className="rounded-2xl border border-gray-200 bg-white p-6 hover:shadow-md transition-shadow"
                >
                  <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center mb-4">
                    {feature.icon}
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">{feature.title}</h3>
                  <p className="text-sm text-gray-500">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="px-6 py-20">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
              Up and running in minutes
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {STEPS.map((s) => (
                <div key={s.step} className="text-center">
                  <div className="w-10 h-10 rounded-full bg-indigo-600 text-white font-bold text-sm flex items-center justify-center mx-auto mb-4">
                    {s.step}
                  </div>
                  <h3 className="text-base font-semibold text-gray-900 mb-1">{s.title}</h3>
                  <p className="text-sm text-gray-500">{s.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Pro Upsell */}
        <section className="px-6 py-20 bg-gray-50">
          <div className="max-w-lg mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">
              Need payments too?
            </h2>
            <p className="text-gray-500 mb-8">
              SaaS LaunchKit Pro adds Razorpay integration, full dashboard, webhook handling, and production deployment configs — all for a one-time fee.
            </p>
            <a
              href="https://adnanbuilds.online/products/saas-launchkit"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-8 py-3 text-base font-semibold text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-600/25"
            >
              Check out SaaS LaunchKit Pro →
            </a>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-100 py-8 px-6">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-400">
            &copy; {new Date().getFullYear()} {BRANDING.name}. MIT License.
          </p>
          <div className="flex items-center gap-6">
            <a
              href="#features"
              className="text-sm text-gray-400 hover:text-gray-600 transition-colors"
            >
              Features
            </a>
            <a
              href="https://github.com/Adnan-the-coder/saas-launchkit-core"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-gray-400 hover:text-gray-600 transition-colors"
            >
              GitHub
            </a>
            <a
              href="https://adnanbuilds.online/products/saas-launchkit"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-gray-400 hover:text-gray-600 transition-colors"
            >
              Pro Version
            </a>
          </div>
        </div>
      </footer>

      <SignupModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </div>
  );
}

export function LandingPage() {
  return (
    <Suspense>
      <LandingPageInner />
    </Suspense>
  );
}
