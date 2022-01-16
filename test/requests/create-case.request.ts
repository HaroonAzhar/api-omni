import request from "supertest";
import { HttpServer } from "@nestjs/common";

import { requestWithV1Headers } from "./utils";

const createCase = (server: HttpServer, cb: request.CallbackHandler): void => {
  requestWithV1Headers(request(server).post("/cases")).expect(200, cb);
};

export default createCase;
