import * as Knex from "knex";

exports.up = (knex: Knex) =>
  knex.schema.alterTable("Origination.CaseOverview", (table) => {
    table.text("ServicingMethodRationale");
  });

exports.down = (knex: Knex) =>
  knex.schema.alterTable("Origination.CaseOverview", (table) => {
    table.dropColumn("ServicingMethodRationale");
  });
