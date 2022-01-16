import * as Knex from "knex";

exports.up = async (knex: Knex) => {
  await knex.schema.createTable("Servicing.SecurityReleases", (table) => {
    table.increments("SecurityReleaseId").primary();

    table.integer("FkSecurityId").notNullable();
    table.index("FkSecurityId");
    table
      .foreign("FkSecurityId")
      .references("SecurityId")
      .inTable("Servicing.Securities");

    table.string("CreatedBy");

    table.timestamp("CreatedDate").defaultTo(knex.fn.now());

    table.text("Notes");
    table.decimal("SalePrice", 38, 4).notNullable();
    table.string("SaleType").notNullable();

    table.boolean("DisposalToConnectedParty").notNullable();
  });
};

exports.down = async (knex: Knex) => {
  await knex.schema.dropTable("Servicing.SecurityReleases");
};
