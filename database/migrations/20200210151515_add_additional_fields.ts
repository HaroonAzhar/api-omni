import * as Knex from "knex";

exports.up = async (knex: Knex) => {
  await knex.schema.alterTable(
    "Origination_DIP_LoanFinancialDetails",
    async (table) => {
      await table.decimal("commision_fee", 38, 4).alter();
    }
  );

  await knex.schema.alterTable(
    "Origination_DIP_LoanFinancialDetails",
    async (table) => {
      await table.integer("intermediary_comission_fee_percent");
    }
  );
};

exports.down = async (knex: Knex) => {
  await knex.schema.alterTable(
    "Origination_DIP_LoanFinancialDetails",
    (table) => {
      table.dropColumn("intermediary_comission_fee_percent");
    }
  );

  await knex.schema.alterTable(
    "Origination_DIP_LoanFinancialDetails",
    async (table) => {
      await table.integer("commision_fee").alter();
    }
  );
};
