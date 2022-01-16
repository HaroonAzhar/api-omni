import faker from "faker";

import { Waypoint } from "../../../../src/v2/modules/cases/completed/waypoints/waypoint.interface";

export const getMinimalWaypoint = (date: string): Waypoint => ({
  DueDate: date,
  Name: faker.name.findName(),
  IsCompleted: false,
  Category: faker.random.word(),
});

export const getSampleWaypoint = (date: string): Waypoint => ({
  ...getMinimalWaypoint(date),
  DueTime: "1970-01-01T17:20:00.000Z",
  Notes: faker.random.words(1000),
});
