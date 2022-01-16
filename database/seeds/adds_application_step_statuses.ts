import * as Knex from "knex";

export async function seed(knex: Knex): Promise<any> {
  // Deletes ALL existing entries
  return knex("Origination.ApplicationStepStatusType")
    .del()
    .then(() => {
      // Inserts seed entries
      return knex("Origination.ApplicationStepStatusType").insert([
        { ApplicationStepStatusType: "Imported" },
        { ApplicationStepStatusType: "Completed" },
      ]);
    });
}
