import * as Knex from "knex";

exports.up = async (knex: Knex) => {
  const results = await knex("Origination.ApplicationStep as step")
    .join("Origination.Dip as dip", "dip.DipId", "=", "step.FkDipId")
    .select("ApplicationStepId", "FkCaseId");

  await knex.schema.alterTable("Origination.ApplicationStep", (table) => {
    table.integer("FkCaseId");
    table.foreign("FkCaseId").references("CaseId").inTable("Origination.Case");
  });

  for (const { ApplicationStepId, FkCaseId } of results) {
    await knex("Origination.ApplicationStep")
      .update({ FkCaseId })
      .where({ ApplicationStepId });
  }

  await knex.schema.alterTable("Origination.ApplicationStep", (table) => {
    table.dropForeign(["FkDipID"]);
    table.dropColumn("FkDipID");
  });
};

exports.down = async (knex: Knex) => {
  const results = await knex("Origination.ApplicationStep as step")
    .join("Origination.Dip as dip", "dip.FkCaseId", "=", "step.FkCaseId")
    .select("ApplicationStepId", "DipId");

  await knex.schema.alterTable("Origination.ApplicationStep", (table) => {
    table.integer("FkDipID");
    table.foreign("FkDipID").references("DipId").inTable("Origination.DIP");
  });

  for (const { ApplicationStepId, DipId } of results) {
    await knex("Origination.ApplicationStep")
      .update({ FkDipID: DipId })
      .where({ ApplicationStepId });
  }

  await knex.schema.alterTable("Origination.ApplicationStep", (table) => {
    table.dropForeign(["FkCaseId"]);
    table.dropColumn("FkCaseId");
  });
};
