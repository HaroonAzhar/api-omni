import * as Knex from "knex";

exports.up = async (knex: Knex) => {
  await knex.schema.alterTable(
    "Origination.DipLoanFinancialDetails",
    async (table) => {
      await table.decimal("ArrangementFeePercent", 38, 4).alter();
    }
  );

  await knex.schema.alterTable(
    "Origination.DipLoanFinancialDetails",
    async (table) => {
      await table.decimal("InterestRate", 38, 4).alter();
    }
  );

  await knex.schema.alterTable(
    "Origination.DipLoanFinancialDetails",
    async (table) => {
      await table.decimal("MaxLtvDayOne", 38, 4).alter();
    }
  );

  await knex.schema.alterTable(
    "Origination.DipLoanFinancialDetailsDev",
    async (table) => {
      await table.decimal("LtvToGdv", 38, 4).alter();
    }
  );
};

exports.down = async (knex: Knex) => {
  await knex.schema.alterTable(
    "Origination.DipLoanFinancialDetails",
    async (table) => {
      await table.integer("ArrangementFeePercent").alter();
    }
  );

  await knex.schema.alterTable(
    "Origination.DipLoanFinancialDetails",
    async (table) => {
      await table.integer("InterestRate").alter();
    }
  );

  await knex.schema.alterTable(
    "Origination.DipLoanFinancialDetails",
    async (table) => {
      await table.integer("MaxLtvDayOne").alter();
    }
  );

  await knex.schema.alterTable(
    "Origination.DipLoanFinancialDetailsDev",
    async (table) => {
      await table.integer("LtvToGdv").alter();
    }
  );
};
