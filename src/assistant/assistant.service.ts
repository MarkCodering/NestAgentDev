import { Injectable } from '@nestjs/common';
import { NestAgent } from '../agent.service';

@Injectable()
export class AssistantService {
  constructor(private readonly agentService: NestAgent) { }

  async runAssistant(prompt: string) {
    return this.agentService.getResult(prompt);
  }
}
