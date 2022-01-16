import { HttpServer } from "@nestjs/common";
import request from "supertest";

const convertToDip = (
  caseId: string,
  server: HttpServer,
  cb: request.CallbackHandler
): void => {
  request(server)
    .post(`/cases/${caseId}/stage`)
    .send({ Stage: "dip" })
    .expect(201, cb);
};

export default convertToDip;
