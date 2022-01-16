import * as Knex from "knex";

exports.up = async (knex: Knex) => {
  await knex.schema.createTable("Origination.CaseStageHistory", (table) => {
    table.increments("CaseStageHistoryId").primary();
    table.timestamp("ChangeDate").defaultTo(knex.fn.now());
    table.string("Command");
    table.integer("FkCaseId");
    table.foreign("FkCaseId").references("CaseId").inTable("Origination.Case");
    table.index("FkCaseId");
    table.string("Stage");
  });
};

exports.down = async (knex: Knex) =>
  await knex.schema.dropTable("Origination.CaseStageHistory");
