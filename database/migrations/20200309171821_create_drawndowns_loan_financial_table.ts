import * as Knex from "knex";

exports.up = async (knex: Knex) => {
  await knex.schema.createTable(
    "Origination.DipLoanFinancialDrawDowns",
    (table) => {
      table.increments("LoanFinancialDrawDownsId").primary();
      table.decimal("Advance", 38, 4);
      table.decimal("ArrFeeOut", 38, 4);
      table.dateTime("Date");
      table.decimal("EndBal", 38, 4);
      table.decimal("GrossLtgdv", 38, 4);
      table.decimal("GrossLtv", 38, 4);
      table.decimal("Interest", 38, 4);
      table.decimal("InterestPaid", 38, 4);
      table.decimal("TotalFees", 38, 4);
    }
  );

  await knex.schema.alterTable(
    "Origination.DipLoanFinancialDrawDowns",
    async (table) => {
      await table.integer("FkLoanFinancialDetailsId");
      await table
        .foreign("FkLoanFinancialDetailsId")
        .references("LoanFinancialDetailsId")
        .inTable("Origination.DipLoanFinancialDetails");
    }
  );

  await knex.schema.alterTable(
    "Origination.DipLoanFinancialDetails",
    (table) => {
      table.dateTime("StartDate");
      table.text("FurtherAdvances");
    }
  );
};

exports.down = async (knex: Knex) => {
  await knex.schema.alterTable(
    "Origination.DipLoanFinancialDetails",
    (table) => {
      table.dropColumn("StartDate");
      table.dropColumn("FurtherAdvances");
    }
  );

  await knex.schema.dropTable("Origination.DipLoanFinancialDrawDowns");
};
