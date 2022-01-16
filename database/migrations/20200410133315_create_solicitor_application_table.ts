import * as Knex from "knex";

exports.up = async (knex: Knex) => {
  await knex.schema.createTable("Origination.CaseSolicitor", (table) => {
    table.increments("CaseSolicitorId").primary();
    table.boolean("AreLeastTwoPartners");
    table.string("CompanyName");
    table.string("AddressLine1");
    table.string("AddressLine2");
    table.string("City");
    table.string("Postcode");
    table.string("Country");
    table.string("PhoneNumber");
    table.string("Email");
    table.string("ContactName");
    table.integer("FkCaseId");
    table.foreign("FkCaseId").references("CaseId").inTable("Origination.Case");
  });
};

exports.down = async (knex: Knex) => {
  await knex.schema.dropTable("Origination.CaseSolicitor");
};
