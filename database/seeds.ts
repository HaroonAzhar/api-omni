import * as fs from "fs";

import Knex from "knex";
import Color from "colors";

import * as knexfile from "../knexfile";
import { KnexFile } from "../knexfile";
const config = knexfile as KnexFile;
const knex = Knex(config);

export default class Seeds {
  private knex: Knex;
  private files: string[] = [];
  constructor(knex: Knex) {
    this.knex = knex;
  }

  private async checkSeedTable() {
    await this.knex.raw("SELECT 1+1 FROM knex_seeds").catch(async () => {
      await this.knex.schema.createTable("knex_seeds", (table) => {
        table.increments("id").primary();
        table.string("name").unique();
        table
          .timestamp("date")
          .notNullable()
          .defaultTo(this.knex.raw("CURRENT_TIMESTAMP"));
      });
    });
  }

  public async isNewSeedAvailable() {
    await this.checkSeedTable();
    const data = await this.knex.select().from("knex_seeds");

    this.files = fs.readdirSync(__dirname + "/seeds").filter((filename) => {
      return filename !== "index.ts";
    });

    await data.forEach((value) => {
      if (this.files.filter((file) => value.name === file)) {
        const index = this.files.findIndex((file) => value.name === file);
        this.files.splice(index, 1);
      }
    });

    return this.files.length > 0;
  }

  public async run(exit: boolean, toFile?: string) {
    if (!(await this.isNewSeedAvailable())) {
      console.log(Color.green("=== NO NEW SEEDS ==="));
      if (exit) process.exit();
    }

    for (let i = 0; i < this.files.length; i++) {
      if (toFile === this.files[i]) return true;
      const value = this.files[i];
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      await require(`./seeds/${value}`)
        .seed(this.knex)
        .then(async () => {
          await this.knex.insert({ name: value }).into("knex_seeds");
          console.log(`seed ${Color.green(value)} was run successfully`);
        })
        .catch((e: Error) => {
          console.error(e);
        });
    }

    if (exit) process.exit();
    return true;
  }
}
