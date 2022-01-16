import * as Knex from "knex";

exports.up = async (knex: Knex) => {
  await knex.schema.createTable("Servicing.UnderwriterFlows", (table) => {
    table.increments("UnderwriterFlowId").primary();

    table.integer("FkFurtherDrawdownId");
    table.index("FkFurtherDrawdownId");
    table
      .foreign("FkFurtherDrawdownId")
      .references("FurtherDrawdownId")
      .inTable("Servicing.FurtherDrawdowns");

    table.integer("FkUnderwriterId");
    table.timestamp("WriteUpDate");
    table.string("AssessmentOfExitViability");

    table.text("DescriptionOfWorks");
    table.text("AssessmentOfProgress");
    table.text("RisksConcerns");

    table.timestamp("UnderwriterApprovalDate");

    table.text("ReturnComment");
    table.timestamp("ReturnDate");
  });
};

exports.down = async (knex: Knex) => {
  await knex.schema.dropTable("Servicing.UnderwriterFlows");
};
