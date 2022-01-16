import * as Knex from "knex";

exports.up = (knex: Knex) =>
  knex.schema.alterTable("Origination.PropertyValuationReport", (table) => {
    table.string("Status");
  });

exports.down = (knex: Knex) =>
  knex.schema.alterTable("Origination.PropertyValuationReport", (table) => {
    table.dropColumn("Status");
  });
