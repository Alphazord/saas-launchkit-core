export const BRANDING = {
  name: process.env.NEXT_PUBLIC_APP_NAME || "SaaS LaunchKit Core",
  tagline: "Free, production-grade auth scaffold. Google OAuth PKCE, session management, and a dashboard — ready to deploy on Cloudflare Workers.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
} as const;
