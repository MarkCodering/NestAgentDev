import { Body, Controller, Post } from '@nestjs/common';
import { AssistantService } from './assistant.service';
import { AssistantRequestDto } from './dto/assistant-request.dto';

@Controller('/api/assistant')
export class AssistantController {
  constructor(private readonly assistantService: AssistantService) { }

  @Post()
  async getUserPrompt(@Body() body: AssistantRequestDto) {
    const reply = await this.assistantService.runAssistant(body.prompt);
    return {
      reply,
    };
  }
}
