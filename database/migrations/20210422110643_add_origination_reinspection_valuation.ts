import * as Knex from "knex";

exports.up = async (knex: Knex) => {
  await knex.schema.createTable(
    "Servicing.OriginationChecklistReinspectionValuations",
    (table) => {
      table.increments("OriginationChecklistReinspectionValuationId").primary();

      table.integer("FkOriginationChecklistId");
      table.index("FkOriginationChecklistId");
      table
        .foreign("FkOriginationChecklistId")
        .references("OriginationChecklistId")
        .inTable("Servicing.OriginationChecklists");

      table.string("PrimarySignatureUser");
      table.timestamp("PrimarySignatureDate");

      table.string("SecondarySignatureUser");
      table.timestamp("SecondarySignatureDate");

      table.boolean("ValuerOnApproved");
      table.boolean("SignedAndDated");
      table.boolean("AddressedToCorrect");
      table.boolean("Within3Months");
      table.boolean("AddressMatches");
    }
  );
};

exports.down = async (knex: Knex) => {
  await knex.schema.dropTable(
    "Servicing.OriginationChecklistReinspectionValuations"
  );
};
