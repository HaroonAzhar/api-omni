import faker from "faker";

import { ChangeSecuritiesDto } from "../../../../src/v2/modules/cases/dip/dtos/change-securities.dto";
import { opflChargeTypes } from "../../../../src/v2/modules/cases/dip/dip.interface";
import { securityTypes } from "../../../../src/v2/modules/cases/types/security-type/security-type.interface";

export const generateSecurityContent = (): ChangeSecuritiesDto => ({
  securities: Array.from({
    length: faker.random.number({ min: 1, max: 10 }),
  }).map(() => ({
    SecurityAddressLine1: faker.address.streetName(),
    SecurityAddressLine2: faker.address.secondaryAddress(),
    SecurityTownCity: faker.address.city(),
    SecurityPostcode: faker.address.zipCode(),
    SecurityCountry: faker.address.country(),
    SecurityInitialEstimation: faker.random.number({
      min: 0,
      precision: 10,
    }),
    SecurityType: faker.random.arrayElement(securityTypes),
    OpflType: faker.random.arrayElement(opflChargeTypes),
    Gdv: faker.random.number({
      min: 0,
      precision: 10,
    }),
    Estimated90DayGdv: faker.random.number({
      min: 0,
      precision: 10,
    }),
    CurrentEstimated90DayMarketValue: faker.random.number({
      min: 0,
      precision: 10,
    }),
    ValueExistingMortgage: faker.random.number({
      min: 0,
      precision: 10,
    }),
  })),
});
