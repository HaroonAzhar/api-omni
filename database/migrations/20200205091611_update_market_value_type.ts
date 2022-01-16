import * as Knex from "knex";

exports.up = async (knex: Knex) => {
  await knex.schema.alterTable(
    "Origination_DIP_LoanFinancialDetails",
    async (table) => {
      await table.float("market_value").alter();
      await table.float("purchase_price").alter();
      await table.float("comission_fee").alter();
      await table.float("max_ltv_day_one").alter();
    }
  );
};

exports.down = async (knex: Knex) => {
  await knex.schema.alterTable(
    "Origination_DIP_LoanFinancialDetails",
    async (table) => {
      await table.integer("market_value").alter();
      await table.integer("purchase_price").alter();
      await table.integer("comission_fee").alter();
      await table.integer("max_ltv_day_one").alter();
    }
  );
};
