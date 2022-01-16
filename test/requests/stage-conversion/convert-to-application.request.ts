import { HttpServer } from "@nestjs/common";
import request from "supertest";

import { requestWithV1Headers } from "../utils";

const convertToApplication = (
  caseId: string,
  server: HttpServer,
  cb: request.CallbackHandler
): void => {
  const data = {
    data: {
      type: "dip_form",
      id: caseId,
      attributes: {
        step_id: "convert_to_application",
      },
    },
  };

  requestWithV1Headers(request(server).patch(`/cases/${caseId}`))
    .send(data)
    .expect(200, cb);
};

export default convertToApplication;
