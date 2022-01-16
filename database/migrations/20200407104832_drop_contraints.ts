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
    findForeignByTable("ApplicantCompany", "FkContactId")
  );
  await knex.schema.alterTable("Origination.ApplicantCompany", (table) => {
    table.dropForeign(["FkContactId"], constraintQuery[0].Name);
  });

  await knex.schema.alterTable("Origination.ApplicantCompany", (table) => {
    table
      .foreign("FkContactId")
      .references("ContactValueId")
      .inTable("Origination.DipContactValue");
  });
};

exports.down = async (knex: Knex) => knex.schema;
