import * as Knex from "knex";

export async function seed(knex: Knex): Promise<any> {
  // Deletes ALL existing entries
  return knex("Origination.DipOpflType")
    .del()
    .then(() => {
      // Inserts seed entries
      return knex("Origination.DipOpflType").insert([
        { OpflType: "first_charge" },
        { OpflType: "second_charge" },
      ]);
    });
}
