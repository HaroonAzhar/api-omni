import * as Knex from "knex";

exports.up = (knex: Knex) =>
  knex.schema.createTable("Origination.CaseOverview", (table) => {
    table.increments("CaseOverviewId").primary();
    table.text("OverviewExecutiveSummary");
    table.text("OverviewUnderwriterRationale");
    table.text("SecurityDescriptionOfProperty");
    table.text("SecurityDescriptionOfWorks");
    table.text("ValuerName");
    table.text("Risk");
    table.text("Mitigation");
    table.text("FurtherExitStrategy");
    table.text("FurtherOngoingMonitoring");
    table.text("SpecialConditions");
    table.text("BorrowerComments");
    table.integer("FkCaseId");
    table.foreign("FkCaseId").references("CaseId").inTable("Origination.Case");
  });

exports.down = (knex: Knex) =>
  knex.schema.dropTable("Origination.CaseOverview");
