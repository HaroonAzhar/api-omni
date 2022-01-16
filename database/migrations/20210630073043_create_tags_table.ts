import * as Knex from "knex";

exports.up = async (knex: Knex) => {
  await knex.schema.createTable("OriginationAdmin.Tags", (table) => {
    table.increments("Id").primary();
    table.timestamp("CreatedAt").defaultTo(knex.fn.now());
    table.string("Name");
    table.string("ColorCode");
    table.boolean("IsDeleted");
  });
};

exports.down = async (knex: Knex) =>
  await knex.schema.dropTable("OriginationAdmin.Tags");
