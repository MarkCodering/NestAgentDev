# Tutorial: Build a Personal Assistant with NestJS, OpenAI Agents, and MCP

This tutorial walks through the demo project and explains how to turn it into a personal assistant
for your course. It focuses on three layers:

1. **Frontend (Next.js)** – a simple UI to collect a prompt and display the response.
2. **Backend (NestJS API)** – a minimal REST API that forwards prompts to an OpenAI Agent.
3. **MCP Tools** – Model Context Protocol servers that provide external context (calendar/email).

---

## 1) Project architecture

```
frontend/          Next.js demo UI
src/               NestJS API (agent + MCP client)
docs/              Course materials + tutorial notes
```

**Request flow**
1. The Next.js UI sends a prompt to `POST /api/assistant`.
2. NestJS calls the `NestAgent` service.
3. The agent calls MCP tools (Gmail, Google Calendar) to fetch context.
4. The agent returns a summary with next steps.

---

## 2) Local setup

### Backend
1. Copy the environment template and add your OpenAI key:
   ```bash
   cp .env.example .env
   ```
2. Start the API server:
   ```bash
   npm run start:dev
   ```

### Frontend
1. Copy the frontend environment template:
   ```bash
   cp frontend/.env.local.example frontend/.env.local
   ```
2. Install dependencies and run the UI:
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

---

## 3) How the NestJS API works

### `POST /api/assistant`
* **Input**: `{ "prompt": "Summarize my day" }`
* **Output**: `{ "reply": "..." }`

Internally, `AppService` forwards the prompt to `NestAgent.getResult()`. The agent is created
with instructions that explain how to call MCP tools and produce a concise summary.

### Key files
* `src/app.controller.ts` – REST endpoints.
* `src/app.service.ts` – API logic and agent invocation.
* `src/agent.service.ts` – OpenAI Agent initialization.
* `src/mcp-client.service.ts` – MCP tool configuration.

---

## 4) MCP tool configuration

The demo connects to two MCP servers:
* `@modelcontextprotocol/server-gmail`
* `@modelcontextprotocol/server-google-calendar`

When the API boots, it launches each MCP server via `npx` and loads their tools. You will
need to authenticate once for each server. In headless environments, run these commands
manually and complete the OAuth flow:

```bash
npx -y @modelcontextprotocol/server-gmail
npx -y @modelcontextprotocol/server-google-calendar
```

---

## 5) Course-ready talking points

Use the demo to teach:

* **Agent instructions**: show how small instruction changes affect tool usage.
* **Tool reliability**: demonstrate graceful fallbacks when MCP data is missing.
* **Context quality**: emphasize that high-quality context yields better answers.
* **Prompt shaping**: teach students to constrain and format prompts for predictable output.

---

## 6) Suggested live demo flow

1. Ask a generic question to show the baseline response.
2. Ask a calendar-specific question and highlight MCP calls in the logs.
3. Ask for a summary + next steps to show how instructions guide output style.
4. Disable one MCP server to show how the agent handles missing context.

---

## 7) Extending the assistant

* Add a CRM MCP server to prioritize customer messages.
* Add a Slack MCP server to surface important threads.
* Add a summary cache to avoid repetitive queries.

---

## 8) Troubleshooting

* **No reply** – check `OPENAI_API_KEY` and your internet connection.
* **MCP auth errors** – re-run the MCP server command to refresh tokens.
* **CORS errors** – ensure `FRONTEND_URL` matches the frontend address.

---

## 9) Next steps

* Add user identity so each student can see their own data.
* Add a schedule to send a morning briefing automatically.
* Add a “task suggestions” section in the UI.
