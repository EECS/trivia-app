import config from "../config";
import { QueryBuilder } from "knex";
// tslint:disable: no-var-requires
// tslint:disable: no-console
const knexConfig = require("../../knexfile")[config.environment]
const knexLoader = require('knex')(knexConfig);

export default knexLoader as QueryBuilder