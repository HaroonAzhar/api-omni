import * as Knex from "knex";

exports.up = async (knex: Knex) => {
  await knex.schema.createTable("Origination.CaseIntroducer", (table) => {
    table.increments("CaseIntroducerId").primary();
    table.string("Firm");
    table.string("Introducer");
    table.string("AddressLine1");
    table.string("AddressLine2");
    table.string("City");
    table.string("Postcode");
    table.string("Country");
    table.string("PhoneNumber");
    table.string("Email");
    table.string("InterimPermissionNumber");
    table.boolean("HaveMetClient");
    table.integer("FkCaseId");
    table.foreign("FkCaseId").references("CaseId").inTable("Origination.Case");
  });
};

exports.down = async (knex: Knex) => {
  await knex.schema.dropTable("Origination.CaseIntroducer");
};
