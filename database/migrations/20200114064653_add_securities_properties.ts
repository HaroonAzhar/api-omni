import * as Knex from "knex";

exports.up = (knex: Knex) =>
  knex.schema.table("Origination_DIP_Security", (table) => {
    table.boolean("is_manual_edit_visible");
    table.string("security_address", 255);
    table.string("security_address_line_1", 255);
    table.string("security_address_line_2", 255);
    table.string("security_town_city", 255);
    table.string("security_postcode", 255);
    table.string("security_country", 255);
    table.float("security_initial_estimation");
    table.dropColumn("address");
  });

exports.down = (knex: Knex) =>
  knex.schema.table("Origination_DIP_Security", (table) => {
    table.dropColumn("is_manual_edit_visible");
    table.dropColumn("security_address");
    table.dropColumn("security_address_line_1");
    table.dropColumn("security_address_line_2");
    table.dropColumn("security_town_city");
    table.dropColumn("security_postcode");
    table.dropColumn("security_country");
    table.dropColumn("security_initial_estimation");
    table.string("address", 255);
  });
