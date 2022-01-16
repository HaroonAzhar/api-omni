import * as Knex from "knex";

exports.up = (knex: Knex) =>
  knex.schema.alterTable("Origination.PropertyValuationReport", (table) => {
    table.string("Surveyor");
  });

exports.down = (knex: Knex) =>
  knex.schema.alterTable("Origination.PropertyValuationReport", (table) => {
    table.dropColumn("Surveyor");
  });
