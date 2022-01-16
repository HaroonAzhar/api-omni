import * as Knex from "knex";

exports.up = async (knex: Knex) => {
  await knex.schema.createTable("Servicing.EstimatedRedemptions", (table) => {
    table.increments("EstimatedRedemptionId").primary();

    table.integer("FkCompletedId");
    table.index("FkCompletedId");
    table
      .foreign("FkCompletedId")
      .references("CompletedId")
      .inTable("Servicing.Completed");

    table.integer("FkSecurityId");
    table.index("FkSecurityId");
    table
      .foreign("FkSecurityId")
      .references("SecurityId")
      .inTable("Servicing.Securities");

    table.decimal("Amount", 38, 4);

    table.timestamp("Date").notNullable();

    table.string("CreatedBy");
    table.timestamp("CreatedDate").defaultTo(knex.fn.now());
  });
};

exports.down = async (knex: Knex) => {
  await knex.schema.dropTable("Servicing.EstimatedRedemptions");
};
