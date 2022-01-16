import { Test, TestingModule } from "@nestjs/testing";
import { INestApplication, ValidationPipe } from "@nestjs/common";
import request from "supertest";
import { waterfall } from "async";

import { AppModule } from "../../src/v2/modules/app/app.module";

describe("Available Funding (e2e)", () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();
  });

  it("/availableFunding (GET)", async (done) => {
    const server = app.getHttpServer();

    return waterfall(
      [
        (cb: request.CallbackHandler) =>
          request(server)
            .get("/availableFunding?dateMin=2021-07-10&dateMax=2021-08-10")
            .expect(200, cb),
        (results: request.Response, cb: request.CallbackHandler) => {
          expect(results.body).toBeDefined();
          const {
            expectedCompletions,
            expectedDrawdowns,
            estimatedRedemptions,
            serviceInterestPayments,
            storedCashflows,
          } = results.body;
          expect(expectedDrawdowns).toBeDefined();
          expect(estimatedRedemptions).toBeDefined();
          expect(serviceInterestPayments).toBeDefined();
          expect(expectedCompletions).toBeDefined();
          expect(storedCashflows).toBeDefined();

          cb(null, results);
        },

        () => {
          done();
        },
      ],
      (error) => {
        if (error) done(error);
      }
    );
  });
  afterAll(async () => {
    await app.close();
  });
});
