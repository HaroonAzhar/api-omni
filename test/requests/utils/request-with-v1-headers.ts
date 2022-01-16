import request from "supertest";

const requestWithV1Headers = (aRequest: request.Test): request.Test =>
  aRequest
    .set("Accept", "application/vnd.api+json")
    .set("Content-Type", "application/vnd.api+json");

export default requestWithV1Headers;
