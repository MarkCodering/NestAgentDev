import { Injectable, OnModuleInit } from "@nestjs/common";
import { Agent, run } from '@openai/agents';
import { McpClientService } from "./mcp-client.service";

@Injectable()
export class NestAgent implements OnModuleInit {
    private agent: Agent;

    constructor(private readonly mcpClient: McpClientService) { }

    async onModuleInit() {
        // We initialize the agent lazily or after a short delay to ensure MCP servers are connected
        await this.initializeAgent();
    }

    private async initializeAgent() {
        try {
            const tools = await this.mcpClient.getTools();

            this.agent = new Agent({
                name: 'Personal Assistant Demo Agent',
                instructions:
                    'You are a helpful personal assistant. Use the provided MCP tools to fetch calendar and email context. Provide concise summaries, highlight urgent items, and suggest next actions. If data is unavailable, explain what is missing and ask a clarifying question.',
                tools: tools
            });
            console.log("Agent initialized with MCP tools");
        } catch (error) {
            console.error("Failed to initialize agent with MCP tools:", error);
        }
    }

    async getResult(prompt: string): Promise<string> {
        if (!this.agent) {
            await this.initializeAgent();
            if (!this.agent) {
                return "Agent is still initializing or failed to connect to MCP servers. Please check logs.";
            }
        }
        const result = await run(this.agent, prompt);
        return result.finalOutput;
    }
}
