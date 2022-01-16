import * as Knex from "knex";

import Seeds from "../seeds";

exports.up = async (knex: Knex) => {
  const seed = new Seeds(knex);
  await seed.run(false, "adds_new_case_statuses.ts");

  const results = await knex("Origination.ApplicationStep as steps")
    .join(
      "Origination.ApplicationStepName as names",
      "names.ApplicationStepName",
      "=",
      "steps.Name"
    )
    .select("ApplicationStepId", "ApplicationStepNameId");

  await knex.schema.alterTable("Origination.ApplicationStep", (table) => {
    table.integer("FkNameId");
    table
      .foreign("FkNameId")
      .references("ApplicationStepNameId")
      .inTable("Origination.ApplicationStepName");
  });

  for (const { ApplicationStepId, ApplicationStepNameId } of results) {
    await knex("Origination.ApplicationStep")
      .update({ FkNameId: ApplicationStepNameId })
      .where({ ApplicationStepId });
  }

  await knex.schema.alterTable("Origination.ApplicationStep", (table) => {
    table.dropColumn("Name");
  });
};

exports.down = async (knex: Knex) => {
  const results = await knex("Origination.ApplicationStep as steps")
    .join(
      "Origination.ApplicationStepName as names",
      "names.ApplicationStepNameId",
      "=",
      "steps.FkNameId"
    )
    .select("ApplicationStepId", "ApplicationStepName");

  await knex.schema.alterTable("Origination.ApplicationStep", (table) => {
    table.string("Name");
  });

  for (const { ApplicationStepId, ApplicationStepName } of results) {
    await knex("Origination.ApplicationStep")
      .update({ Name: ApplicationStepName })
      .where({ ApplicationStepId });
  }

  await knex.schema.alterTable("Origination.ApplicationStep", (table) => {
    table.dropForeign(["FkNameId"]);
    table.dropColumn("FkNameId");
  });
};
