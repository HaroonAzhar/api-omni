import * as Knex from "knex";

exports.up = (knex: Knex) =>
  knex.schema.alterTable("Origination.PropertyValuationReport", (table) => {
    table.decimal("MarketRent", 38, 4);
  });

exports.down = (knex: Knex) =>
  knex.schema.alterTable("Origination.PropertyValuationReport", (table) => {
    table.dropColumn("MarketRent");
  });
