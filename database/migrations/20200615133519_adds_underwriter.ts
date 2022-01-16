import * as Knex from "knex";

const tableName = "Origination.CaseOverview";
const columnName = "Underwriter";

exports.up = async (knex: Knex) =>
  await knex.schema.alterTable(tableName, (table) => {
    table.string(columnName, 255);
  });

exports.down = async (knex: Knex) =>
  await knex.schema.alterTable(tableName, (table) => {
    table.dropColumns(columnName);
  });
