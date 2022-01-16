import * as Knex from "knex";
import { camelize, underscore } from "inflected";

interface Column {
  tableName: string;
  columnName: string;
}

interface Constrain {
  parentTableName: string;
  parentColumnName: string;
  referencedTableName: string;
  referencedColumnName: string;
  constrainName: string;
}

const getConstrainsSql = `
select parentTable.name as parentTableName, parentColumn.name as parentColumnName, referencedTable.name as referencedTableName, referencedColumn.name as referencedColumnName, fk.name as constrainName
from sys.foreign_key_columns as fk_column
left join sys.tables as parentTable on fk_column.parent_object_id = parentTable.object_id
left join sys.all_columns as parentColumn on fk_column.parent_column_id = parentColumn.column_id and parentColumn.object_id = parentTable.object_id

left join sys.tables as referencedTable on fk_column.referenced_object_id = referencedTable.object_id
left join sys.all_columns as referencedColumn on fk_column.referenced_column_id = referencedColumn.column_id and referencedColumn.object_id = referencedTable.object_id

left join sys.foreign_keys as fk on fk.object_id = fk_column.constraint_object_id

where schema_name(parentTable.schema_id) = 'Origination'
`;

const getOriginationColumnsSql = `
select 
tab.name as tableName, 
col.name as columnName
from sys.tables as tab
inner join sys.columns as col
    on tab.object_id = col.object_id
where schema_name(tab.schema_id) = 'Origination'
`;

exports.up = async (knex: Knex) => {
  const allConstrains: Constrain[] = await knex.raw(getConstrainsSql);

  await knex.schema
    .withSchema("Origination")
    .table("DipStatus", async (table) => {
      await table.dropUnique(
        ["status"],
        "origination_dip_status_status_unique"
      );
    });

  for (const constrain of allConstrains) {
    await knex.raw(
      `ALTER TABLE [Origination].[${constrain.parentTableName}] 
      DROP CONSTRAINT [${constrain.constrainName}]`
    );
  }
  const allColumns: Column[] = await knex.raw(getOriginationColumnsSql);
  for (const column of allColumns) {
    await knex.schema
      .withSchema("Origination")
      .alterTable(column.tableName, async (table) => {
        await table.renameColumn(
          column.columnName,
          camelize(column.columnName)
        );
      });
  }
  for (const constrain of allConstrains) {
    await knex.schema
      .withSchema("Origination")
      .table(constrain.parentTableName, async (table) => {
        await table
          .foreign(camelize(constrain.parentColumnName))
          .references(camelize(constrain.referencedColumnName))
          .inTable(`Origination.${constrain.referencedTableName}`);
      });
  }
};

exports.down = async (knex: Knex) => {
  const allConstrains: Constrain[] = await knex.raw(getConstrainsSql);

  for (const constrain of allConstrains) {
    await knex.raw(
      `ALTER TABLE [Origination].[${constrain.parentTableName}] 
        DROP CONSTRAINT [${constrain.constrainName}]`
    );
  }
  const allColumns: Column[] = await knex.raw(getOriginationColumnsSql);
  for (const column of allColumns) {
    await knex.schema
      .withSchema("Origination")
      .alterTable(column.tableName, async (table) => {
        await table.renameColumn(
          column.columnName,
          underscore(column.columnName)
        );
      });
  }
  for (const constrain of allConstrains) {
    await knex.schema
      .withSchema("Origination")
      .table(constrain.parentTableName, async (table) => {
        await table
          .foreign(underscore(constrain.parentColumnName))
          .references(underscore(constrain.referencedColumnName))
          .inTable(`Origination.${constrain.referencedTableName}`);
      });
  }
  await knex.schema
    .withSchema("Origination")
    .table("DipStatus", async (table) => {
      await table.unique(["status"], "origination_dip_status_status_unique");
    });
};
