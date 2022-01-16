import { HttpServer } from "@nestjs/common";
import request from "supertest";

const convertToCompleted = (
  caseId: string,
  server: HttpServer,
  cb: request.CallbackHandler,
  DateOfCompletion: string = "2020-12-07"
): void => {
  request(server)
    .post(`/cases/${caseId}/stage`)
    .send({ Stage: "completed", DateOfCompletion })
    .expect(201, cb);
};

export default convertToCompleted;
