import * as Knex from "knex";

exports.up = async (knex: Knex) => {
  const furtherDrawdowns = await knex("Servicing.FurtherDrawdowns").select();

  for (const { FurtherDrawdownId } of furtherDrawdowns) {
    const [underwriterFlow] = await knex("Servicing.UnderwriterFlows")
      .select()
      .where({ FkFurtherDrawdownId: FurtherDrawdownId });

    if (underwriterFlow !== undefined) {
      break;
    }

    await knex("Servicing.UnderwriterFlows").insert({
      FkFurtherDrawdownId: FurtherDrawdownId,
    });
  }
};

exports.down = (knex: Knex) => knex.schema;
