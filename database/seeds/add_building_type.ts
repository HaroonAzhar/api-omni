import * as Knex from "knex";

export async function seed(knex: Knex): Promise<any> {
  // Deletes ALL existing entries
  return knex("Origination.DipBuildingType")
    .del()
    .then(() => {
      // Inserts seed entries
      return knex("Origination.DipBuildingType").insert([
        { BuildingType: "development" },
        { BuildingType: "non_development" },
      ]);
    });
}
