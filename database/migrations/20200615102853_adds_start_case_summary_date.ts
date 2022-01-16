import * as Knex from "knex";

const columnName = "StartCaseSummaryDate";
const tableName = "Origination.CaseOverview";

exports.up = async (knex: Knex) =>
  await knex.schema.alterTable(tableName, (table) => {
    table.timestamp(columnName).defaultTo(knex.fn.now());
  });

const getDefaultConstrainNameQuery = async (columnName: string, knex: Knex) =>
  knex
    .select("constraints.name")
    .from("sys.default_constraints as constraints")
    .join(
      "sys.all_columns as columns",
      "constraints.parent_object_id",
      "columns.object_id"
    )
    .where({ "columns.name": columnName });

const removeDefaultConstrain = async (
  columnName: string,
  tableName: string,
  knex: Knex
) => {
  const [constrain] = await getDefaultConstrainNameQuery(columnName, knex);
  await knex.raw(
    `ALTER TABLE ${tableName}
    DROP CONSTRAINT [${constrain.name}]`
  );
};
exports.down = async (knex: Knex) => {
  await removeDefaultConstrain(columnName, tableName, knex);
  await knex.schema.alterTable(tableName, (table) => {
    table.dropColumns(columnName);
  });
};
