# Gmail and Google Calendar Agent (NestJS + MCP)

This project implements an AI agent that automatically reviews your Google Calendar and Gmail three times a day using the Model Context Protocol (MCP).

## How it works
- **McpClientService**: Connects to the official Google Calendar and Gmail MCP servers via Stdio.
- **NestAgent**: An agent built with `@openai/agents` that dynamically loads tools from the MCP servers.
- **TaskService**: Uses `@nestjs/schedule` to run a scheduled review at 9:00 AM, 1:00 PM, and 6:00 PM daily.

## Setup Requirements

### 1. Google Cloud Project
You need to have a Google Cloud Project with the **Gmail API** and **Google Calendar API** enabled.

### 2. Credentials
The MCP servers (`@modelcontextprotocol/server-gmail` and `@modelcontextprotocol/server-google-calendar`) expect credentials to be configured.
Typically, you need to:
1. Create OAuth 2.0 Client IDs in the Google Cloud Console.
2. Download the `credentials.json`.
3. The first time the agent runs, it may need to perform an OAuth flow. 

**Note:** If you are running this in a headless environment, you might need to run the `npx` commands manually once to complete the authentication:
```bash
npx -y @modelcontextprotocol/server-gmail
npx -y @modelcontextprotocol/server-google-calendar
```

### 3. Environment Variables
Ensure you have the necessary environment variables for your AI model (e.g., `OPENAI_API_KEY`) if you are using OpenAI as the provider.

## Execution
The agent will start automatically when the NestJS application starts.
You can also trigger a manual review by sending a POST request to `http://localhost:3000/` with a prompt.

```bash
npm run start:dev
```
