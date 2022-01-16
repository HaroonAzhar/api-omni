import * as Knex from "knex";

exports.up = async (knex: Knex) => {
  await knex.schema.createTable("Origination.CaseProperty", (table) => {
    table.increments("CasePropertyId").primary();
    table.boolean("AlreadyOwned");
    table.boolean("BeingPurchased");
    table.decimal("CurrentValue", 38, 4);
    table.decimal("ValueAfterWorks", 38, 4);
    table.decimal("PurchasePrice", 38, 4);
    table.string("PurposeOfBorrowings");
    table.string("PropertyType");
    table.boolean("IsNewBuild");
    table.boolean("IsStandardConstruction");
    table.boolean("IsPlanningRequired");
    table.boolean("IsOccupied");
    table.string("BasisForOccupation");
    table.string("Intentions");
    table.string("ContactForAccessValuation");
    table.string("ContactForPaymentValuation");
    table.string("OpflChargeType");
    table.text("Lenders");
    table.decimal("CurrentMortgageOutstanding", 38, 4);
    table.string("AddressLine1");
    table.string("AddressLine2");
    table.string("AddressPostcode");
    table.string("AddressCity");
    table.string("AddressCountry");
    table.integer("FkCaseId");
    table.foreign("FkCaseId").references("CaseId").inTable("Origination.Case");
  });
};

exports.down = async (knex: Knex) => {
  await knex.schema.dropTable("Origination.CaseProperty");
};
