import * as Knex from "knex";

exports.up = (knex: Knex) =>
  knex.schema.alterTable("Origination.PropertyValuationReport", (table) => {
    table.boolean("Esw1");
  });

exports.down = (knex: Knex) =>
  knex.schema.alterTable("Origination.PropertyValuationReport", (table) => {
    table.dropColumn("Esw1");
  });
