import { Test, TestingModule } from '@nestjs/testing';
import { AssistantController } from './assistant.controller';
import { AssistantService } from './assistant.service';

describe('AssistantController', () => {
  let app: TestingModule;

  beforeAll(async () => {
    app = await Test.createTestingModule({
      controllers: [AssistantController],
      providers: [
        {
          provide: AssistantService,
          useValue: {
            runAssistant: jest.fn().mockResolvedValue('demo reply'),
          },
        },
      ],
    }).compile();
  });

  it('returns the assistant reply payload', async () => {
    const controller = app.get(AssistantController);
    await expect(
      controller.getUserPrompt({ prompt: 'hello' }),
    ).resolves.toEqual({ reply: 'demo reply' });
  });
});
