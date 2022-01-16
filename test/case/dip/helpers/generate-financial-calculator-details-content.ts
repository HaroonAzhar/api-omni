import faker from "faker";
import moment from "moment";

import { startingPoints } from "../../../../src/v2/modules/cases/dip/dip.interface";
import { ChangeFinancialCalculatorDetailsDto } from "../../../../src/v2/modules/cases/dip/dtos/change-financial-calculator-details.dto";

export const generateFinancialCalculatorDetails = (): ChangeFinancialCalculatorDetailsDto => ({
  AdvancedInterest: faker.random.number({ min: 1, precision: 10 }),
  NetAmountOfFirstAdvance: faker.random.number({ min: 1, precision: 10 }),
  ArrangementFee: faker.random.number({ min: 1, precision: 10 }),
  ArrangementFeeRepayment: faker.random.number({ min: 1, precision: 10 }),
  GrossAmountOfFirstAdvance: faker.random.number({ min: 1, precision: 10 }),
  GrossAmountAtMaturity: faker.random.number({ min: 1, precision: 10 }),
  TotalInterest: faker.random.number({ min: 1, precision: 10 }),
  GrossAmountForLtv: faker.random.number({ min: 1, precision: 10 }),
  GrossDayOneLtv: faker.random.number({ min: 1, precision: 10 }),
  GrossTotalLoanAmount: faker.random.number({ min: 1, precision: 10 }),
  GrossLoanFirstAdvance: faker.random.number({ min: 1, precision: 10 }),
  MaxTotalNetLoanAvailable: faker.random.number({ min: 1, precision: 10 }),
  TotalFees: faker.random.number({ min: 1, precision: 10 }),
  TotalLoanAmount: faker.random.number({ min: 1, precision: 10 }),
  TotalLoanFacility: faker.random.number({ min: 1, precision: 10 }),
  Xirr: faker.random.number({ min: 1, precision: 10 }),
  RepaymentDate: faker.date.future().toISOString(),
  MaturityDate: faker.date.future().toISOString(),
  Gdltv: faker.random.number({ min: 1, precision: 10 }),
  Gdltv90Day: faker.random.number({ min: 1, precision: 10 }),

  ServicedInterestTotal: faker.random.number({ min: 1, precision: 10 }),
  ArrangementFeeRetainedValue: faker.random.number({
    min: 1,
    precision: 10,
  }),
  ExitFeeRetainedValue: faker.random.number({ min: 1, precision: 10 }),
  TotalLoanFacilityExcludingInterest: faker.random.number({
    min: 1,
    precision: 10,
  }),

  drawdowns: Array.from({ length: faker.random.number(24) }).map(() => ({
    Advance: faker.random.number({ min: 1, precision: 10 }),
    ArrFeeOut: faker.random.number({ min: 1, precision: 10 }),
    Date: faker.date.future().toISOString(),
    EndBal: faker.random.number({ min: 1, precision: 10 }),
    GrossLtgdv: faker.random.number({ min: 1, precision: 10 }),
    GrossLtv: faker.random.number({ min: 1, precision: 10 }),
    Interest: faker.random.number({ min: 1, precision: 10 }),
    InterestPaid: faker.random.number({ min: 1, precision: 10 }),
    TotalFees: faker.random.number({ min: 1, precision: 10 }),
  })),

  MarketValue: faker.random.number({ min: 1, precision: 10 }),
  StartDate: moment(faker.date.future()).format("YYYY-MM-DD"),
  furtherAdvances: Array.from({ length: faker.random.number(24) }).map(() =>
    faker.random.number({ min: 1, precision: 10 })
  ),
  StartingPoint: faker.random.arrayElement(startingPoints),
  InitialNetLoanAmountInput: faker.random.number({ min: 1, precision: 10 }),
  ArrangementFeeInput: faker.random.number({ min: 1, precision: 10 }),
  ArrangementFeePercent: faker.random.number({ min: 1, precision: 10 }),
  InterestRate: faker.random.number({ min: 1, precision: 10 }),
  IntermediaryCommissionFeeValue: faker.random.number({
    min: 1,
    precision: 10,
  }),
  TitleInsuranceFee: faker.random.number({ min: 1, precision: 10 }),
  PremiumForLendersInsurance: faker.random.number({
    min: 1,
    precision: 10,
  }),
  CompletionAdministrationFee: faker.random.number({
    min: 1,
    precision: 10,
  }),
  ArrangementFeeRepaymentInput: faker.random.number({
    min: 1,
    precision: 10,
  }),
  IntermediaryCommissionFeePercent: faker.random.number({
    min: 1,
    precision: 10,
  }),
  IsManualMode: faker.random.boolean(),
  ExitFeeIntermediary: faker.random.number({ min: 1, precision: 10 }),
});
