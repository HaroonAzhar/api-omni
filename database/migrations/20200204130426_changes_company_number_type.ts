import * as Knex from "knex";

exports.up = async (knex: Knex) => {
  await knex.schema.alterTable("Origination_DIP_Company", (table) => {
    table.string("company_number").alter();
  });
};

exports.down = async (knex: Knex) => {
  try {
    await knex.schema.alterTable("Origination_DIP_Company", (table) => {
      table.integer("company_number").alter();
    });
  } catch (e) {
    console.error(e);
  }
};
