import * as Knex from "knex";

export async function seed(knex: Knex): Promise<any> {
  // Deletes ALL existing entries
  return knex("Origination.DipContactType")
    .del()
    .then(() => {
      // Inserts seed entries
      return knex("Origination.DipContactType").insert([
        { ContactType: "company" },
        { ContactType: "individual" },
      ]);
    });
}
