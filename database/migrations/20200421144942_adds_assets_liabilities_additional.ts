import * as Knex from "knex";

exports.up = async (knex: Knex) => {
  await knex.schema.createTable(
    "Origination.ApplicantAssetsLiabilitiesAdditional",
    (table) => {
      table.increments("ApplicantAssetsLiabilitiesAdditionalId").primary();
      table.decimal("TotalLiabilities", 38, 4);
      table.decimal("TotalAssets", 38, 4);

      table.integer("FkApplicantId");
      table
        .foreign("FkApplicantId")
        .references("ApplicantId")
        .inTable("Origination.Applicant");
    }
  );
};

exports.down = async (knex: Knex) => {
  await knex.schema.dropTable(
    "Origination.ApplicantAssetsLiabilitiesAdditional"
  );
};
