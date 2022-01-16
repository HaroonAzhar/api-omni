import * as Knex from "knex";

const tableName = "Origination.CaseOverview";
const columnName = "ValuationNotes";

exports.up = async (knex: Knex) =>
  await knex.schema.alterTable(tableName, (table) => table.text(columnName));

exports.down = async (knex: Knex) =>
  await knex.schema.alterTable(tableName, (table) =>
    table.dropColumns(columnName)
  );
