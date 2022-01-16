import faker from "faker";

import { CreateEnquiry } from "../../../src/v2/modules/cases/enquiry/enquiry.interface";
import { securityTypes } from "../../../src/v2/modules/cases/types/security-type/security-type.interface";
import { loanTypes } from "../../../src/v2/modules/cases/types/loan-type/loan-type.interface";

export const getRandomEnquiry = (): CreateEnquiry => ({
  EnquiryName: faker.name.findName(),
  FkOriginatorId: 1,
  FkBrokerCompanyId: 1,
  FkBrokerIndividualId: 1,

  EstimatedSecurityValue: +faker.finance.amount(),
  MaximumLtv: +faker.finance.amount(0, 100, 2),
  LoanPeriod: +faker.random.number(24),
  InterestType: faker.random.arrayElement(loanTypes),

  CalculateMaxFromSecurity: true,
  NetLoanAmount: +faker.finance.amount(),
  BuildPeriod: +faker.random.number(10),
  Gdv: +faker.finance.account(),
  MaximumGdltv: +faker.finance.amount(0, 100, 2),
  FurtherDrawdownsAmount: +faker.finance.amount(),

  ArrangementFeeBroker: +faker.finance.amount(0, 100, 2),
  InterestRate: +faker.finance.amount(0, 5.0, 2),
  ArrangementFeeTotal: +faker.finance.amount(0, 100, 2),
  OtherFees: +faker.finance.amount(0, 10000, 2),

  PropertyLocation: faker.address.streetAddress(true),
  PropertyType: faker.random.arrayElement(securityTypes),
  Notes: faker.random.words(),
});
