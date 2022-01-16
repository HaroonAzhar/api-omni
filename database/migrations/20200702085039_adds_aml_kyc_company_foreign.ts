import * as Knex from "knex";

exports.up = async (knex: Knex) => {
  await knex.schema.alterTable("Origination.AmlKyc", async (table) => {
    table.integer("FkApplicantId").nullable().alter();
  });

  await knex.schema.alterTable("Origination.AmlKyc", async (table) => {
    table.integer("ExperianRiskScore").nullable().alter();
  });

  await knex.schema.alterTable("Origination.AmlKyc", (table) => {
    table.integer("FkApplicantCompanyId");
    table
      .foreign("FkApplicantCompanyId")
      .references("ApplicantCompanyId")
      .inTable("Origination.ApplicantCompany");
  });
};

exports.down = async (knex: Knex) => {
  await knex.schema.alterTable("Origination.AmlKyc", (table) => {
    table.dropForeign(["FkApplicantCompanyId"]);
    table.dropColumn("FkApplicantCompanyId");
  });

  await knex.schema.alterTable("Origination.AmlKyc", async (table) => {
    table.integer("FkApplicantId").notNullable().alter();
  });
};
