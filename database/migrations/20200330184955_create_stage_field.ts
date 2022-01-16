import * as Knex from "knex";

exports.up = async (knex: Knex) => {
  await knex.schema.alterTable("Origination.Case", async (table) => {
    await table.enu("Stage", ["dip", "application", "enquiry"]);
  });

  const getEnquiries = await knex.select().from("Origination.Dip");
  for (const data of getEnquiries) {
    let stage = "dip";
    if (data.IsEnquiry) {
      stage = "enquiry";
    }
    await knex
      .update({ Stage: stage })
      .into("Origination.Case")
      .where({ CaseId: data.FkCaseId });
  }

  const q = `
SELECT
    dc.Name
FROM sys.tables t
         INNER JOIN sys.default_constraints dc ON t.object_id = dc.parent_object_id
         INNER JOIN sys.columns c ON dc.parent_object_id = c.object_id AND c.column_id = dc.parent_column_id
WHERE c.Name = 'IsEnquiry' AND T.Name = 'Dip'`;
  const constraintQuery: any = await knex.schema.raw(q);

  await knex.schema.alterTable("Origination.Dip", async (table) => {
    await table.dropForeign(["IsEnquiry"], constraintQuery[0].Name);
  });

  await knex.schema.alterTable("Origination.Dip", async (table) => {
    await table.dropColumn("IsEnquiry");
  });
};

exports.down = async (knex: Knex) => {
  await knex.schema.alterTable("Origination.Case", (table) => {
    table.dropColumn("Stage");
  });

  await knex.schema.alterTable("Origination.Dip", (table) => {
    table.boolean("IsEnquiry").defaultTo(false);
  });
};
