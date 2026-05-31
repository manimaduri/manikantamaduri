# Manikanta Maduri — Portfolio

A fast, SEO-strong, single Next.js app deployed on Vercel. Bold dark/violet
design, content-as-code, MDX blog, and a serverless contact form with bot
protection and rate limiting — **no separate backend, no database, no auth**.

## Stack

- **Next.js 16** (App Router) + **React 19** + **TypeScript**
- **Tailwind CSS v4** + **Framer Motion**
- **MDX** blog (content-as-code via `gray-matter` + `next-mdx-remote`)
- Contact form: **Server Action** → Cloudflare **Turnstile** + honeypot →
  **Upstash** rate limit → **Resend** email → **Google Sheets** log
- SEO: Metadata API, `sitemap.ts`, `robots.ts`, JSON-LD `Person`, dynamic OG
  images (`next/og`), Vercel Analytics

## Project structure

```
app/                 routes (home, /projects, /projects/[slug], /blog, /blog/[slug])
  actions/contact.ts contact Server Action pipeline
  api/og/route.tsx   dynamic OpenGraph images
content/data/*.ts    typed content (profile, projects, experience, skills, …)
content/blog/*.mdx   blog posts
components/          sections, projects, layout, ui primitives
lib/                 site config, contact helpers (email, sheets, ratelimit, turnstile)
public/              resume PDF + images
```

## Local development

```bash
npm install
npm run dev          # http://localhost:3000
```

No env vars are required for local dev — the contact pipeline degrades
gracefully when a service isn't configured (rate-limit allows, Turnstile skips,
email reports "not configured").

```bash
npm run build        # production build
npm run lint         # eslint
```

## Editing content

All content is code — edit a file and redeploy:

- **Projects** — `content/data/projects.ts` (add the real Play Store / repo /
  live URLs to each project's `links` array; cards only show links that exist)
- **Profile / socials** — `content/data/profile.ts` (set real GitHub & LinkedIn
  URLs — currently placeholders)
- **Experience / skills / education** — `content/data/*.ts`
- **Blog** — add an `.mdx` file under `content/blog/` with frontmatter
  (`title`, `summary`, `date`, `tags`)

## Deployment (Vercel)

1. Push to GitHub, import the repo in Vercel (framework auto-detected).
2. Set environment variables (see `.env.example`). All are optional but the
   contact form needs Resend (+ optionally Turnstile, Upstash, Sheets).
3. Set `NEXT_PUBLIC_SITE_URL` to your production URL.
4. After first deploy, add the site to **Google Search Console**, set
   `GOOGLE_SITE_VERIFICATION`, and submit `/sitemap.xml`.

### Contact form services (all free tier)

| Concern | Service | Env vars |
|---|---|---|
| Email | [Resend](https://resend.com) | `RESEND_API_KEY`, `CONTACT_FROM_EMAIL`, `CONTACT_TO_EMAIL` |
| Bot check | [Cloudflare Turnstile](https://www.cloudflare.com/products/turnstile/) | `NEXT_PUBLIC_TURNSTILE_SITE_KEY`, `TURNSTILE_SECRET_KEY` |
| Rate limit | [Upstash Redis](https://upstash.com) | `UPSTASH_REDIS_REST_URL`, `UPSTASH_REDIS_REST_TOKEN` |
| Sheet log | Google Apps Script webhook | `GOOGLE_SHEETS_WEBHOOK_URL` |

#### Google Sheets webhook (no service account)

Create an Apps Script bound to a Sheet, paste:

```js
function doPost(e) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];
  const d = JSON.parse(e.postData.contents);
  sheet.appendRow([d.timestamp, d.name, d.email, d.message]);
  return ContentService.createTextOutput("ok");
}
```

Deploy as a Web App (execute as you, access: anyone) and put the `/exec` URL in
`GOOGLE_SHEETS_WEBHOOK_URL`.


