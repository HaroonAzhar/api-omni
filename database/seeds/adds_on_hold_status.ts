import * as Knex from "knex";

export async function seed(knex: Knex): Promise<any> {
  return knex("Origination.CaseStatus").insert([{ Name: "on_hold" }]);
}
