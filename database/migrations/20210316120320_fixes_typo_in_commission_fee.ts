import * as Knex from "knex";

const tableName = "Origination.DipLoanFinancialDetails";
const commissionFee = "CommisionFee";
const commissionFeeFixed = "IntermediaryCommissionFeeValue";

const commissionFeePercent = "IntermediaryComissionFeePercent";
const commissionFeePercentFixed = "IntermediaryCommissionFeePercent";

exports.up = async (knex: Knex) => {
  await knex.schema.alterTable(tableName, async (table) => {
    table.renameColumn(commissionFee, commissionFeeFixed);
    table.renameColumn(commissionFeePercent, commissionFeePercentFixed);
  });
};

exports.down = async (knex: Knex) => {
  await knex.schema.alterTable(tableName, async (table) => {
    table.renameColumn(commissionFeeFixed, commissionFee);
    table.renameColumn(commissionFeePercentFixed, commissionFeePercent);
  });
};
