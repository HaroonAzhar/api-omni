import * as Knex from "knex";

exports.up = async (knex: Knex) => {
  await knex.schema.alterTable("Origination_DIP_DIP", (table) => {
    table.dropForeign(["fk_opfl_type_id"]);
    table.dropColumn("fk_opfl_type_id");
  });

  await knex.schema.alterTable("Origination_DIP_Security", (table) => {
    table.integer("fk_opfl_type_id");
    table
      .foreign("fk_opfl_type_id")
      .references("opfl_type_id")
      .inTable("Origination_DIP_OpflType");
  });
};

exports.down = async (knex: Knex) => {
  await knex.schema.alterTable("Origination_DIP_DIP", (table) => {
    table.integer("fk_opfl_type_id");
    table
      .foreign("fk_opfl_type_id")
      .references("opfl_type_id")
      .inTable("Origination_DIP_OpflType");
  });

  await knex.schema.alterTable("Origination_DIP_Security", (table) => {
    table.dropForeign(["fk_opfl_type_id"]);
    table.dropColumn("fk_opfl_type_id");
  });
};
