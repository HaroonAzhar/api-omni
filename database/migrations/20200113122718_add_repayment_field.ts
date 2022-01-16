import * as Knex from "knex";

exports.up = (knex: Knex) =>
  knex.schema.alterTable("Origination_DIP_LoanFinancialDetails", (table) => {
    table.integer("arrangement_fee_repayment");
  });

exports.down = (knex: Knex) =>
  knex.schema.alterTable("Origination_DIP_LoanFinancialDetails", (table) => {
    table.dropColumn("arrangement_fee_repayment");
  });
