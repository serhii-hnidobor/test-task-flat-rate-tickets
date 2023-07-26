import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { INestApplication } from '@nestjs/common';
import { AppModule } from './app.module';

describe('AppController', () => {
  let appController: AppController;
  let app: INestApplication;

  beforeEach(async () => {
    const appTestingModule: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
      controllers: [AppController],
    }).compile();

    app = appTestingModule.createNestApplication();

    await app.init();

    appController = appTestingModule.get<AppController>(AppController);
  });

  afterAll(async () => {
    await app.close();
  });

  describe('should be available', () => {
    it('server health must be ok', () => {
      expect(appController.health()).toBe('ok');
    });
  });

  describe('should be defined', () => {
    expect(appController);
  });
});
