import { HttpServer } from "@nestjs/common";
import request from "supertest";

const convertToCaseSummary = (
  caseId: string,
  server: HttpServer,
  cb: request.CallbackHandler
): void => {
  request(server)
    .post(`/cases/${caseId}/stage`)
    .send({ Stage: "case_summary" })
    .expect(201, cb);
};

export default convertToCaseSummary;
