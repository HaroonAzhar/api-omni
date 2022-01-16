import * as Knex from "knex";

import Seeds from "../seeds";

interface Step {
  FkCaseId: string;
  ApplicationStepId: string;
  ApplicationStepName: string;
}

interface StepName {
  ApplicationStepNameId: string;
  ApplicationStepName: string;
}

const getExistingApplicationSteps = (knex: Knex) =>
  knex("Origination.ApplicationStep as steps")
    .join(
      "Origination.ApplicationStepName as names",
      "names.ApplicationStepNameId",
      "=",
      "steps.FkNameId"
    )
    .select<Step[]>("ApplicationStepId", "ApplicationStepName", "FkCaseId");

const groupStepsByCase = (existingApplicationSteps: Step[]) => {
  const casesSteps: { [key: string]: Step[] } = {};

  existingApplicationSteps.forEach((step: Step) => {
    casesSteps[step.FkCaseId] = [
      ...(casesSteps[step.FkCaseId] ? casesSteps[step.FkCaseId] : []),
      step,
    ];
  });
  return casesSteps;
};

const getStepNames = (knex: Knex) =>
  knex("Origination.ApplicationStepName").select<StepName[]>(
    "ApplicationStepNameId",
    "ApplicationStepName"
  );

const getNewStatusId = async (knex: Knex) => {
  const ApplicationStepStatusType = "New";
  const [{ ApplicationStepStatusId: FkStatusId }] = await knex(
    "Origination.ApplicationStepStatusType"
  )
    .select("ApplicationStepStatusId")
    .where({ ApplicationStepStatusType });
  return FkStatusId;
};

const getNewStepNameIds = (stepNames: StepName[], newStep: string) =>
  stepNames
    .filter((stepName: StepName) => stepName.ApplicationStepName === newStep)
    .map((stepName: StepName) => stepName.ApplicationStepNameId);

exports.up = async (knex: Knex) => {
  const seed = new Seeds(knex);
  await seed.run(false);

  const existingApplicationSteps = await getExistingApplicationSteps(knex);

  const stepNames = await getStepNames(knex);

  const FkStatusId = await getNewStatusId(knex);

  const casesSteps = groupStepsByCase(existingApplicationSteps);

  const newStep = "company_structure";
  for (const [FkCaseId, listOfSteps] of Object.entries(casesSteps)) {
    const [FkNameId] = getNewStepNameIds(stepNames, newStep);
    const newStepsAlreadyExisting = listOfSteps.filter(
      (step: Step) => step.ApplicationStepName === newStep
    );
    const company_steps = listOfSteps.filter(
      (step: Step) => step.ApplicationStepName === "company_details"
    );
    if (newStepsAlreadyExisting.length === 0 && company_steps.length > 0) {
      const insertData = {
        FkStatusId,
        FkCaseId,
        FkNameId,
        Edited: new Date(),
      };
      await knex("Origination.ApplicationStep").insert(insertData);
    }
  }
};

// eslint-disable-next-line @typescript-eslint/no-empty-function
exports.down = async (knex: Knex) => {};
