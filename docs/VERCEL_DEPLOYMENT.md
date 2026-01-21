# Vercel Deployment Guide (Frontend + Backend)

This guide walks through deploying **both** the NestJS backend and the Next.js frontend
as separate Vercel projects.

## Prerequisites

- Vercel CLI installed: `npm install -g vercel`
- A Vercel account + token for CI (`VERCEL_TOKEN`)
- Backend and frontend environment variables prepared

## 1) Backend (NestJS) on Vercel

The backend uses a Vercel serverless function entrypoint in `api/index.ts` with
`vercel.json` routing `/api/*` requests into the Nest app.

### Create a Vercel project

From the repo root:

```bash
vercel link
```

Choose or create a **backend** project.

### Configure environment variables

Set these in Vercel for the backend project (Preview + Production):

- `OPENAI_API_KEY` – required for the agent.
- `FRONTEND_URL` – the deployed frontend URL (ex: `https://your-frontend.vercel.app`).

If you rely on MCP OAuth servers (Gmail, Google Calendar), ensure your credentials and
any stored tokens are available in your deployment environment.

### Deploy

```bash
vercel --prod
```

The backend will be available at:

```
https://<backend-project>.vercel.app/api/health
```

## 2) Frontend (Next.js) on Vercel

The frontend lives in `frontend/` and is deployed as its own Vercel project.

### Create a Vercel project

```bash
vercel link --cwd frontend
```

Choose or create a **frontend** project.

### Configure environment variables

Set the following in Vercel for the frontend project:

- `NEXT_PUBLIC_API_BASE` – the backend base URL (ex: `https://your-backend.vercel.app`).

### Deploy

```bash
vercel --prod --cwd frontend
```

## 3) Deploy both using the helper script

A helper script is included for convenience:

```bash
./scripts/vercel-deploy.sh all --prod
```

You can also deploy only one side:

```bash
./scripts/vercel-deploy.sh backend --prod
./scripts/vercel-deploy.sh frontend --prod
```

## 4) Update CORS + API base

- Ensure the backend `FRONTEND_URL` matches your deployed frontend.
- Ensure the frontend `NEXT_PUBLIC_API_BASE` matches your backend base URL.

## Troubleshooting

- If deployments fail in CI, ensure `VERCEL_TOKEN` is set and `vercel link` has been run.
- The backend is serverless on Vercel; long-running tasks should be offloaded to a queue
  or background worker.
