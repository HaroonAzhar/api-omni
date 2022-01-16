import * as Knex from "knex";

exports.up = async (knex: Knex) => {
  await knex.schema.createTable("Origination.CaseStatus", (table) => {
    table.increments("CaseStatusId").primary();
    table.string("Name", 100);
  });

  await knex.schema.alterTable("Origination.Case", (table) => {
    table.integer("FkCaseStatusId");
    table
      .foreign("FkCaseStatusId", "FK_CASE_CASE_STATUS_ID")
      .references("CaseStatusId")
      .inTable("Origination.CaseStatus");
  });
};

exports.down = async (knex: Knex) => {
  await knex.schema.alterTable("Origination.Case", (table) => {
    table.dropForeign(["FkCaseStatusId"], "FK_CASE_CASE_STATUS_ID");
    table.dropColumn("FkCaseStatusId");
  });

  await knex.schema.dropTable("Origination.CaseStatus");
};
