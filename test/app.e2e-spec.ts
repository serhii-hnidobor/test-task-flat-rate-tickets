import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import objectHasFields from '../src/utils/object-has-fields';

const gql = '/graphql';
const ticketsControllerPrefix = '/tickets';

describe('App (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(() => app.close());

  it('/health (GET)', () => {
    request(app.getHttpServer()).get('/health').expect(200).expect('ok');
  });

  it('should get the tickets data list (graphql)', () => {
    return request(app.getHttpServer())
      .post(gql)
      .send({
        query:
          'query GetTickets { getEventTicket(eventId:1195) { price, seat, section, row, } }',
      })
      .expect(200)
      .expect((res) => {
        const isAllTicketsDataMathSchema = res.body.data.getEventTicket.every(
          (ticketsData: object) =>
            objectHasFields(ticketsData, ['section', 'seat', 'price', 'row']),
        );

        expect(isAllTicketsDataMathSchema).toEqual(true);
      })
      .timeout(120000);
  }, 120000);

  it('should have 404 error if event id invalid (graphql)', () => {
    return request(app.getHttpServer())
      .post(gql)
      .send({
        query:
          'query GetTickets { getEventTicket(eventId:100000001) { price, seat, section, row, } }',
      })
      .expect(200)
      .expect((res) => {
        expect(res.body.data).toBe(null);
        expect(res.body.errors[0].extensions.status).toBe(404);
      })
      .timeout(120000);
  }, 120000);

  it('should get the tickets data list (http)', () => {
    return request(app.getHttpServer())
      .get(`${ticketsControllerPrefix}/1196`)
      .expect(200)
      .expect((res) => {
        const isAllTicketsDataMathSchema = res.body.every(
          (ticketsData: object) =>
            objectHasFields(ticketsData, ['section', 'seat', 'price', 'row']),
        );

        expect(isAllTicketsDataMathSchema).toEqual(true);
      })
      .timeout(120000);
  }, 120000);

  it('should have 404 error if event id invalid (http)', () => {
    return request(app.getHttpServer())
      .get(`${ticketsControllerPrefix}/1000001`)
      .expect(404)
      .timeout(120000);
  }, 120000);
});
