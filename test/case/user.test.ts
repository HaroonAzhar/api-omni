import request from "supertest";

import app from "../../src/app";

describe("Users", () => {
  it("/users (GET)", () => {
    request(app).get("/user").expect(200);
  });
});
