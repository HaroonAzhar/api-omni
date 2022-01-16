import * as Knex from "knex";

exports.up = async (knex: Knex) => {
  await knex.schema.createTable("OriginationAdmin.Solicitors", (table) => {
    table.increments("Id").primary();
    table.timestamp("CreatedAt").defaultTo(knex.fn.now());
    table.string("Name");
    table.boolean("IsDeleted");

    table.integer("FkAddressId");
    table
      .foreign("FkAddressId")
      .references("Id")
      .inTable("Origination.Address");
  });
};

exports.down = async (knex: Knex) =>
  await knex.schema.dropTable("OriginationAdmin.Solicitors");
