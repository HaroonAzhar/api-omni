import * as Knex from "knex";

exports.up = (knex: Knex) =>
  knex.schema.alterTable("Origination_DIP_DIP", (table) => {
    table.integer("fk_introducer_id").unsigned();
    table
      .foreign("fk_introducer_id")
      .references("Origination_DIP_Introducer.introducer_id");
  });

exports.down = (knex: Knex) =>
  knex.schema.table("Origination_DIP_DIP", (table) => {
    table.dropForeign(["fk_introducer_id"]);
    table.dropColumn("fk_introducer_id");
  });
