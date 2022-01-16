import * as Knex from "knex";

exports.up = async (knex: Knex) => {
  await knex.schema.alterTable(
    "Origination.ApplicantAssetsLiabilitiesAdditional",
    (table) => {
      table.string("StatementOfFinancialPosition");
    }
  );
};

exports.down = async (knex: Knex) => {
  await knex.schema.alterTable(
    "Origination.ApplicantAssetsLiabilitiesAdditional",
    (table) => {
      table.dropColumn("StatementOfFinancialPosition");
    }
  );
};
