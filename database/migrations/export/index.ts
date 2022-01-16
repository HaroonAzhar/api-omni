import { promises as fs } from "fs";
import * as path from "path";

import Knex from "knex";

import * as knexfile from "../../../knexfile";
import { KnexFile } from "../../../knexfile";

const config = knexfile as KnexFile;
config.ext = "ts";
const knex = Knex(config);

class MigrationExplorer {
  private knex: Knex;
  private migrationSQLs: string[] = [];
  private shouldStore = false;
  private previouslyExportedMigration: string;
  constructor(knex: Knex, previouslyExportedMigration: string) {
    this.knex = knex;
    this.previouslyExportedMigration = previouslyExportedMigration;
  }

  private storeMigrationSQLs = (_0: any, _1: any, builder: any) => {
    const query: string = builder.toQuery();
    if (query === "select max([batch]) as [max_batch] from [knex_migrations]") {
      this.shouldStore = true;
      return;
    } else if (
      query.indexOf(
        "insert into [knex_migrations] ([batch], [migration_time], [name])"
      ) !== -1
    ) {
      return;
    } else if (
      query ===
      "update [knex_migrations_lock] set [is_locked] = 0;select @@rowcount"
    ) {
      this.shouldStore = false;
      return;
    }
    if (this.shouldStore === true) {
      this.migrationSQLs.push(query);
    }
  };

  private skipAllExportedMigrations = async (previousExport: string) => {
    console.log("Applying all previous migrations");
    let currentVersion = await this.knex.migrate.currentVersion();
    currentVersion = currentVersion === "none" ? "0" : currentVersion;
    while (parseInt(currentVersion) < parseInt(previousExport)) {
      await this.knex.migrate.up();
      currentVersion = await this.knex.migrate.currentVersion();
    }
  };

  private runNewMigrationsAndSaveSQL = async () => {
    console.log("Applying new migrations to export");
    await this.knex
      .on("query-response", this.storeMigrationSQLs)
      .migrate.latest();
  };

  private formatMigrationOutput = (): string => {
    const formatedMigrationOutput = this.migrationSQLs.join("\nGO\n");
    return formatedMigrationOutput;
  };

  private exportMigrationsToFile = async () => {
    const outputDirName = "output";
    const baseFilePath = path.resolve(__dirname);
    await fs.mkdir(outputDirName, { recursive: true });
    const date = new Date();
    const fileName = `${date.toISOString().split("T")[0]}.sql`;
    const filePath = path.join(baseFilePath, outputDirName, fileName);
    console.log(`Exporting migrations to file ${filePath}`);
    await fs.writeFile(filePath, this.formatMigrationOutput());
  };

  public getMigrationSQL = async () => {
    await this.skipAllExportedMigrations(this.previouslyExportedMigration);
    await this.runNewMigrationsAndSaveSQL();
    await this.exportMigrationsToFile();
  };
}

const migrationExplorer = new MigrationExplorer(knex, "20200428205344");
migrationExplorer
  .getMigrationSQL()
  .then(() => {
    console.log("============Finished============");
    process.exit();
  })
  .catch((reason) => {
    console.error(reason);
    process.exit();
  });
