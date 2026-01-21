import { Injectable } from '@nestjs/common';
import { NestAgent } from './agent.service';

@Injectable()
export class AppService {
  constructor(private readonly agentService: NestAgent) { }

  getHealth() {
    return {
      status: 'ok',
      timestamp: new Date().toISOString(),
    };
  }

  async runAssistant(prompt: string) {
    return this.agentService.getResult(prompt);
  }
}
