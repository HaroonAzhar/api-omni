import * as Knex from "knex";

exports.up = async (knex: Knex) => {
  await knex.schema.createTable("Servicing.ExpectedDrawdowns", (table) => {
    table.increments("ExpectedDrawdownId").primary();

    table.integer("FkCompletedId");
    table.index("FkCompletedId");
    table
      .foreign("FkCompletedId")
      .references("CompletedId")
      .inTable("Servicing.Completed");

    table.decimal("Amount", 38, 4).notNullable();

    table.timestamp("Date").notNullable();

    table.string("CreatedBy");
    table.timestamp("CreatedDate").defaultTo(knex.fn.now());
  });
};

exports.down = async (knex: Knex) => {
  await knex.schema.dropTable("Servicing.ExpectedDrawdowns");
};
