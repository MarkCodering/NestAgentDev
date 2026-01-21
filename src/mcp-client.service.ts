import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { MCPServerStdio, getAllMcpTools, MCPServer } from '@openai/agents';

@Injectable()
export class McpClientService implements OnModuleInit, OnModuleDestroy {
    private servers: MCPServer[] = [];

    async onModuleInit() {
        const serverConfigs = [
            {
                name: 'gmail',
                command: 'npx',
                args: ['-y', '@modelcontextprotocol/server-gmail'],
            },
            {
                name: 'google-calendar',
                command: 'npx',
                args: ['-y', '@modelcontextprotocol/server-google-calendar'],
            },
        ];

        for (const config of serverConfigs) {
            const server = new MCPServerStdio({
                name: config.name,
                command: config.command,
                args: config.args,
            });

            try {
                await server.connect();
                this.servers.push(server);
                console.log(`Connected to MCP server: ${config.name}`);
            } catch (error) {
                console.error(`Failed to connect to MCP server ${config.name}:`, error);
            }
        }
    }

    async onModuleDestroy() {
        for (const server of this.servers) {
            await server.close();
        }
    }

    async getTools() {
        if (this.servers.length === 0) return [];
        return await getAllMcpTools(this.servers);
    }
}
