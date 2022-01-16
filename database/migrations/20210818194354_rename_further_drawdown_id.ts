import * as Knex from "knex";

exports.up = async (knex: Knex) => {
  await knex.schema.alterTable("Servicing.OriginationChecklists", (table) => {
    table.renameColumn("FkFurtherDrawdownId", "FkFurtherId");
    table.dropForeign(["FkFurtherDrawdownId"]);
  });
  await knex.schema.alterTable("Servicing.UnderwriterFlows", (table) => {
    table.renameColumn("FkFurtherDrawdownId", "FkFurtherId");
    table.dropForeign(["FkFurtherDrawdownId"]);
  });
};

exports.down = async (knex: Knex) => {
  await knex.schema.alterTable("Servicing.OriginationChecklists", (table) => {
    table.renameColumn("FkFurtherId", "FkFurtherDrawdownId");
    table
      .foreign("FkFurtherDrawdownId")
      .references("FurtherDrawdownId")
      .inTable("Servicing.FurtherDrawdowns");
  });

  await knex.schema.alterTable("Servicing.UnderwriterFlows", (table) => {
    table.renameColumn("FkFurtherId", "FkFurtherDrawdownId");
    table
      .foreign("FkFurtherDrawdownId")
      .references("FurtherDrawdownId")
      .inTable("Servicing.FurtherDrawdowns");
  });
};
