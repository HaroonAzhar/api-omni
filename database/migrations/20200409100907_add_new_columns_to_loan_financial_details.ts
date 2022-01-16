import * as Knex from "knex";

exports.up = async (knex: Knex) => {
  await knex.schema.alterTable(
    "Origination.DipLoanFinancialDetails",
    (table) => {
      table.integer("FurtherDrawDownsBorrowing");
      table.integer("InitialNetLoan");
      table.integer("Term");
      table.text("PurposeOfBorrowings");
      table.text("SourceOfDeposit");
      table.string("RepaymentMethod", 100);
      table.string("ProposedCompletionDate", 100);
    }
  );
};

exports.down = async (knex: Knex) => {
  await knex.schema.alterTable(
    "Origination.DipLoanFinancialDetails",
    (table) => {
      table.dropColumn("FurtherDrawDownsBorrowing");
      table.dropColumn("InitialNetLoan");
      table.dropColumn("Term");
      table.dropColumn("PurposeOfBorrowings");
      table.dropColumn("SourceOfDeposit");
      table.dropColumn("RepaymentMethod");
      table.dropColumn("ProposedCompletionDate");
    }
  );
};
