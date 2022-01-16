import * as Knex from "knex";

exports.up = (knex: Knex) =>
  knex.schema.alterTable("Origination_DIP_LoanFinancialDetails", (table) => {
    table.float("premium_for_lenders_insurance").alter();
  });

exports.down = (knex: Knex) =>
  knex.schema.alterTable("Origination_DIP_LoanFinancialDetails", (table) => {
    table.integer("premium_for_lenders_insurance").alter();
  });
