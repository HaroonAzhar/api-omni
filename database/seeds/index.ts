import Knex from "knex";

import * as knexfile from "../../knexfile";
import { KnexFile } from "../../knexfile";
const config = knexfile as KnexFile;
config.ext = "ts";
const knex = Knex(config);
import Seeds from "../seeds";

const instance = new Seeds(knex);
instance.run(true);
