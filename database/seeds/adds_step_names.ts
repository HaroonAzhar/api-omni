import * as Knex from "knex";

const steps = [
  "introducer_details",
  "company_details",
  "applicant_details",
  "credit_history",
  "loan_details",
  "security_details",
  "solicitor_details",
  "additional_information",
  "declarations",
  "assets_and_liabilities",
];

export async function seed(knex: Knex): Promise<any> {
  // Deletes ALL existing entries
  const table = "Origination.ApplicationStepName";
  return knex(table)
    .del()
    .then(() => {
      // Inserts seed entries
      const entries = steps.map((ApplicationStepName) => ({
        ApplicationStepName,
      }));
      return knex(table).insert(entries);
    });
}
