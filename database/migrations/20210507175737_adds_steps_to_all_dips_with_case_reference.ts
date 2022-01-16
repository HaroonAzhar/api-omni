import * as Knex from "knex";

import {
  DIP_SUMMARY,
  dipStepNames,
} from "../../src/v2/modules/cases/dip/dip.interface";

exports.up = async (knex: Knex) => {
  const dipTable = "Origination.Dip";
  const dips = await knex(dipTable).select();
  const stepsTable = "Origination.DipSteps";
  for (const dip of dips) {
    knex(stepsTable).insert({
      EditedDate: new Date(),
      Name: DIP_SUMMARY,
      FkDipId: dip.DipId,
    });
  }
  const finalizedCases = await knex("Origination.Case")
    .leftJoin(dipTable, "CaseId", "FkCaseId")
    .whereNotNull("CaseNr")
    .andWhereNot("Stage", "=", "enquiry");

  const otherSteps = dipStepNames.filter((step) => step != DIP_SUMMARY);
  for (const dip of finalizedCases) {
    for (const otherStepName of otherSteps) {
      knex(stepsTable).insert({
        EditedDate: new Date(),
        Name: otherStepName,
        FkDipId: dip.DipId,
      });
    }
  }
};

exports.down = (knex: Knex) => knex.schema;
