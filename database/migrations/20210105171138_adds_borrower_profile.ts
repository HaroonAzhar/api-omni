import * as Knex from "knex";

exports.up = (knex: Knex) =>
  knex.schema.alterTable("Origination.CaseOverview", (table) => {
    table.text("BorrowerProfile");
    table.text("ClientMeetingNotes");
    table.text("ClientMeetingAttendees");
    table.timestamp("ClientMeetingDate");
  });

exports.down = (knex: Knex) =>
  knex.schema.alterTable("Origination.CaseOverview", (table) => {
    table.dropColumns(
      "BorrowerProfile",
      "ClientMeetingNotes",
      "ClientMeetingAttendees",
      "ClientMeetingDate"
    );
  });
