import * as Knex from "knex";

exports.up = async (knex: Knex) => {
  const tableName = "Origination.ApplicationStep";

  const groupKeys = ["FkCaseId", "FkNameId"];
  const casesWithDuplicates = await knex(tableName)
    .select(groupKeys)
    .groupBy(groupKeys)
    .having(knex.raw("count(*) > 1"));

  for (const groupedData of casesWithDuplicates) {
    const steps = await knex(tableName)
      .select([
        "Origination.ApplicationStep.ApplicationStepId as ApplicationStepId",
        "Origination.ApplicationStepName.ApplicationStepName as name",
        "Origination.ApplicationStep.Edited as edited",
        "Origination.ApplicationStepStatusType.ApplicationStepStatusType as status",
      ])
      .leftJoin(
        "Origination.ApplicationStepStatusType",
        "ApplicationStep.FkStatusId",
        "ApplicationStepStatusType.ApplicationStepStatusId"
      )
      .leftJoin(
        "Origination.ApplicationStepName",
        "ApplicationStep.FkNameId",
        "ApplicationStepName.ApplicationStepNameId"
      )
      .where(groupedData)
      .orderBy("edited");

    const recheckSteps = steps.filter((step) => step.status === "Recheck");
    if (recheckSteps.length > 0) {
      await knex(tableName)
        .delete()
        .where(groupedData)
        .andWhereNot({ ApplicationStepId: recheckSteps[0].ApplicationStepId });
      break;
    }

    const editedSteps = steps.filter((step) => step.status === "Edited");
    if (editedSteps.length > 0) {
      await knex(tableName)
        .delete()
        .where(groupedData)
        .andWhereNot({ ApplicationStepId: editedSteps[0].ApplicationStepId });
      break;
    }

    await knex(tableName)
      .delete()
      .where(groupedData)
      .andWhereNot({ ApplicationStepId: steps[0].ApplicationStepId });
  }
};

exports.down = (knex: Knex) => knex.schema;
