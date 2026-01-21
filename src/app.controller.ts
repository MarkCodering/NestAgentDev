import { Controller, Get, Post, Body } from '@nestjs/common';
import { AppService } from './app.service';
import { NestAgent } from './agent.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService,
    private agentService: NestAgent
  ) { }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post()
  getUserPrompt(@Body() userPrompt: string): Promise<string> {
    return this.agentService.getResult(userPrompt)
  }
}
