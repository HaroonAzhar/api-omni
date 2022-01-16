import { Test, TestingModule } from "@nestjs/testing";
import { HttpServer, INestApplication } from "@nestjs/common";
import request from "supertest";
import { waterfall } from "async";

import { AppModule } from "../../../../src/v2/modules/app/app.module";
import connectWithCurrentApp from "../../../../src/nest/connectWithCurrentApp";
import { BaseModel } from "../../../../src/models/BaseModel";
import db from "../../../../src/db";
import { Note } from "../../../../src/v2/modules/cases/completed/notes/note.interface";

const createCase = (server: HttpServer, cb: request.CallbackHandler) =>
  request(server)
    .post("/cases")
    .set("Accept", "application/vnd.api+json")
    .set("Content-Type", "application/vnd.api+json")
    .expect(200, cb);

describe("Note (e2e)", () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    BaseModel.registerKnex(db);
    connectWithCurrentApp(app);
    await app.init();
  });

  it("Note (POST GET PATCH DELETE)", async (done) => {
    const note = { Text: "text" };
    const noteDto = {
      ...note,
    };
    const modifiedNote: Note = { Text: "modified text" };
    let caseId: string;
    let noteId: number;
    const server = app.getHttpServer();
    return waterfall(
      [
        (cb: request.CallbackHandler) => createCase(server, cb),
        (results: request.Response, cb: request.CallbackHandler) => {
          caseId = results.body.data.id;
          cb(null, results);
        },
        (results: request.Response, cb: request.CallbackHandler) =>
          request(server)
            .post(`/cases/${caseId}/stage`)
            .send({ Stage: "completed", DateOfCompletion: "2020.12.07" })
            .expect(201, cb),
        (results: request.Response, cb: request.CallbackHandler) =>
          request(server)
            .post(`/cases/${caseId}/completed/notes`)
            .send(noteDto)
            .expect(201, cb),
        (results: request.Response, cb: request.CallbackHandler) =>
          request(server)
            .get(`/cases/${caseId}/completed/notes`)
            .expect(200, cb),
        (results: request.Response, cb: request.CallbackHandler) => {
          const createdNote = results.body[results.body.length - 1];
          expect(createdNote).toEqual(expect.objectContaining(note));
          noteId = createdNote.NoteId;
          cb(null, results);
        },

        (results: request.Response, cb: request.CallbackHandler) =>
          request(server)
            .patch(`/cases/${caseId}/completed/notes/${noteId}`)
            .send(modifiedNote)
            .expect(200, cb),
        (results: request.Response, cb: request.CallbackHandler) =>
          request(server)
            .get(`/cases/${caseId}/completed/notes`)
            .expect(200, cb),
        (results: request.Response, cb: request.CallbackHandler) => {
          const modifiedWaypoint = results.body[results.body.length - 1];
          expect(modifiedWaypoint).toEqual(
            expect.objectContaining({
              ...modifiedNote,
              NoteId: noteId,
            })
          );
          cb(null, results);
        },

        (results: request.Response, cb: request.CallbackHandler) =>
          request(server)
            .delete(`/cases/${caseId}/completed/notes/${noteId}`)
            .expect(200, cb),
        (results: request.Response, cb: request.CallbackHandler) =>
          request(server)
            .get(`/cases/${caseId}/completed/notes`)
            .expect(200, cb),
        (results: request.Response, cb: request.CallbackHandler) => {
          expect(results.body.length).toBe(0);
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
