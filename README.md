# SaaS LaunchKit Core

Free, MIT-licensed auth scaffold for SaaS apps. Google OAuth with PKCE, session management, encrypted token storage, and a dashboard — ready to deploy on Cloudflare Works.

## What's Included

- **Google OAuth with PKCE** — S256 code challenge, session rotation, HTTP-only cookies
- **Encrypted Token Storage** — AES-256-GCM with PBKDF2 key derivation (100K iterations)
- **Edge-Ready Backend** — Hono on Cloudflare Workers with D1 database, CSP headers, rate limiting
- **Type-Safe Monorepo** — @repo/auth, @repo/http, @repo/types with zero runtime overhead
- **CI/CD** — GitHub Actions with build, typecheck, lint, and test
- **Dashboard** — Protected profile page with security overview
- **Structured Logging** — JSON logs with timestamps and error cause chains

## Core vs Pro

SaaS LaunchKit Core gives you a production-grade auth foundation. **[SaaS LaunchKit Pro](https://adnanbuilds.online/products/saas-launchkit)** ($59) adds payments, advanced features, and everything you need to ship a commercial SaaS product.

| Feature | Core (Free) | Pro ($59) |
|---|---|---|
| **Google OAuth with PKCE** | ✅ | ✅ |
| **Session Management** | ✅ HMAC-SHA256, sliding window | ✅ |
| **Encrypted Token Storage** | ✅ AES-256-GCM | ✅ |
| **Rate Limiting** | ✅ KV-backed (optional) | ✅ Configurable policies |
| **Security Headers** | ✅ CSP, HSTS, CORS | ✅ |
| **CI/CD** | ✅ GitHub Actions | ✅ + Staging, preview deploys |
| **Dashboard** | Profile + security overview | Full settings, API keys, team management |
| **DB Tables** | users, accounts, sessions | + orders, products |
| **Razorpay Payments** | ❌ | ✅ Orders, webhooks, signature verification |
| **Webhook Handling** | ❌ | ✅ Payment events (captured, failed, authorized) |
| **Product Catalog** | ❌ | ✅ Typed product config |
| **Multi-OAuth Providers** | ❌ | ✅ GitHub, Apple (extensible) |
| **Multi-Tenant / RBAC** | ❌ | ✅ Role-based access control |
| **Analytics Dashboard** | ❌ | ✅ Usage metrics, conversion tracking |
| **Support** | Community (GitHub Issues) | Direct |

**→ [Get SaaS LaunchKit Pro](https://adnanbuilds.online/products/saas-launchkit)**

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | Next.js 16 (App Router), React 19, Tailwind CSS v4 |
| Backend | Hono.js on Cloudflare Workers |
| Database | Cloudflare D1 (SQLite at edge) via Drizzle ORM |
| Auth | Google OAuth 2.0 with PKCE |
| Monorepo | Nx |
| Testing | Vitest |

## Quick Start

```bash
# Clone
git clone https://github.com/Adnan-the-coder/saas-launchkit-core.git
cd saas-launchkit-core

# Install
pnpm install

# Configure
cp apps/server/.dev.vars.example apps/server/.dev.vars
# Edit .dev.vars with your Google OAuth credentials

# Run
pnpm nx dev server   # API on :8787
pnpm nx dev web      # Frontend on :3000
```

## Environment Variables

| Variable | Description |
|---|---|
| `GOOGLE_CLIENT_ID` | Google OAuth client ID |
| `GOOGLE_CLIENT_SECRET` | Google OAuth client secret |
| `SESSION_SECRET` | Min 32-char secret for session hashing |
| `WEB_APP_URL` | Frontend URL (e.g., `http://localhost:3000`) |
| `ALLOWED_ORIGINS` | Comma-separated allowed CORS origins |

Cloudflare bindings (set in `wrangler.jsonc`):
- `DB` — D1 database
- `RATE_LIMIT_KV` — KV namespace for rate limiting (optional)

## Project Structure

```
saas-launchkit-core/
├── apps/
│   ├── web/           # Next.js 16 frontend
│   └── server/        # Hono.js API server
├── packages/
│   ├── auth/          # Google OAuth PKCE helpers
│   ├── http/          # Shared fetch/crypto utilities
│   ├── types/         # Shared TypeScript types
│   └── api-endpoints/ # API route constants
```

## Deploy

```bash
# Frontend
pnpm nx deploy web

# Server
pnpm nx deploy server
```

Requires `CLOUDFLARE_API_TOKEN` and `CLOUDFLARE_ACCOUNT_ID` environment variables.

## License

MIT — use it for anything.
