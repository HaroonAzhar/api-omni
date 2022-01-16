import * as Knex from "knex";

exports.up = async (knex: Knex) => {
  await knex.schema.alterTable("Servicing.Adjustments", (table) => {
    table.string("InternalNote", 1000);
  });
};

exports.down = async (knex: Knex) => {
  await knex.schema.alterTable("Servicing.Adjustments", (table) => {
    table.dropColumn("InternalNote");
  });
};
