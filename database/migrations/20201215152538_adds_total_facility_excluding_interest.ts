import * as Knex from "knex";

exports.up = async (knex: Knex) => {
  await knex.schema.alterTable(
    "Origination.DipLoanFinancialDetails",
    (table) => {
      table.decimal("TotalLoanFacilityExcludingInterest", 38, 4);
    }
  );
};

exports.down = async (knex: Knex) => {
  await knex.schema.alterTable(
    "Origination.DipLoanFinancialDetails",
    (table) => {
      table.dropColumn("TotalLoanFacilityExcludingInterest");
    }
  );
};
