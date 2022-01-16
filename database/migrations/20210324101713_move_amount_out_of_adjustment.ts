import * as Knex from "knex";

import { adjustmentInitialCorrection } from "../../src/v2/modules/cases/completed/adjustments/adjustment.interface";

exports.up = async (knex: Knex) => {
  const adjustments = await knex("Servicing.Adjustments").select();

  for (const adjustment of adjustments) {
    const { AdjustmentId, Amount } = adjustment;

    await knex("Servicing.AdjustmentCorrections").insert({
      FkAdjustmentId: AdjustmentId,
      CorrectedAmount: Amount,
      Description: adjustmentInitialCorrection,
    });
  }
  await knex.schema.alterTable("Servicing.Adjustments", (table) => {
    table.dropColumn("Amount");
  });
};

exports.down = async (knex: Knex) => {
  await knex.schema.alterTable("Servicing.Adjustments", (table) => {
    table.decimal("Amount", 38, 4);
  });

  const adjustmentCorrections = await knex(
    "Servicing.AdjustmentCorrections"
  ).select();

  for (const adjustmentCorrection of adjustmentCorrections) {
    const {
      FkAdjustmentId,
      CorrectedAmount,
      Description,
      AdjustmentCorrectionId,
    } = adjustmentCorrection;
    if (Description !== adjustmentInitialCorrection) {
      continue;
    }

    await knex("Servicing.Adjustments")
      .update({
        Amount: CorrectedAmount,
      })
      .where({ AdjustmentId: FkAdjustmentId });

    await knex("Servicing.AdjustmentCorrections")
      .delete()
      .where({ AdjustmentCorrectionId });
  }
};
