import * as Knex from "knex";

exports.up = async (knex: Knex) => {
  await knex.schema.createTable(
    "Origination.PropertyValuationReport",
    (table) => {
      table.increments("PropertyValuationReportId").primary();
      table.string("ValuationBasis", 100);
      table.string("ValuationMethod", 100);
      table.string("ReportDate", 100);
      table.string("InspectionDate", 100);
      table.decimal("MarketValue", 38, 4);
      table.decimal("DayValue", 38, 4);
      table.decimal("Gdv", 38, 4);
      table.string("DayGdv", 100);
      table.decimal("ReinstatementValue", 38, 4);
      table.string("TitleNo", 100);
      table.text("SecurityDescription");
      table.string("SecuritySubtype", 100);
      table.string("FirstChargeOutstanding", 100);
      table.string("SingleMultiUnit", 100);
      table.string("PlanningDetails", 100);
      table.string("Country", 100);
      table.boolean("NitrateNeutrality");
      table.string("BuildTime", 100);
      table.decimal("BuildCosts", 38, 4);
      table.string("CommencementDateOfWorks", 100);
      table.string("ProfessionalTeam", 100);
      table.decimal("PricePerSquareFoot", 38, 4);
      table.decimal("PricePerSquareMeters", 38, 4);
      table.decimal("TotalSquareFeet", 38, 4);
      table.decimal("TotalSquareMeters", 38, 4);
      table.decimal("TotalValue", 38, 4);
      table.integer("FkPropertyId");
      table
        .foreign("FkPropertyId")
        .references("CasePropertyId")
        .inTable("Origination.CaseProperty");
    }
  );
};

exports.down = async (knex: Knex) => {
  await knex.schema.dropTable("Origination.PropertyValuationReport");
};
