import * as Knex from "knex";

exports.up = async (knex: Knex) => {
  await knex.schema.alterTable("Origination_DIP_Security", (table) => {
    table.string("security_type", 255);
  });

  await knex.schema.alterTable(
    "Origination_DIP_LoanFinancialDetails",
    (table) => {
      table.string("loan_purpose", 255);
      table.string("value_type_of_loan_amount", 30);
    }
  );
};

exports.down = async (knex: Knex) => {
  await knex.schema.alterTable(
    "Origination_DIP_LoanFinancialDetails",
    (table) => {
      table.dropColumn("loan_purpose");
      table.dropColumn("value_type_of_loan_amount");
    }
  );

  await knex.schema.alterTable("Origination_DIP_Security", (table) => {
    table.dropColumn("security_type");
  });
};
