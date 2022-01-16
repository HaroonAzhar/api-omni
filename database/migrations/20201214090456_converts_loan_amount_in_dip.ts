import * as Knex from "knex";

const tableName = "Origination.DipLoanFinancialDetails";
exports.up = async (knex: Knex) => {
  const toChange = await knex(tableName)
    .select("LoanFinancialDetailsId", "StartingPoint", "ValueTypeOfLoanAmount")
    .where({ StartingPoint: "loan_amount" });
  for (const entryToChange of toChange) {
    const newStartingPoint =
      entryToChange.ValueTypeOfLoanAmount === "net"
        ? "initial_net_loan_amount"
        : "gross_amount_at_maturity";
    console.log(entryToChange, newStartingPoint);
    await knex(tableName)
      .update({ StartingPoint: newStartingPoint })
      .where({ LoanFinancialDetailsId: entryToChange.LoanFinancialDetailsId });
  }
};

exports.down = async (knex: Knex) => {
  const toChange = await knex(tableName)
    .select("LoanFinancialDetailsId", "StartingPoint", "ValueTypeOfLoanAmount")
    .where({ StartingPoint: "initial_net_loan_amount" })
    .orWhere({ StartingPoint: "gross_amount_at_maturity" });
  for (const entryToChange of toChange) {
    const newStartingPoint = "loan_amount";
    const newValueTypeOfLoanAmount =
      entryToChange.StartingPoint === "initial_net_loan_amount"
        ? "net"
        : "gross";
    console.log(entryToChange, newStartingPoint, newValueTypeOfLoanAmount);
    await knex(tableName)
      .update({
        StartingPoint: newStartingPoint,
        ValueTypeOfLoanAmount: newValueTypeOfLoanAmount,
      })
      .where({ LoanFinancialDetailsId: entryToChange.LoanFinancialDetailsId });
  }
};
