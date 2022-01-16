import * as Knex from "knex";

const tableName = "Origination.DipLoanFinancialDetails";
const defaultType = "value";
const valueTypeOfArrangementFee = "ValueTypeOfArrangementFee";
const valueTypeOfIntermediaryFee = "ValueTypeOfIntermediaryFee";

exports.up = async (knex: Knex) => {
  await knex.schema.alterTable(tableName, async (table) => {
    table.string(valueTypeOfArrangementFee);
    table.string(valueTypeOfIntermediaryFee);
  });
  await knex(tableName).update({
    [valueTypeOfArrangementFee]: defaultType,
    [valueTypeOfIntermediaryFee]: defaultType,
  });
};

exports.down = async (knex: Knex) => {
  await knex.schema.alterTable(tableName, async (table) => {
    table.dropColumn(valueTypeOfArrangementFee);
    table.dropColumn(valueTypeOfIntermediaryFee);
  });
};
