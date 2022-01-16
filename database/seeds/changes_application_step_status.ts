import * as Knex from "knex";

export async function seed(knex: Knex): Promise<any> {
  return knex
    .update({ ApplicationStepStatusType: "New" })
    .from("Origination.ApplicationStepStatusType")
    .where({ ApplicationStepStatusType: "Imported" });
}