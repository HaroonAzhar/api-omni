import { HttpServer } from "@nestjs/common";
import request from "supertest";

import { data as casePropertyData } from "../../../case/json/update_case_property";
import { requestWithV1Headers } from "../../utils";

const addProperties = (
  caseId: string,
  server: HttpServer,
  cb: request.CallbackHandler
): void => {
  casePropertyData.data.id = caseId;

  requestWithV1Headers(request(server).post(`/cases/${caseId}/property`))
    .send(casePropertyData)
    .expect(200, cb);
};

export default addProperties;
