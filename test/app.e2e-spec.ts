import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus, INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let server: request.SuperTest<request.Test>;
  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();

    server = request(app.getHttpServer());
    await app.init();
  });

  it('/health (GET)', () => {
    return server.get('/health').expect(HttpStatus.OK).expect('I’m okay!');
  });
});
