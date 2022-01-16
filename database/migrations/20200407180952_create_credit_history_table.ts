import * as Knex from "knex";

exports.up = async (knex: Knex) => {
  await knex.schema.createTable(
    "Origination.ApplicantCreditHistory",
    (table) => {
      table.increments("ApplicantCreditHistoryId").primary();
      table.boolean("DebtJudgement");
      table.boolean("DeclaredBankrupt");
      table.boolean("FailedToKeep");
      table.boolean("ClaimDss");
      table.boolean("ConvictedFraud");
      table.string("FailedToKeepDetails");
      table.string("ClaimDssDetails");
      table.string("ConvictedFraudDetails");
      table.boolean("RefusedMortgage");
      table.integer("FkApplicantId");
    }
  );

  await knex.schema.alterTable("Origination.Applicant", (table) => {
    table.integer("FkApplicantCreditHistoryId");
    table
      .foreign("FkApplicantCreditHistoryId")
      .references("ApplicantCreditHistoryId")
      .inTable("Origination.ApplicantCreditHistory");
  });

  await knex.schema.alterTable("Origination.ApplicantCompany", (table) => {
    table.integer("FkApplicantCreditHistoryId");
    table
      .foreign("FkApplicantCreditHistoryId")
      .references("ApplicantCreditHistoryId")
      .inTable("Origination.ApplicantCreditHistory");
  });
};

exports.down = async (knex: Knex) => {
  await knex.schema.alterTable("Origination.Applicant", (table) => {
    table.dropForeign(["FkApplicantCreditHistoryId"]);
    table.dropColumn("FkApplicantCreditHistoryId");
  });

  await knex.schema.alterTable("Origination.ApplicantCompany", (table) => {
    table.dropForeign(["FkApplicantCreditHistoryId"]);
    table.dropColumn("FkApplicantCreditHistoryId");
  });

  await knex.schema.dropTable("Origination.ApplicantCreditHistory");
};
