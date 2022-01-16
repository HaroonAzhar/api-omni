import * as Knex from "knex";

exports.up = async (knex: Knex) => {
  const applicantsWithoutLinks = await knex("Origination.Applicant")
    .select("ApplicantId", "Forename", "MiddleName", "Surname")
    .whereNull("Links");

  for (const applicant of applicantsWithoutLinks) {
    await knex("Origination.Applicant")
      .update({
        Links: [applicant.Forename, applicant.MiddleName, applicant.Surname]
          .filter(Boolean)
          .join(" "),
      })
      .where({ ApplicantId: applicant.ApplicantId });
  }
};

exports.down = (knex: Knex) => knex.schema;
