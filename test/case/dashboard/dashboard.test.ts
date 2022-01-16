import { Test, TestingModule } from "@nestjs/testing";
import { INestApplication } from "@nestjs/common";
import request from "supertest";

import { AppModule } from "../../../src/v2/modules/app/app.module";

describe("Dashboard Flow", () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it("should return proper dashboard data", (done) => {
    const server = app.getHttpServer();
    request(server)
      .get("/cases")
      .set("Accept", "application/vnd.api+json")
      .set("Content-Type", "application/vnd.api+json")
      .send()
      .end((err, res) => {
        if (err) done(err);

        const { body } = res;
        expect(body.length).toBeGreaterThan(0);

        const [sampleCase] = body;
        expect(sampleCase).toHaveProperty("Applicants");
        expect(sampleCase).toHaveProperty("CaseNr");
        expect(sampleCase).toHaveProperty("CreatedAt");
        expect(sampleCase).toHaveProperty("GrossTotalLoanAmount");
        expect(sampleCase).toHaveProperty("LoanTerm");
        expect(sampleCase).toHaveProperty("securities");

        expect(sampleCase).toHaveProperty("Stage");
        expect(sampleCase).toHaveProperty("Status");

        done();
      });
  });
});
