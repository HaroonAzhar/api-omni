import * as Knex from "knex";

exports.up = async (knex: Knex) => {
  await knex.schema.createTable(
    "Origination.ApplicantPropertyPortfolio",
    (table) => {
      table.increments("ApplicantPropertyPortfolioId").primary();
      table.boolean("IsWhereResides");
      table.string("AddressLine1");
      table.string("AddressLine2");
      table.string("Postcode");
      table.string("City");
      table.string("Country");
      table.string("NameOfLender");
      table.decimal("EstimatedValue", 38, 4);
      table.decimal("CurrentDebt", 38, 4);
      table.decimal("MonthlyMortgage", 38, 4);
      table.decimal("MonthlyRental", 38, 4);

      table.integer("FkApplicantId");
      table
        .foreign("FkApplicantId")
        .references("ApplicantId")
        .inTable("Origination.Applicant");
    }
  );
};

exports.down = async (knex: Knex) => {
  await knex.schema.dropTable("Origination.ApplicantPropertyPortfolio");
};
