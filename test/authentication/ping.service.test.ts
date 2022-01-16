import { Test, TestingModule } from "@nestjs/testing";
import moment from "moment";

import { PingService } from "../../src/v2/modules/ping/ping.service";

describe("PingService", () => {
  let service: PingService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PingService],
    }).compile();

    service = module.get<PingService>(PingService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  it("should return current time", () => {
    expect(moment(service.ping()).format()).toEqual(moment().format());
  });
});
