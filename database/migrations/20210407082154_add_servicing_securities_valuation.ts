import * as Knex from "knex";

exports.up = async (knex: Knex) => {
  await knex.schema.createTable("Servicing.SecurityValuations", (table) => {
    table.increments("SecurityValuationId").primary();

    table.integer("FkSecurityId").notNullable();
    table.index("FkSecurityId");
    table
      .foreign("FkSecurityId")
      .references("SecurityId")
      .inTable("Servicing.Securities");

    table.string("CreatedBy");

    table.timestamp("CreatedDate").defaultTo(knex.fn.now());

    table.string("Valuer").notNullable();
    table.timestamp("ValuationDate").notNullable();
    table.timestamp("ReportDate").notNullable();
    table.string("RecipientName").notNullable();
    table.string("ValuationType").notNullable();

    table.string("ValuationTypeOther");
    table.text("Notes");

    table.decimal("Valuation", 38, 4).notNullable();
    table.decimal("GDV", 38, 4).notNullable();

    table.integer("FkPropertyValuationReportId");
    table.index("FkPropertyValuationReportId");
    table
      .foreign("FkPropertyValuationReportId")
      .references("PropertyValuationReportId")
      .inTable("Origination.PropertyValuationReport");
  });
};

exports.down = async (knex: Knex) => {
  await knex.schema.dropTable("Servicing.SecurityValuations");
};
