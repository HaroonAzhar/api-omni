import * as Knex from "knex";
const caseFkColumn = "FkCaseId";
const tagFkColumn = "FkTagId";
exports.up = async (knex: Knex) => {
  await knex.schema.createTable(
    "Origination.AssociatedCasesAndTags",
    async (table) => {
      table.increments("Id").primary();
      table.integer(caseFkColumn);
      table
        .foreign(caseFkColumn)
        .references("CaseId")
        .inTable("Origination.Case");
      table.integer(tagFkColumn);
      table
        .foreign(tagFkColumn)
        .references("Id")
        .inTable("OriginationAdmin.Tags");
    }
  );
};

exports.down = async (knex: Knex) =>
  await knex.schema.dropTable("Origination.AssociatedCasesAndTags");
