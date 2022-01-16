import * as Knex from "knex";

exports.up = async (knex: Knex) => {
  await knex.schema.createTable("Origination_DIP_ContactValue", (table) => {
    table.increments("contact_value_id").primary();
    table.string("name", 255);
    table.string("email", 255);
    table.integer("fk_contact_id");
    table
      .foreign("fk_contact_id")
      .references("contact_id")
      .inTable("Origination_DIP_Contact");
  });

  await knex.schema.alterTable("Origination_DIP_Contact", (table) => {
    table.dropColumn("name");
    table.dropColumn("email");
  });
};

exports.down = async (knex: Knex) => {
  await knex.schema.alterTable("Origination_DIP_Contact", (table) => {
    table.string("name", 255);
    table.string("email", 255);
  });

  await knex.schema.alterTable("Origination_DIP_ContactValue", (table) => {
    table.dropForeign(["fk_contact_id"]);
    table.dropColumn("fk_contact_id");
  });

  await knex.schema.dropTable("Origination_DIP_ContactValue");
};
