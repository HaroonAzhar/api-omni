import * as Knex from "knex";

export async function seed(knex: Knex): Promise<any> {
  // Deletes ALL existing entries
  return knex("Origination.DipIntroducerType")
    .del()
    .then(() => {
      // Inserts seed entries
      return knex("Origination.DipIntroducerType").insert([
        { IntroducerType: "direct_application" },
        { IntroducerType: "via_broker" },
      ]);
    });
}
