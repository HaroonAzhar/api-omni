import * as Knex from "knex";

exports.up = async (knex: Knex) => {
  await knex.schema.alterTable("Origination.Applicant", (table) => {
    table.renameColumn("MartialStatus", "MaritalStatus");
  });
  await knex.schema.alterTable("Origination.Applicant", (table) => {
    table.renameColumn("MartialOtherValue", "MaritalOtherValue");
  });
};

exports.down = async (knex: Knex) => {
  await knex.schema.alterTable("Origination.Applicant", (table) => {
    table.renameColumn("MaritalStatus", "MartialStatus");
  });
  await knex.schema.alterTable("Origination.Applicant", (table) => {
    table.renameColumn("MaritalOtherValue", "MartialOtherValue");
  });
};
