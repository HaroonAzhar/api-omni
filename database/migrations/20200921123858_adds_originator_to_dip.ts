import * as Knex from "knex";

const columnName = "FkOriginatorId";

exports.up = async (knex: Knex) => {
  await knex.schema.alterTable("Origination.Dip", (table) => {
    table.integer(columnName);
    table
      .foreign(columnName)
      .references("Id")
      .inTable("OriginationAdmin.Originators");
  });
};

exports.down = async (knex: Knex) => {
  await knex.schema.alterTable("Origination.Dip", (table) => {
    table.dropForeign([columnName]);
    table.dropColumn(columnName);
  });
};
