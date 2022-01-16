import * as Knex from "knex";

exports.up = async (knex: Knex) =>
  await knex.schema.alterTable("Origination.Enquiry", async (table) => {
    table.dropForeign(["FkBuildingTypeId"]);
    table.dropColumns(
      "FkBuildingTypeId",
      "LoanFacilityType",
      "Broker",
      "ApproximateLtgdv",
      "ApproximateLtvDay1",
      "ApproximateGltv"
    );

    table.renameColumn("EnquirerName", "EnquiryName");

    table.renameColumn("LoanFacility", "NetLoanAmount");
    table.renameColumn("LoanTerm", "LoanPeriod");

    table.integer("FkBrokerCompanyId");
    table.integer("FkBrokerIndividualId");

    table.decimal("EstimatedSecurityValue", 38, 4);
    table.decimal("MaximumLtv", 38, 4);
    table.string("InterestType");

    table.boolean("CalculateMaxFromSecurity");
    table.decimal("Gdv", 38, 4);
    table.decimal("MaximumGdltv", 38, 4);
    table.integer("BuildPeriod");
    table.decimal("FurtherDrawdownsAmount", 38, 4);

    table.decimal("InterestRate", 38, 4);
    table.decimal("ArrangementFeeTotal", 38, 4);
    table.decimal("ArrangementFeeBroker", 38, 4);
    table.decimal("OtherFees", 38, 4);
  });

exports.down = async (knex: Knex) =>
  await knex.schema.alterTable("Origination.Enquiry", async (table) => {
    table.string("Broker");

    table.integer("FkBuildingTypeId");
    table
      .foreign("FkBuildingTypeId")
      .references("BuildingTypeId")
      .inTable("Origination.DipBuildingType");

    table.string("LoanFacilityType");

    table.decimal("ApproximateLtvDay1", 38, 4);
    table.decimal("ApproximateGltv", 38, 4);
    table.decimal("ApproximateLtgdv", 38, 4);

    table.renameColumn("EnquiryName", "EnquirerName");
    table.renameColumn("NetLoanAmount", "LoanFacility");
    table.renameColumn("LoanPeriod", "LoanTerm");

    table.dropColumns(
      "FkBrokerCompanyId",
      "FkBrokerIndividualId",
      "EstimatedSecurityValue",
      "MaximumLtv",
      "InterestType",
      "CalculateMaxFromSecurity",
      "Gdv",
      "MaximumGdltv",
      "BuildPeriod",
      "FurtherDrawdownsAmount",
      "InterestRate",
      "ArrangementFeeTotal",
      "ArrangementFeeBroker",
      "OtherFees"
    );
  });
