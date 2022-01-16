import * as Knex from "knex";

exports.up = async (knex: Knex) => {
  await knex.schema.createTable("Origination.AmlKycValidation", (table) => {
    table.increments("AmlKycValidationId").primary();
    table.string("ValidationUserName");
    table.string("ValidationUserDate");
    table.string("ValidationMlroName");
    table.string("ValidationMlroDate");

    table.integer("FkCaseId");
    table.index("FkCaseId");
    table.foreign("FkCaseId").references("CaseId").inTable("Origination.Case");
  });
};

exports.down = async (knex: Knex) => {
  await knex.schema.dropTable("Origination.AmlKycValidation");
};
