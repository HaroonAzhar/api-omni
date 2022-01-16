import * as Knex from "knex";

export async function seed(knex: Knex): Promise<any> {
  // Deletes ALL existing entries
  return knex("OriginationAdmin.Tags")
    .del()
    .then(() => {
      // Inserts seed entries
      return knex("OriginationAdmin.Tags").insert([
        { Name: "In Receivership", ColorCode: "#22194D" },
        { Name: "Asset Manager", ColorCode: "#22194D" },
        { Name: "Vulnerable Customer", ColorCode: "#22194D" },
        { Name: "Complaint", ColorCode: "#22194D" },
      ]);
    });
}
