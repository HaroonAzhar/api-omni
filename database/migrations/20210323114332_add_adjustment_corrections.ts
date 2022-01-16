import * as Knex from "knex";

exports.up = async (knex: Knex) => {
  await knex.schema.createTable("Servicing.AdjustmentCorrections", (table) => {
    table.increments("AdjustmentCorrectionId").primary();

    table.integer("FkAdjustmentId");
    table.index("FkAdjustmentId");
    table
      .foreign("FkAdjustmentId")
      .references("AdjustmentId")
      .inTable("Servicing.Adjustments");

    table.decimal("CorrectedAmount", 38, 4).notNullable();
    table.text("Description").notNullable();

    table.string("CreatedBy");

    table.timestamp("CreatedDate").defaultTo(knex.fn.now());
  });
};

exports.down = async (knex: Knex) => {
  await knex.schema.dropTable("Servicing.AdjustmentCorrections");
};
