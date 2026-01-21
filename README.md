# Personal Assistant Demo (NestJS + MCP + Next.js)

This repository is a minimal, course-ready demo that pairs a NestJS API with a Next.js
frontend. It shows how to use OpenAI Agents and Model Context Protocol (MCP) tools to build
a personal assistant that summarizes email + calendar context.

## What you get

- **NestJS API** with a simple `/api/assistant` endpoint.
- **OpenAI Agent** wired to MCP tools (Gmail + Google Calendar).
- **Next.js UI** for running prompts and viewing responses.
- **Course materials** and an outline to support your online course.

## Architecture at a glance

```
frontend/          Next.js UI
src/               NestJS API (agent + MCP client)
docs/              Tutorial + course outline
```

## Quick start

### 1) Backend (NestJS)

```bash
cp .env.example .env
npm run start:dev
```

The API runs on `http://localhost:3000` by default.

### 2) Frontend (Next.js)

```bash
cp frontend/.env.local.example frontend/.env.local
cd frontend
npm install
npm run dev
```

The UI runs on `http://localhost:3001` by default.

## API endpoints

### `GET /api/health`
Returns a small status payload.

### `POST /api/assistant`
Send a prompt to the agent.

```json
{
  "prompt": "Summarize my day and list next steps."
}
```

Response:

```json
{
  "reply": "..."
}
```

## MCP setup notes

The MCP client in `src/mcp-client.service.ts` launches two MCP servers via `npx`:

- `@modelcontextprotocol/server-gmail`
- `@modelcontextprotocol/server-google-calendar`

These servers require OAuth credentials. If you are running in a headless environment,
run each server once manually to complete the OAuth flow:

```bash
npx -y @modelcontextprotocol/server-gmail
npx -y @modelcontextprotocol/server-google-calendar
```

## Documentation

- **Tutorial:** `docs/AGENT_TUTORIAL.md`
- **Course outline:** `docs/COURSE_OUTLINE.md`

## Suggested demo prompts

- “Summarize my morning calendar and draft a short prep checklist.”
- “Check my inbox for urgent messages and suggest next steps.”
- “Give me a brief daily briefing for today in three bullets.”

## Environment variables

Copy `.env.example` and update:

- `OPENAI_API_KEY` – your API key for OpenAI Agents.
- `API_PORT` – the NestJS port (default `3000`).
- `FRONTEND_URL` – allowed CORS origin (default `http://localhost:3001`).

Copy `frontend/.env.local.example` and update:

- `NEXT_PUBLIC_API_BASE` – API base URL (default `http://localhost:3000`).
