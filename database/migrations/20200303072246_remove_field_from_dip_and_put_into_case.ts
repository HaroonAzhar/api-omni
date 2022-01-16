import * as Knex from "knex";

exports.up = async (knex: Knex) => {
  await knex.schema.alterTable("Origination.Case", async (table) => {
    table.string("CaseNr");
  });

  const dipData = await knex
    .select(["CaseNr", "FkCaseId"])
    .from("Origination.Dip");
  for (const data of dipData) {
    await knex
      .update({ CaseNr: data.CaseNr })
      .into("Origination.Case")
      .where({ CaseId: data.FkCaseId });
  }

  await knex.schema.alterTable("Origination.Dip", async (table) => {
    table.dropColumn("CaseNr");
  });
};

exports.down = async (knex: Knex) => {
  await knex.schema.alterTable("Origination.Case", (table) => {
    table.dropColumn("CaseNr");
  });

  await knex.schema.alterTable("Origination.Dip", (table) => {
    table.string("CaseNr");
  });
};
