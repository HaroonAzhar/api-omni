import { BaseModel } from "../models/BaseModel";
import db from "../db";
BaseModel.registerKnex(db);
