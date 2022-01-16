import * as Knex from "knex";

import Seeds from "../seeds";

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
  await knex.schema.alterTable("Origination.Case", (table) => {
    table.dateTime("CreatedAt");
  });

  const seed = new Seeds(knex);
  await seed.run(false, "adds_new_case_statuses.ts");

  const data = await knex
    .select(["CreatedAt", "FkCaseId"])
    .from("Origination.Dip");
  for (const value of data) {
    await knex
      .update({ CreatedAt: value.CreatedAt })
      .where({ CaseId: value.FkCaseId })
      .into("Origination.Case");
  }

  const statusData = await knex.select().from("Origination.CaseStatus");
  const pendingStatus = statusData.filter(
    (record: { Name: string }) => record.Name === "pending"
  );
  if (!pendingStatus.length) throw new Error("Cannot Find Status pending");
  await knex
    .update({ FkCaseStatusId: pendingStatus[0].CaseStatusId })
    .whereNull("FkCaseStatusId")
    .into("Origination.Case");

  const constraintQuery: any = await knex.schema.raw(
    findForeignByTable("Dip", "FkStatusId")
  );
  await knex.schema.alterTable("Origination.Dip", (table) => {
    table.dropColumn("CreatedAt");
    table.dropForeign(["FkStatusId"], constraintQuery[0].Name);
    table.dropColumn("FkStatusId");
  });

  await knex.schema.dropTable("Origination.DipStatus");
};

exports.down = async (knex: Knex) => {
  await knex.schema.alterTable("Origination.Case", (table) => {
    table.dropColumn("CreatedAt");
  });
};
