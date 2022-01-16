import * as Knex from "knex";

const tableName = "Origination.CaseOverview";
const oldColumnName = "ValuationNotes";
const newColumnName = "AnalysisOfProperty";

exports.up = async (knex: Knex) =>
  await knex.schema.alterTable(tableName, (table) =>
    table.renameColumn(oldColumnName, newColumnName)
  );

exports.down = async (knex: Knex) =>
  await knex.schema.alterTable(tableName, (table) =>
    table.renameColumn(newColumnName, oldColumnName)
  );
