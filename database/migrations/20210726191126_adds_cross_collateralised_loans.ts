import * as Knex from "knex";

exports.up = async (knex: Knex) => {
  await knex.schema.createTable(
    "Origination.CrossCollateralisedLoans",
    (table) => {
      table.increments("CrossCollateralisedLoanId").primary();

      table.integer("FkCaseId");
      table.index("FkCaseId");
      table
        .foreign("FkCaseId")
        .references("CaseId")
        .inTable("Origination.Case");

      table.integer("FkOtherCaseId");
      table.index("FkOtherCaseId");
      table
        .foreign("FkOtherCaseId")
        .references("CaseId")
        .inTable("Origination.Case");

      table.string("CreatedBy");
      table.timestamp("CreatedDate").defaultTo(knex.fn.now());
    }
  );
};

exports.down = async (knex: Knex) => {
  await knex.schema.dropTable("Origination.CrossCollateralisedLoans");
};
