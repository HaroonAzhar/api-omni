import * as Knex from "knex";

exports.up = async (knex: Knex) => {
  await knex.schema.createTable("Servicing.Adjustments", (table) => {
    table.increments("AdjustmentId").primary();

    table.integer("FkCompletedId");
    table.index("FkCompletedId");
    table
      .foreign("FkCompletedId")
      .references("CompletedId")
      .inTable("Servicing.Completed");

    table.decimal("Amount", 38, 4);
    table.string("TransactionType");
    table.string("Description", 1000);
    table.string("BalanceEffect");

    table.timestamp("Date").defaultTo(knex.fn.now());

    table.timestamp("ActualDate");
  });
};

exports.down = async (knex: Knex) => {
  await knex.schema.dropTable("Servicing.Adjustments");
};
