import * as Knex from "knex";

const standardWaypoints = [
  "New case allocated – review file",
  "Review/Set waypoints and special conditions",
  "Contact client within 5 days of loan completion",
  "Request an update on planning",
  "Check planning portal",
  "Planning Decision Due Date",
  "Check Rightmove – is the property on the market for sale",
  "Request a Memorandum of Sale",
  "Request an update on sale progress",
  "Request an update on exchange of contracts/completion",
  "Request a DIP",
  "Request an update on valuation – booked in and paid for?",
  "Chase valuation report",
  "Request a copy of the Mortgage Offer",
  "Request an update on legals",
  "Request an update on refinance",
  "Chase Special Condition",
  "Chase Mandated Decision Form",
  "Chase property related documents",
  "Request a copy of an HMO Licence",
  "Request an update on renewal",
  "Chase return of documents/letters/forms",
  "Instruct an Asset Manager/LPA Receiver",
  "Instruct Solicitors",
  "Chase Introducer/Broker",
  "Chase Asset Manager/LPA Receiver",
  "Insurance Follow Up",
  "Other",
];
const tableName = "OriginationAdmin.WaypointNames";
exports.up = async (knex: Knex) =>
  await knex(tableName).insert(
    standardWaypoints.map((Name) => ({ Name, IsDeleted: false }))
  );

exports.down = async (knex: Knex) =>
  await knex(tableName).delete().whereIn("Name", standardWaypoints);
