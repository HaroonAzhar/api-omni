import request from "supertest";
import { HttpServer } from "@nestjs/common";

import { requestWithV1Headers } from "./utils";

const getDip = (
  caseId: string,
  server: HttpServer,
  cb: request.CallbackHandler
): void => {
  requestWithV1Headers(request(server).get(`/cases/${caseId}/dip`)).expect(
    200,
    cb
  );
};

export default getDip;
