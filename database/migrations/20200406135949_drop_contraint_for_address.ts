import * as Knex from "knex";

const findForeignByTable = (table: string, name: string) => {
  return `
select
       fk.name as Name
from sys.foreign_keys fk
         inner join sys.tables fk_tab
                    on fk_tab.object_id = fk.parent_object_id
         inner join sys.tables pk_tab
                    on pk_tab.object_id = fk.referenced_object_id
         cross apply (select col.[name] + ', '
                      from sys.foreign_key_columns fk_c
                               inner join sys.columns col
                                          on fk_c.parent_object_id = col.object_id
                                              and fk_c.parent_column_id = col.column_id
                      where fk_c.parent_object_id = fk_tab.object_id
                        and fk_c.constraint_object_id = fk.object_id
                      order by col.column_id
                      for xml path ('') ) D (column_names)
where fk_tab.name = '${table}' AND column_names = '${name},'`;
};

exports.up = async (knex: Knex) => {
  const constraintQuery: any = await knex.schema.raw(
    findForeignByTable("ApplicantAddressMapping", "FkApplicantId")
  );
  await knex.schema.alterTable(
    "Origination.ApplicantAddressMapping",
    (table) => {
      table.dropForeign(["FkApplicantId"], constraintQuery[0].Name);
    }
  );

  const constraintQuery2: any = await knex.schema.raw(
    findForeignByTable("ApplicantAccountant", "FkApplicantId")
  );

  await knex.schema.alterTable("Origination.ApplicantAccountant", (table) => {
    table.dropForeign(["FkApplicantId"], constraintQuery2[0].Name);
  });
};

exports.down = async (knex: Knex) => knex.schema;
