import * as Knex from "knex";

exports.up = async (knex: Knex) => {
  const distinctCases = await knex("Origination.ApplicationStep")
    .select()
    .distinct("FkCaseId")
    .where({ FkNameId: null });
  const stepNames = await knex("Origination.ApplicationStepName").select();

  for (const { FkCaseId } of distinctCases) {
    const [{ IntroducerType, ContactType }] = await knex("Origination.Dip")
      .select("IntroducerType", "ContactType")
      .leftJoin(
        "Origination.DipIntroducerType",
        "FkIntroducerId",
        "IntroducerId"
      )
      .leftJoin("Origination.DipContact", "FkContactId", "ContactId")
      .leftJoin(
        "Origination.DipContactType",
        "FkContactTypeId",
        "ContactTypeID"
      )
      .where({ FkCaseId });

    let caseStepNames = stepNames;

    if (IntroducerType !== "via_broker") {
      caseStepNames = caseStepNames.filter(
        ({ ApplicationStepName }) =>
          ApplicationStepName !== "introducer_details"
      );
    }

    if (ContactType !== "company") {
      caseStepNames = caseStepNames.filter(
        ({ ApplicationStepName }) => ApplicationStepName !== "company_details"
      );
    }

    const steps = await knex("Origination.ApplicationStep")
      .select()
      .where({ FkCaseId });

    for (let index = 0; index < caseStepNames.length; index++) {
      const { ApplicationStepId } = steps[index];
      const { ApplicationStepNameId } = caseStepNames[index];
      await knex("Origination.ApplicationStep")
        .update({ FkNameId: ApplicationStepNameId })
        .where({ ApplicationStepId });
    }
  }
};

exports.down = (knex: Knex) => knex.schema;
