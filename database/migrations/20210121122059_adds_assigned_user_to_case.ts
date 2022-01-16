import * as Knex from "knex";

exports.up = async (knex: Knex) => {
  await knex.schema.alterTable("Origination.Case", (table) => {
    table.integer("FkAssignedUserId");

    table
      .foreign("FkAssignedUserId")
      .references("Id")
      .inTable("OriginationAdmin.Users");
  });
};

exports.down = async (knex: Knex) => {
  await knex.schema.alterTable("Origination.Case", (table) => {
    table.dropForeign(["FkAssignedUserId"]);
    table.dropColumn("FkAssignedUserId");
  });
};
