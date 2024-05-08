import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer()).get('/').expect(404);
  });

  describe('Login Test', () => {
    it('return 401 status', () => {
      return request(app.getHttpServer()).post('/auth/login').expect(401);
    });

    it('return valid jwt token', () => {
      return request(app.getHttpServer())
        .post('/auth/login')
        .send({ username: 'admin', password: 'password' })
        .expect(201);
    });
  });

  describe('Claims Test', () => {
    it('return 401 status', () => {
      return request(app.getHttpServer()).get('/claims').expect(401);
    });
    it('return All claims', () => {
      return request(app.getHttpServer())
        .post('/auth/login')
        .send({ username: 'admin', password: 'password' })
        .then((response) => {
          const token = response.text;
          return request(app.getHttpServer())
            .get('/claims')
            .set({ authorization: `Bearer ${token}` })
            .expect(200);
        });
    });

    it('should return bad request when creating new claim', () => {
      return request(app.getHttpServer())
        .post('/auth/login')
        .send({ username: 'admin', password: 'password' })
        .then((response) => {
          const token = response.text;
          return request(app.getHttpServer())
            .post('/claims')
            .set({ authorization: `Bearer ${token}` })
            .send({ testField: 'test' })
            .expect(400);
        });
    });

    it('should create a new claim', () => {
      return request(app.getHttpServer())
        .post('/auth/login')
        .send({ username: 'admin', password: 'password' })
        .then((response) => {
          const token = response.text;
          return request(app.getHttpServer())
            .post('/claims')
            .set({ authorization: `Bearer ${token}` })
            .send({
              status: 'pending',
              owner: 'testaaa@gmail.com',
              policyId: 'test10',
              ammount: 1500,
              policyHolder: 'test',
              policyType: 'motor',
            })
            .expect(201);
        });
    });
  });
});
