import { Body, Controller, Get, Post, BadRequestException } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get('/api/health')
  getHealth() {
    return this.appService.getHealth();
  }

  @Post('/api/assistant')
  async getUserPrompt(@Body() body: { prompt?: string }) {
    if (!body?.prompt) {
      throw new BadRequestException('Prompt is required.');
    }
    const reply = await this.appService.runAssistant(body.prompt);
    return {
      reply,
    };
  }
}
