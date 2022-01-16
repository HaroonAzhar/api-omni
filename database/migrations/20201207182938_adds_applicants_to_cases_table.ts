import * as Knex from "knex";

exports.up = (knex: Knex) =>
  knex.schema.alterTable("Origination.Case", (table) => {
    table.string("Applicants");
  });

exports.down = (knex: Knex) =>
  knex.schema.alterTable("Origination.Case", (table) => {
    table.dropColumn("Applicants");
  });
