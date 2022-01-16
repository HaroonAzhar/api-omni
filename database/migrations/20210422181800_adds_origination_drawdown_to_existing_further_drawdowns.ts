import * as Knex from "knex";

exports.up = async (knex: Knex) => {
  const furtherDrawdowns = await knex("Servicing.FurtherDrawdowns").select();

  for (const { FurtherDrawdownId } of furtherDrawdowns) {
    const [originationChecklist] = await knex("Servicing.OriginationChecklists")
      .select()
      .where({ FkFurtherDrawdownId: FurtherDrawdownId });

    if (originationChecklist !== undefined) {
      break;
    }

    const FkOriginationChecklistId = await knex(
      "Servicing.OriginationChecklists"
    ).insert(
      {
        FkFurtherDrawdownId: FurtherDrawdownId,
      },
      ["OriginationChecklistId"]
    );

    await knex("Servicing.OriginationChecklistSolicitors").insert({
      FkOriginationChecklistId,
    });
    await knex("Servicing.OriginationChecklistDrawDownRequests").insert({
      FkOriginationChecklistId,
    });
    await knex("Servicing.OriginationChecklistCreditSafes").insert({
      FkOriginationChecklistId,
    });
    await knex("Servicing.OriginationChecklistLandCharges").insert({
      FkOriginationChecklistId,
    });
    await knex("Servicing.OriginationChecklistLandRegistry").insert({
      FkOriginationChecklistId,
    });
    await knex("Servicing.OriginationChecklistInsurances").insert({
      FkOriginationChecklistId,
    });
    await knex("Servicing.OriginationChecklistDocuments").insert({
      FkOriginationChecklistId,
    });
    await knex("Servicing.OriginationChecklistExperians").insert({
      FkOriginationChecklistId,
    });
    await knex("Servicing.OriginationChecklistAmls").insert({
      FkOriginationChecklistId,
    });
    await knex("Servicing.OriginationChecklistReinspectionValuations").insert({
      FkOriginationChecklistId,
    });
  }
};

exports.down = (knex: Knex) => knex.schema;
