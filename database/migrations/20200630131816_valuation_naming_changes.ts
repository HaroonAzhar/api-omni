import * as Knex from "knex";

const tableName = "Origination.PropertyValuationReport";

exports.up = (knex: Knex) =>
  knex.schema.alterTable(tableName, (table) => {
    table.renameColumn("SingleMultiUnit", "NumberOfUnits");

    table.dropColumn("BuildTime");
    table.integer("BuildDuration");
    table.renameColumn("ProfessionalTeam", "Contractor");
    table.renameColumn("BuildingCostsPerSquareFoot", "BuildCostsPerSquareFoot");
  });

exports.down = (knex: Knex) =>
  knex.schema.alterTable(tableName, (table) => {
    table.renameColumn("NumberOfUnits", "SingleMultiUnit");

    table.string("BuildTime", 100);
    table.dropColumn("BuildDuration");
    table.renameColumn("Contractor", "ProfessionalTeam");
    table.renameColumn("BuildCostsPerSquareFoot", "BuildingCostsPerSquareFoot");
  });
