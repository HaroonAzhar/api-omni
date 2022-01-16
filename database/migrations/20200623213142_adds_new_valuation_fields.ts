import * as Knex from "knex";

exports.up = (knex: Knex) =>
  knex.schema.alterTable("Origination.PropertyValuationReport", (table) => {
    table.string("NameOfTheIndividualSurveyor");
    table.boolean("PlanningRequired");
    table.string("LinkToPlanningPermission");
    table.decimal("BuildingCostsPerSquareFoot", 38, 4);
    table.decimal("BuildCostsPerSquareMeter", 38, 4);
    table.string("ProjectManager");
    table.string("Architect");
    table.string("StructuralEngineer");
    table.string("OtherRelevantSubcontractors");
    table.text("OmniExperienceWithTheProfessionalTeam");
  });

exports.down = (knex: Knex) =>
  knex.schema.alterTable("Origination.PropertyValuationReport", (table) => {
    table.dropColumn("NameOfTheIndividualSurveyor");
    table.dropColumn("PlanningRequired");
    table.dropColumn("LinkToPlanningPermission");
    table.dropColumn("BuildingCostsPerSquareFoot");
    table.dropColumn("BuildCostsPerSquareMeter");
    table.dropColumn("ProjectManager");
    table.dropColumn("Architect");
    table.dropColumn("StructuralEngineer");
    table.dropColumn("OtherRelevantSubcontractors");
    table.dropColumn("OmniExperienceWithTheProfessionalTeam");
  });
