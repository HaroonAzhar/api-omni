import * as Knex from "knex";

const steps = ["valuation_report", "aml_kyc"];

export async function seed(knex: Knex): Promise<any> {
  const table = "Origination.ApplicationStepName";
  const entries = steps.map((ApplicationStepName) => ({
    ApplicationStepName,
  }));
  return knex(table).insert(entries);
}
