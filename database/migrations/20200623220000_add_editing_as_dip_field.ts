import * as Knex from "knex";

exports.up = (knex: Knex) =>
  knex.schema.alterTable("Origination.Case", (table) => {
    table.boolean("EditingAsDip").defaultTo(false);
  });

exports.down = (knex: Knex) =>
  knex.schema.alterTable("Origination.Case", (table) => {
    table.dropColumn("EditingAsDip");
  });
