import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { NestAgent } from './agent.service';

describe('AppController', () => {
  let app: TestingModule;

  beforeAll(async () => {
    app = await Test.createTestingModule({
      controllers: [AppController],
      providers: [
        AppService,
        {
          provide: NestAgent,
          useValue: {
            getResult: jest.fn().mockResolvedValue('demo reply'),
          },
        },
      ],
    }).compile();
  });

  describe('getHealth', () => {
    it('should return a health payload', () => {
      const appController = app.get(AppController);
      expect(appController.getHealth()).toEqual({
        status: 'ok',
        timestamp: expect.any(String),
      });
    });
  });
});
