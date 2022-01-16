import faker from "faker";

import { ChangeFinancialDetailsDto } from "../../../../src/v2/modules/cases/dip/dtos/change-financial-details.dto";

export const generateFinancialDetails = (): ChangeFinancialDetailsDto => ({
  MaxLtvDayOne: faker.random.number({ min: 1, max: 100 }),
  BuildPeriodMonths: faker.random.number({
    min: 1,
    max: 24,
  }),
  FurtherDrawDowns: faker.random.number({ min: 1 }),
  LtvToGdv: faker.random.number({ min: 1, max: 100 }),
  PurchasePrice: faker.random.number({ min: 1 }),
});
