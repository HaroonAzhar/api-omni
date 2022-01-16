import * as Knex from "knex";

const tableName = "Origination.Ltv";

exports.up = async (knex: Knex) => {
  await knex.schema.createTable(tableName, (table) => {
    table.increments("LtvId").primary();

    table.integer("GrResFCRB").notNullable();
    table.integer("GrComFCRB").notNullable();
    table.integer("GrD1ResDevFCRB").notNullable();
    table.integer("GDResDevFCRB").notNullable();
    table.integer("GrComFCNS").notNullable();
    table.integer("GrResFCNS").notNullable();
    table.integer("GrComSCRB").notNullable();
    table.integer("GrComSCNS").notNullable();

    table.timestamp("CreatedAt").defaultTo(knex.fn.now());
  });
};

exports.down = async (knex: Knex) => {
  await knex.schema.dropTable(tableName);
};
