import * as Knex from "knex";

exports.up = async (knex: Knex) => {
  await knex.schema.alterTable(
    "Origination.DipLoanFinancialDetails",
    async (table) => {
      await table.decimal("FurtherDrawDownsBorrowing", 38, 4).alter();
    }
  );
  await knex.schema.alterTable(
    "Origination.DipLoanFinancialDetails",
    async (table) => {
      await table.decimal("InitialNetLoan", 38, 4).alter();
    }
  );
};

exports.down = async (knex: Knex) => {
  await knex.schema.alterTable(
    "Origination.DipLoanFinancialDetails",
    async (table) => {
      await table.integer("FurtherDrawDownsBorrowing").alter();
    }
  );

  await knex.schema.alterTable(
    "Origination.DipLoanFinancialDetails",
    async (table) => {
      await table.integer("InitialNetLoan").alter();
    }
  );
};
