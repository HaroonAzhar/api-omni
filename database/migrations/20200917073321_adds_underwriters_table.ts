import * as Knex from "knex";

exports.up = async (knex: Knex) => {
  await knex.schema.createTable("OriginationAdmin.Underwriters", (table) => {
    table.increments("Id").primary();
    table.timestamp("CreatedAt").defaultTo(knex.fn.now());
    table.string("Name");
    table.boolean("IsDeleted");
  });
};

exports.down = async (knex: Knex) =>
  await knex.schema.dropTable("OriginationAdmin.Underwriters");
