import * as Knex from "knex";

exports.up = async (knex: Knex) => {
  await knex.schema.createTable("Origination.ApplicantAsset", (table) => {
    table.increments("ApplicantAssetId").primary();
    table.string("Type");
    table.string("Description");
    table.decimal("GrossValue", 38, 4);
    table.decimal("OutstandingDebt", 38, 4);
    table.decimal("NetValue", 38, 4);
    table.integer("FkApplicantId");
  });

  await knex.schema.createTable("Origination.ApplicantLiability", (table) => {
    table.increments("ApplicantLiabilityId").primary();
    table.string("Type");
    table.string("Description");
    table.decimal("NetValue", 38, 4);
    table.integer("FkApplicantId");
  });
};

exports.down = async (knex: Knex) => {
  await knex.schema.dropTable("Origination.ApplicantAsset");
  await knex.schema.dropTable("Origination.ApplicantLiability");
};
