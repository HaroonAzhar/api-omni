import * as Knex from "knex";

exports.up = async (knex: Knex) => {
  await knex.schema.createTable("Servicing.SecurityConversions", (table) => {
    table.increments("SecurityConversionId").primary();

    table.integer("FkSecurityId").notNullable();
    table.index("FkSecurityId");
    table
      .foreign("FkSecurityId")
      .references("SecurityId")
      .inTable("Servicing.Securities");

    table.string("CreatedBy");

    table.timestamp("CreatedDate").defaultTo(knex.fn.now());

    table.text("Notes");
  });
};

exports.down = async (knex: Knex) => {
  await knex.schema.dropTable("Servicing.SecurityConversions");
};
