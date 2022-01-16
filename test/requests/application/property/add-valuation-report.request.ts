import { HttpServer } from "@nestjs/common";
import request from "supertest";

import valuationReportData from "../../../case/json/application_valuation_flow";
import { requestWithV1Headers } from "../../utils";

const addValuationReport = (
  caseId: string,
  propertyId: number,
  server: HttpServer,
  cb: request.CallbackHandler
): void => {
  valuationReportData.data.id = caseId;

  requestWithV1Headers(
    request(server).patch(
      `/cases/${caseId}/property/${propertyId}/valuation_report`
    )
  )
    .send(valuationReportData)
    .expect(200, cb);
};

export default addValuationReport;
