import fs from "fs";

import dotenv from "dotenv";

import logger from "./logger";

type rollbarConfig = {
  accessToken: string;
};

type databaseConnectionData = {
  host: string;
  port: number;
  username: string;
  password: string;
  database: string;
  encrypt: boolean;
};

if (fs.existsSync(".env")) {
  logger.debug("Using .env file to supply config environment variables");
  dotenv.config({ path: ".env" });
} else {
  logger.debug(
    "Using .env.example file to supply config environment variables"
  );
  dotenv.config({ path: ".env.example" }); // you can delete this after you create your own .env file!
}

export const databaseConf: databaseConnectionData = {
  host: process.env.DATABASE_HOST,
  port: parseInt(process.env.DATABASE_PORT),
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  encrypt: process.env.DATABASE_ENCRYPT == "true",
};

export const rollbarConfig: rollbarConfig = {
  accessToken: process.env.ROLLBAR_TOKEN,
};
