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
                name: 'Gmail and Calendar Review Agent',
                instructions:
                    'You are a helpful assistant that reviews emails and calendar events. Use the provided tools to fetch information from Gmail and Google Calendar. Provide a concise summary of important items. If you see upcoming meetings, list them. If you see urgent emails, highlight them.',
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
