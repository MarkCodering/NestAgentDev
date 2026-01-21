import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { NestAgent } from './agent.service';
import { TaskService } from './task.service';
import { McpClientService } from './mcp-client.service';

@Module({
  imports: [
    ScheduleModule.forRoot()
  ],
  controllers: [AppController],
  providers: [
    AppService,
    NestAgent,
    TaskService,
    McpClientService
  ],
})
export class AppModule { }
