import * as Knex from "knex";
import moment from "moment";

exports.up = async (knex: Knex) => {
  const tableName = "Servicing.Completed";
  const completedCases: {
    CompletedId: number;
    DateOfMaturity: string;
  }[] = await knex(tableName).select("CompletedId", "DateOfMaturity");
  for (const completed of completedCases) {
    const fixedMaturityDate = moment(completed.DateOfMaturity)
      .subtract(1, "day")
      .format();
    await knex(tableName)
      .update({ DateOfMaturity: fixedMaturityDate })
      .where({ CompletedId: completed.CompletedId });
  }

  const waypointsTable = "Servicing.Waypoints";
  const waypoints: {
    WaypointId: number;
    DueDate: string;
  }[] = await knex(waypointsTable)
    .select("WaypointId", "DueDate")
    .where({ Name: "Redemption Due Date" });
  for (const waypoint of waypoints) {
    const fixedMaturityDate = moment(waypoint.DueDate)
      .subtract(1, "day")
      .format();
    await knex(waypointsTable)
      .update({ DueDate: fixedMaturityDate })
      .where({ WaypointId: waypoint.WaypointId });
  }
};

exports.down = (knex: Knex) => knex.schema;
