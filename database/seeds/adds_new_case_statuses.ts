import * as Knex from "knex";

export async function seed(knex: Knex): Promise<any> {
  // Deletes ALL existing entries
  return knex("Origination.CaseStatus").insert([
    { Name: "awaiting_application" },
    { Name: "not_proceeding" },
  ]);
}
