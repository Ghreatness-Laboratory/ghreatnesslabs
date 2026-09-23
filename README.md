# TASOL Marine & Energy Services

A responsive Next.js corporate site for TASOL Marine Services Ltd, including public service, industry, project, HSE, leadership and contact routes plus a lightweight CMS-style administrator dashboard.

## Setup

```bash
npm install
npm run dev
```

Visit `http://localhost:3000`. Build production output with `npm run build`.

## CMS/data model

`data/content.json` is the initial lightweight content model. Quote/tender submissions are validated in `app/api/quotes/route.ts` and written as newline-delimited records to `data/submissions.ndjson`, which is designed to be surfaced by the dashboard inbox. The content components are centralized in `components/Site.tsx` for easy promotion to a managed CMS adapter.

## Admin dashboard

Open `/admin`. The demo login is:

- Email: `admin@tasolmarine.com`
- Password: `TasolAdmin2026!`

The login endpoint sets an httpOnly cookie. Before production, replace the demonstration credential check with a real identity provider and persistent database; use managed object storage for uploaded assets.
