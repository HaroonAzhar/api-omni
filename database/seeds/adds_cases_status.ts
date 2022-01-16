import * as Knex from "knex";

export async function seed(knex: Knex): Promise<any> {
  // Deletes ALL existing entries
  return knex("Origination.CaseStatus")
    .del()
    .then(() => {
      // Inserts seed entries
      return knex("Origination.CaseStatus").insert([
        { Name: "pending" },
        { Name: "received" },
        { Name: "withdrawn" },
        { Name: "issued" },
        { Name: "expired" },
        { Name: "received" },
        { Name: "in_progress" },
        { Name: "ready_to_check" },
        { Name: "checked" },
        { Name: "awaiting_application" },
        { Name: "not_proceeding" },
      ]);
    });
}
