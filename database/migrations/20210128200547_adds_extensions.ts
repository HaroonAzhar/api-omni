import * as Knex from "knex";

exports.up = async (knex: Knex) => {
  await knex.schema.createTable("Servicing.Extensions", (table) => {
    table.increments("ExtensionId").primary();

    table.integer("FkCompletedId");
    table.index("FkCompletedId");
    table
      .foreign("FkCompletedId")
      .references("CompletedId")
      .inTable("Servicing.Completed");

    table.timestamp("CreatedDate").defaultTo(knex.fn.now());

    table.timestamp("Date").defaultTo(knex.fn.now());
    table.decimal("InterestRate", 38, 4);
  });
};

exports.down = async (knex: Knex) => {
  await knex.schema.dropTable("Servicing.Extensions");
};
