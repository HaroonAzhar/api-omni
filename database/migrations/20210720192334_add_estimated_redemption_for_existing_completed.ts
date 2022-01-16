import * as Knex from "knex";

exports.up = async (knex: Knex) => {
  const completedToAddEstimated = await knex.raw(`
    SELECT *
    FROM   (SELECT TOP (1000) [CompletedId],
                            [DateOfMaturity],
                            Row_number()
                                OVER (
                                partition BY completedid
                                ORDER BY date DESC) extension_count,
                            Date
            FROM   [Dawn_Data].[Servicing].[completed]
                LEFT OUTER JOIN servicing.extensions
                                ON completedid = fkcompletedid) AS sub
    WHERE  extension_count = 1 
    
    `);

  for (const completed of completedToAddEstimated) {
    const Date = completed.Date ? completed.Date : completed.DateOfMaturity;
    const estimatedRedemption = {
      FkCompletedId: completed.CompletedId,
      Date,
    };
    if (Date) {
      await knex("Servicing.EstimatedRedemptions").insert(estimatedRedemption);
    }
  }
};

exports.down = (knex: Knex) => knex.schema;
