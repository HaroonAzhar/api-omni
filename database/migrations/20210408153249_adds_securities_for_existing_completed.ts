import * as Knex from "knex";

exports.up = async (knex: Knex) => {
  const completedCases = await knex("Origination.Case")
    .select()
    .where({ Stage: "completed" });

  for (const completedCase of completedCases) {
    const properties = await knex("Origination.CaseProperty").where({
      FkCaseId: completedCase.CaseId,
    });

    const [completed] = await knex("Servicing.Completed").where({
      FkCaseId: completedCase.CaseId,
    });

    for (const property of properties) {
      const FkSecurityId = await knex("Servicing.Securities").insert(
        {
          FkCompletedId: completed.CompletedId,
          FkCasePropertyId: property.CasePropertyId,
        },
        ["SecurityId"]
      );
      const [valuationReport = {}] = await knex(
        "Origination.PropertyValuationReport"
      ).where({
        FkPropertyId: property.CasePropertyId,
      });

      await knex("Servicing.SecurityValuations").insert(
        {
          FkSecurityId,
          GDV: valuationReport?.Gdv ?? 0,
          Valuation: valuationReport?.MarketValue ?? 0,
          ReportDate: valuationReport?.ReportDate ?? "",
          ValuationType: `Full Valuation`,
          ValuationDate: valuationReport?.InspectionDate ?? "",
          Valuer: `${valuationReport?.Surveyor ?? ""} ${
            valuationReport?.NameOfTheIndividualSurveyor ?? ""
          }`,
          RecipientName: "",
          CreatedBy: "",
          FkPropertyValuationReportId:
            valuationReport?.PropertyValuationReportId,
        },
        ["SecurityValuationId"]
      );
    }
  }
};

exports.down = (knex: Knex) => knex.schema;
