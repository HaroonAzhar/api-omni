import * as Knex from "knex";

exports.up = async (knex: Knex) => {
  await knex.schema.createTable("Origination.Case", async (table) => {
    table.increments("CaseId").primary();
    table.string("Id", 36);
  });

  await knex.schema.alterTable("Origination.Dip", async (table) => {
    table.integer("FkCaseId");
    table.foreign("FkCaseId").references("CaseId").inTable("Origination.Case");
  });

  const dipData = await knex.select(["DipFormId"]).from("Origination.Dip");
  for (const data of dipData) {
    const id = await knex
      .insert({ id: data.DipFormId })
      .into("Origination.Case")
      .returning("CaseId");
    await knex
      .update({ FkCaseId: id[0] })
      .into("Origination.Dip")
      .where({ DipFormId: data.DipFormId });
  }

  await knex.schema.alterTable("Origination.Dip", async (table) => {
    table.dropColumn("DipFormId");
  });
};

exports.down = async (knex: Knex) => {
  await knex.schema.alterTable("Origination.Dip", (table) => {
    table.dropForeign(["FkCaseId"]);
    table.dropColumn("FkCaseId");
    table.string("DipFormId", 36);
  });

  await knex.schema.dropTable("Origination.Case");
};
