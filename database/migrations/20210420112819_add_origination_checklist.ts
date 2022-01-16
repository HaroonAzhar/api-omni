import * as Knex from "knex";

exports.up = async (knex: Knex) => {
  await knex.schema.createTable("Servicing.OriginationChecklists", (table) => {
    table.increments("OriginationChecklistId").primary();

    table.integer("FkFurtherDrawdownId");
    table.index("FkFurtherDrawdownId");
    table
      .foreign("FkFurtherDrawdownId")
      .references("FurtherDrawdownId")
      .inTable("Servicing.FurtherDrawdowns");

    table.string("InitialCheckUser");
    table.timestamp("InitialCheckDate");

    table.string("FinalSignOfUser");
    table.timestamp("FinalSignOfDate");
  });
};

exports.down = async (knex: Knex) => {
  await knex.schema.dropTable("Servicing.OriginationChecklists");
};
