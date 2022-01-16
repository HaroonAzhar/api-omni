import * as Knex from "knex";

exports.up = async (knex: Knex) => {
  await knex.schema.alterTable(
    "Origination.ApplicantCreditHistory",
    (table) => {
      table.string("Details");
      table.dropColumns(
        "FailedToKeepDetails",
        "ClaimDssDetails",
        "ConvictedFraudDetails"
      );
    }
  );
};

exports.down = async (knex: Knex) => {
  await knex.schema.alterTable(
    "Origination.ApplicantCreditHistory",
    (table) => {
      table.string("FailedToKeepDetails");
      table.string("ClaimDssDetails");
      table.string("ConvictedFraudDetails");
      table.dropColumn("Details");
    }
  );
};
