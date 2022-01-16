import * as Knex from "knex";

exports.up = (knex: Knex) =>
  knex.schema.alterTable("Origination_DIP_LoanFinancialDetails", (table) => {
    table.integer("estimated_interest");
    table.float("completion_administration_fee");
  });

exports.down = (knex: Knex) =>
  knex.schema.alterTable("Origination_DIP_LoanFinancialDetails", (table) => {
    table.dropColumn("estimated_interest");
    table.dropColumn("completion_administration_fee");
  });
