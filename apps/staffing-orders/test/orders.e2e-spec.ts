import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';

import { AppModule } from './../src/app.module';
import request from 'supertest';

type OrderResponseTest = {
  id: number;
  userId: string;
  product: string;
  quantity: number;
  status: string;
};

type PaginatedOrdersResponse = {
  data: OrderResponseTest[];
  total: number;
  page: number;
  limit: number;
};
describe('Orders Flow (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();

    app.useGlobalPipes(new ValidationPipe());

    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  describe('/orders (POST)', () => {
    const apiKey = 'super-secret-key-min-32-chars';

    it('should fail if API Key is missing (401)', () => {
      return request(app.getHttpServer())
        .post('/orders')
        .send({
          product: 'Dell',
          description: 'Test Description',
          quantity: 5,
        })
        .expect(401);
    });

    it('should create an order successfully with valid API Key (201)', async () => {
      const orderPayload = {
        product: 'Dell',
        description: 'Laptop para desarrollo',
        quantity: 1,
        userId: '123',
      };

      const response = await request(app.getHttpServer())
        .post('/orders')
        .set('x-api-key', apiKey)
        .send(orderPayload)
        .expect(201);

      expect(response.body).toMatchObject({
        product: orderPayload.product,
        status: 'PENDING',
      });

      // Tipado después de validar
      const body = response.body as OrderResponseTest;

      expect(body.id).toBeDefined();
      expect(body.product).toBe(orderPayload.product);
      expect(body.status).toBe('PENDING');
    });

    it('should return 400 if quantity is invalid', () => {
      return request(app.getHttpServer())
        .post('/orders')
        .set('x-api-key', apiKey)
        .send({
          customerName: 'Test',
          quantity: -1,
        })
        .expect(400);
    });
  });

  describe('/orders?page=1&limit=10 (GET)', () => {
    it('should return paginated orders', async () => {
      const response = await request(app.getHttpServer())
        .get('/orders?page=1&limit=10')
        .set('x-api-key', 'super-secret-key-min-32-chars')
        .expect(200);

      const body = response.body as PaginatedOrdersResponse;
      console.log(response.body);

      expect(body).toHaveProperty('data');
      expect(body).toHaveProperty('total');
      expect(typeof body.total).toBe('number');
    });
  });
});
