import * as Knex from "knex";

export async function seed(knex: Knex): Promise<any> {
  // Deletes ALL existing entries
  return knex("Origination.DipLoanType")
    .del()
    .then(() => {
      // Inserts seed entries
      return knex("Origination.DipLoanType").insert([
        { LoanType: "retained" },
        { LoanType: "serviced" },
        { LoanType: "rolled_up" },
        { LoanType: "hybrid" },
      ]);
    });
}
