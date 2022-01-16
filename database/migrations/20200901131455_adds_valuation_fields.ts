import * as Knex from "knex";

exports.up = (knex: Knex) =>
  knex.schema.alterTable("Origination.PropertyValuationReport", (table) => {
    table.boolean("ListedGrade");
    table.boolean("Sang");
    table.boolean("Sssi");
    table.boolean("Anob");
    table.boolean("FloodZone");
    table.boolean("GreenBelt");
  });

exports.down = (knex: Knex) =>
  knex.schema.alterTable("Origination.PropertyValuationReport", (table) => {
    table.dropColumn("ListedGrade");
    table.dropColumn("Sang");
    table.dropColumn("Sssi");
    table.dropColumn("Anob");
    table.dropColumn("FloodZone");
    table.dropColumn("GreenBelt");
  });
