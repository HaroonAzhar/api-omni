import * as Knex from "knex";

exports.up = async (knex: Knex) => {
  await knex.schema.createTable("Origination.Enquiry", (table) => {
    table.increments("EnquiryId").primary();

    table.integer("FkCaseId");
    table.index("FkCaseId");
    table.foreign("FkCaseId").references("CaseId").inTable("Origination.Case");

    table.string("EnquirerName");
    table.string("Broker");

    table.integer("FkOriginatorId");
    table
      .foreign("FkOriginatorId")
      .references("Id")
      .inTable("OriginationAdmin.Originators");

    table.string("PropertyLocation");
    table.string("PropertyType");
    table.text("Notes");

    table.integer("FkBuildingTypeId");
    table
      .foreign("FkBuildingTypeId")
      .references("BuildingTypeId")
      .inTable("Origination.DipBuildingType");

    table.string("LoanFacilityType");
    table.decimal("LoanFacility", 38, 4);
    table.integer("LoanTerm");
    table.decimal("ApproximateLtvDay1", 38, 4);
    table.decimal("ApproximateGltv", 38, 4);
    table.decimal("ApproximateLtgdv", 38, 4);
  });
};

exports.down = async (knex: Knex) => {
  await knex.schema.dropTable("Origination.Enquiry");
};
