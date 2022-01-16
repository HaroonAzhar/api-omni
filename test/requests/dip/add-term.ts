import { HttpServer } from "@nestjs/common";
import request from "supertest";

import { requestWithV1Headers } from "../utils";

const addTerm = (
  caseId: string,
  server: HttpServer,
  cb: request.CallbackHandler
): void => {
  const data = {
    data: {
      type: "dip_form",
      id: "50aeb401-1c67-4bf1-a20a-44ab778c015b",
      attributes: {
        dip: {
          loan_term: "12",
          type_of_loan: "retained",
          loan_purpose: "purchase",
        },
        step_id: "loan_details_form",
      },
    },
  };
  requestWithV1Headers(request(server).patch(`/cases/${caseId}/dip`))
    .send(data)
    .expect(200, cb);
};

export default addTerm;
