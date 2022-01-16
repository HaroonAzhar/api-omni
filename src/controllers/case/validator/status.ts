import * as Joi from "joi";

export default Joi.string().valid(["Edited", "New", "Completed", "Recheck"]);
