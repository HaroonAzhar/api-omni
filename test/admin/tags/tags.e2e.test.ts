import { Test, TestingModule } from "@nestjs/testing";
import { INestApplication, ValidationPipe } from "@nestjs/common";
import request from "supertest";
import { waterfall } from "async";
import faker from "faker";

import { AppModule } from "../../../src/v2/modules/app/app.module";
import { TagEntity } from "../../../src/v2/modules/admin/tags/tags.service";
import { Tag } from "../../../src/v2/modules/admin/tags/tag.interface";

describe("Tags (e2e)", () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();
  });

  it("/tags (POST GET PATCH DELETE)", async (done) => {
    let initialLength = 0;
    let tag: Tag;
    const name = faker.random.word();
    const color: string = faker.internet.color();
    const newName = faker.random.word();
    const newColor: string = faker.internet.color();

    const server = app.getHttpServer();
    return waterfall(
      [
        (cb: request.CallbackHandler) =>
          request(server)
            .post("/tags")
            .send({ Name: name, ColorCode: color })
            .expect(201, cb),
        (results: request.Response, cb: request.CallbackHandler) =>
          request(server).get("/tags").expect(200, cb),
        (results: request.Response, cb: request.CallbackHandler) => {
          expect(results.body.length).toBeGreaterThan(0);
          initialLength = results.body.length;
          tag = results.body[initialLength - 1];
          expect(tag.Name).toBe(name);
          expect(tag.ColorCode).toBe(color);
          cb(null, results);
        },
        (results: request.Response, cb: request.CallbackHandler) =>
          request(server)
            .patch(`/tags/${tag.Id}`)
            .send({ Name: newName })
            .expect(200, cb),
        (results: request.Response, cb: request.CallbackHandler) =>
          request(server)
            .patch(`/tags/${tag.Id}`)
            .send({ ColorName: newColor })
            .expect(200, cb),
        (results: request.Response, cb: request.CallbackHandler) =>
          request(server)
            .patch(`/tags/${tag.Id}`)
            .send({ Name: newName, ColorCode: newColor })
            .expect(200, cb),
        (results: request.Response, cb: request.CallbackHandler) =>
          request(server).get("/tags").expect(200, cb),
        (results: request.Response, cb: request.CallbackHandler) => {
          const tagsWithMatchingId = results.body.filter(
            (resultTag: TagEntity) => resultTag.Id === tag.Id
          );
          expect(tagsWithMatchingId.length).toBe(1);
          expect(tagsWithMatchingId[0].Name).toBe(newName);
          expect(tagsWithMatchingId[0].ColorCode).toBe(newColor);

          cb(null, results);
        },
        (results: request.Response, cb: request.CallbackHandler) =>
          request(server).delete(`/tags/${tag.Id}`).expect(200, cb),
        (results: request.Response, cb: request.CallbackHandler) =>
          request(server).get("/tags").expect(200, cb),
        (results: request.Response, cb: request.CallbackHandler) => {
          expect(results.body.length).toBeLessThan(initialLength);
          const tagsWithMatchingId = results.body.filter(
            (resultTag: TagEntity) => resultTag.Id === tag.Id
          );
          expect(tagsWithMatchingId.length).toBe(0);

          cb(null, results);

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
