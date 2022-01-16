import { Test, TestingModule } from "@nestjs/testing";
import { INestApplication, ValidationPipe } from "@nestjs/common";
import request from "supertest";
import { waterfall } from "async";
import * as faker from "faker";

import { AppModule } from "../../src/v2/modules/app/app.module";
import { CreateStoredCashflowDto } from "../../src/v2/modules/stored-cashflows/dtos/create-stored-cashflow.dto";

describe("Stored Cashflows (e2e)", () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();
  });

  it("/storedCashflow (GET)", async (done) => {
    const server = app.getHttpServer();
    const storedCashflowSend: CreateStoredCashflowDto = {
      Amount: +faker.finance.amount(),
      FkFundId: 1,
      TransactionDate: faker.date
        .between("2021-07-10", "2021-08-10")
        .toISOString(),
    };

    return waterfall(
      [
        (cb: request.CallbackHandler) =>
          request(server)
            .post("/storedCashflows")
            .send(storedCashflowSend)
            .expect(201, cb),

        (results: request.Response, cb: request.CallbackHandler) =>
          request(server)
            .get("/storedCashflows?dateMin=2021-07-10&dateMax=2021-08-10")
            .expect(200, cb),
        (results: request.Response, cb: request.CallbackHandler) => {
          expect(results.body.length).toBeGreaterThan(0);

          expect(results.body).toEqual(
            expect.arrayContaining([
              expect.objectContaining(storedCashflowSend),
            ])
          );

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
