import * as Knex from "knex";

exports.up = (knex: Knex) =>
  knex.schema.alterTable("Origination_DIP_DIP", (table) => {
    table.string("case_nr");
  });

exports.down = (knex: Knex) =>
  knex.schema.alterTable("Origination_DIP_DIP", (table) => {
    table.dropColumn("case_nr");
  });
