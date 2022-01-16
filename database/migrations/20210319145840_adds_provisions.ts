import * as Knex from "knex";

exports.up = async (knex: Knex) => {
  await knex.schema.createTable("Servicing.Provisions", (table) => {
    table.increments("ProvisionId").primary();

    table.integer("FkCompletedId");
    table.index("FkCompletedId");
    table
      .foreign("FkCompletedId")
      .references("CompletedId")
      .inTable("Servicing.Completed");

    table.decimal("Amount", 38, 4);
    table.text("Description");
    table.string("CreatedBy");

    table.timestamp("CreatedDate").defaultTo(knex.fn.now());
    table.timestamp("ActualDate").defaultTo(knex.fn.now());
  });
};

exports.down = async (knex: Knex) => {
  await knex.schema.dropTable("Servicing.Provisions");
};
