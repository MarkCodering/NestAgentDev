import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import { validateEnv } from './config/env.validation';
import { NestAgent } from './agent.service';
import { TaskService } from './task.service';
import { McpClientService } from './mcp-client.service';
import { AssistantModule } from './assistant/assistant.module';
import { HealthModule } from './health/health.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validate: validateEnv,
    }),
    ScheduleModule.forRoot(),
    AssistantModule,
    HealthModule,
  ],
  providers: [
    NestAgent,
    TaskService,
    McpClientService
  ],
})
export class AppModule { }
