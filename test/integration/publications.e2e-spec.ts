/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus, INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../../src/app.module';
import { PrismaService } from '../../src/prisma/prisma.service';
import { createMedia } from '../factories/medias-factory';
import { faker } from '@faker-js/faker';
import { createPublication } from '../factories/publications-facotry';
import { cleanDb } from '../helpers';
import {
  createPostWithImage,
  createPostWithoutImage,
} from '../factories/posts-factory';

describe('Publications', () => {
  let app: INestApplication;
  let server: request.SuperTest<request.Test>;
  const prisma: PrismaService = new PrismaService();
  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(PrismaService)
      .useValue(prisma)
      .compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());

    await cleanDb(prisma);

    server = request(app.getHttpServer());
    await app.init();
  });

  const baseRoute = '/publications';

  describe('POST /', () => {});

  describe('GET /', () => {});

  describe('GET /:id', () => {
    it('should respond with status code 400 if id is invalid', async () => {
      const { statusCode } = await server.get(`${baseRoute}/invalidId`);

      expect(statusCode).toBe(HttpStatus.BAD_REQUEST);
    });

    it('should respond with status code 404 if id dosent exist', async () => {
      const { statusCode } = await server.get(`${baseRoute}/1`);

      expect(statusCode).toBe(HttpStatus.NOT_FOUND);
    });

    it('should respond with publication of specific id', async () => {
      const publication = await createPublication(prisma);
      const { statusCode, body } = await server.get(
        `${baseRoute}/${publication.id}`,
      );

      expect(statusCode).toBe(HttpStatus.OK);
      expect(body).toEqual(publication);
    });
  });

  describe('PUT /:id', () => {});

  describe('DELETE /:id', () => {});
});
