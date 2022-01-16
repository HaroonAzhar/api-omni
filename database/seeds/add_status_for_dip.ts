import * as Knex from "knex";

export async function seed(knex: Knex): Promise<any> {
  // Deletes ALL existing entries
  return knex("Origination.DipStatus")
    .del()
    .then(() => {
      // Inserts seed entries
      return knex("Origination.DipStatus").insert([
        { Status: "pending" },
        { Status: "requires_adjustment" },
        { Status: "approved" },
      ]);
    });
}
