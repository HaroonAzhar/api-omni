import { Test, TestingModule } from "@nestjs/testing";
import moment from "moment";
import faker from "faker";

import {
  RecurringEvent,
  Waypoint,
} from "../../../../src/v2/modules/cases/completed/waypoints/waypoint.interface";
import {
  WaypointsRepositoryInterface,
  WaypointsService,
} from "../../../../src/v2/modules/cases/completed/waypoints/waypoints.service";
import { getSampleWaypoint } from "./waypoints-test-utils";
import { CompletedIdentificationService } from "../../../../src/v2/modules/cases/completed/completed-identification.service";
import { InMemoryRepository } from "../utils/in-memory-repository";

describe("WaypointsService", () => {
  let service: WaypointsService;

  const CompletedId = 10;
  const completedServiceStub = {
    getIdByCaseUuid: jest.fn(() => CompletedId),
  };

  const testRecurringWaypoints = async (
    service: WaypointsService,
    expectedDates: string[],
    recurringFrequency: RecurringEvent
  ) => {
    const uuid = faker.random.uuid();
    const waypoint: Waypoint = getSampleWaypoint(expectedDates[0]);

    const numberOfTimesToRepeat = expectedDates.length;
    await service.createWaypoint(
      uuid,
      waypoint,
      recurringFrequency,
      numberOfTimesToRepeat
    );

    const matchingWaypoints = await service.getWaypoints(uuid);

    expect(matchingWaypoints.length).toBe(numberOfTimesToRepeat);
    matchingWaypoints.forEach((matchingWaypoint, index) => {
      const expectedDate = moment(expectedDates[index]).format();
      expect(matchingWaypoint).toEqual(
        expect.objectContaining({
          ...waypoint,
          FkCompletedId: CompletedId,
          DueDate: expectedDate,
        })
      );
    });
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        WaypointsService,
        {
          provide: WaypointsRepositoryInterface,
          useFactory: () => new InMemoryRepository<Waypoint>(),
        },
        {
          provide: CompletedIdentificationService,
          useValue: completedServiceStub,
        },
      ],
    }).compile();

    service = module.get<WaypointsService>(WaypointsService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  it("Adds new waypoint with correct completed id", async () => {
    const uuid = "uuid";
    const waypoint: Waypoint = getSampleWaypoint("2020.12.08");

    await service.createWaypoint(uuid, waypoint, "not_recurring");

    const matchingWaypoints = await service.getWaypoints(uuid);

    expect(matchingWaypoints).toEqual([
      expect.objectContaining({ ...waypoint, FkCompletedId: CompletedId }),
    ]);
  });

  it("Generates weekly waypoints", async () => {
    const expectedDates = [
      "2020.12.08",
      "2020.12.15",
      "2020.12.22",
      "2020.12.29",
      "2021.01.05",
    ];
    await testRecurringWaypoints(service, expectedDates, "weekly");
  });

  it("Generates fortnightly waypoints", async () => {
    const expectedDates = ["2020.12.08", "2020.12.22", "2021.01.05"];
    await testRecurringWaypoints(service, expectedDates, "fortnightly");
  });

  it("Generates 4 weekly waypoints", async () => {
    const expectedDates = ["2020.12.08", "2021.01.05"];
    await testRecurringWaypoints(service, expectedDates, "4_weekly");
  });

  it("Generates monthly waypoints", async () => {
    const expectedDates = [
      "2020.12.08",
      "2021.01.08",
      "2021.02.08",
      "2021.03.08",
    ];
    await testRecurringWaypoints(service, expectedDates, "monthly");
  });

  it("Generates monthly waypoints at the end of the month", async () => {
    const expectedDates = [
      "2020.12.31",
      "2021.01.31",
      "2021.02.28",
      "2021.03.31",
      "2021.04.30",
    ];
    await testRecurringWaypoints(service, expectedDates, "monthly");
  });
});
