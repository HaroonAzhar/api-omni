import * as Knex from "knex";

exports.up = async (knex: Knex) => {
  await knex.schema.alterTable(
    "Origination.DipLoanFinancialDetails",
    async (table) => {
      await table.renameColumn(
        "LoanFinacialDetailsId",
        "LoanFinancialDetailsId"
      );
    }
  );
};

exports.down = async (knex: Knex) => {
  await knex.schema.alterTable(
    "Origination.DipLoanFinancialDetails",
    async (table) => {
      await table.renameColumn(
        "LoanFinancialDetailsId",
        "LoanFinacialDetailsId"
      );
    }
  );
};
