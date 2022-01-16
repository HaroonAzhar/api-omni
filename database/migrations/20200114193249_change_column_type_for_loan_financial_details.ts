import * as Knex from "knex";

exports.up = (knex: Knex) =>
  knex.schema.alterTable("Origination_DIP_LoanPropertyDevelopment", (table) => {
    table.float("progress_report");
  });

exports.down = (knex: Knex) =>
  knex.schema.alterTable("Origination_DIP_LoanPropertyDevelopment", (table) => {
    table.dropColumn("progress_report");
  });
