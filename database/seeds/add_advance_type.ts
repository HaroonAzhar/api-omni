import * as Knex from "knex";

export async function seed(knex: Knex): Promise<any> {
  // Deletes ALL existing entries
  return knex("Origination.DipLoanAdvanceType")
    .del()
    .then(() => {
      // Inserts seed entries
      return knex("Origination.DipLoanAdvanceType").insert([
        { AdvanceType: "single" },
        { AdvanceType: "multiple" },
      ]);
    });
}
