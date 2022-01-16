import * as Knex from "knex";

exports.up = async (knex: Knex) => {
  await knex.schema.createTable("Origination.AuditLog", (table) => {
    table.increments("AuditLogId").primary();
    table.timestamp("CreatedAt").defaultTo(knex.fn.now());
    table.string("Method");
    table.string("Url");
    table.integer("ResponseStatusCode");
    table.text("RequestBody");
    table.string("User");
  });
};

exports.down = async (knex: Knex) =>
  await knex.schema.dropTable("Origination.AuditLog");
