import * as Knex from "knex";

exports.up = async (knex: Knex) => {
  await knex.schema.createTable("Origination.AmlKyc", (table) => {
    table.increments("AmlKycId").primary();

    table.integer("FkApplicantId").unsigned().notNullable();

    table.boolean("Aml").notNullable();
    table.text("AmlDetails");

    table.boolean("Ccj").notNullable();
    table.text("CcjDetails");

    table.boolean("Cifas").notNullable();
    table.text("CifasDetails");

    table.boolean("CreditSafe").notNullable();
    table.text("CreditSafeDetails");

    table.boolean("GoogleSearch").notNullable();
    table.text("GoogleSearchDetails");

    table.string("ProofOfAddress", 100).notNullable();
    table.text("ProofOfAddressDetails").notNullable();

    table.string("ProofOfId", 100).notNullable();
    table.text("ProofOfIdDetails").notNullable();

    table.timestamp("createdAt");

    table
      .foreign("FkApplicantId")
      .references("ApplicantId")
      .inTable("Origination.Applicant");
  });
};

exports.down = async (knex: Knex) => {
  await knex.schema.dropTable("Origination.AmlKyc");
};
