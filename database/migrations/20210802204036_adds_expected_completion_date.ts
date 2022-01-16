import * as Knex from "knex";

exports.up = (knex: Knex) =>
  knex.schema.alterTable("Origination.CaseOverview", (table) => {
    table.timestamp("ExpectedCompletionDate");
  });

exports.down = (knex: Knex) =>
  knex.schema.alterTable("Origination.CaseOverview", (table) => {
    table.dropColumns("ExpectedCompletionDate");
  });
