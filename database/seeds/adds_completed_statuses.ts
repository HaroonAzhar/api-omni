import * as Knex from "knex";

export async function seed(knex: Knex): Promise<any> {
  // Deletes ALL existing entries
  return knex("Origination.CaseStatus").insert([
    { Name: "live" },
    { Name: "in_full" },
    { Name: "with_shortfall" },
  ]);
}
