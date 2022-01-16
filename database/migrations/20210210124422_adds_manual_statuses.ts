import * as Knex from "knex";

exports.up = async (knex: Knex) => {
  await knex.schema.createTable("Servicing.ManualStatuses", (table) => {
    table.increments("ManualStatusId").primary();

    table.integer("FkCompletedId");
    table.index("FkCompletedId");
    table
      .foreign("FkCompletedId")
      .references("CompletedId")
      .inTable("Servicing.Completed");

    table.timestamp("CreatedDate").defaultTo(knex.fn.now());

    table.timestamp("EffectiveFrom");
    table.string("Status");
    table.boolean("IsDeleted");
  });
};

exports.down = async (knex: Knex) => {
  await knex.schema.dropTable("Servicing.ManualStatuses");
};
