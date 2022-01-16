import * as Knex from "knex";

exports.up = async (knex: Knex) => {
  await knex.schema.alterTable(
    "Origination.ApplicantCreditHistory",
    (table) => {
      table.string("RefusedMortgageDetails", 1000);
      table.string("DebtJudgementDetails", 1000);
      table.string("DeclaredBankruptDetails", 1000);
      table.string("FailedToKeepDetails", 1000);
      table.string("ClaimDssDetails", 1000);
      table.string("ConvictedFraudDetails", 1000);
      table.string("Details", 1000).alter();
    }
  );
};

exports.down = async (knex: Knex) => {
  await knex.schema.alterTable(
    "Origination.ApplicantCreditHistory",
    (table) => {
      table.dropColumns(
        "RefusedMortgageDetails",
        "DebtJudgementDetails",
        "DeclaredBankruptDetails",
        "FailedToKeepDetails",
        "ClaimDssDetails",
        "ConvictedFraudDetails"
      );
      table.string("Details").alter();
    }
  );
};
