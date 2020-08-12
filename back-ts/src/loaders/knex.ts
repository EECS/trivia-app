import config from "../config";
// tslint:disable: no-var-requires
// tslint:disable: no-console
const knexConfig = require("../../knexfile")[config.environment]
const knexLoader = require('knex')(knexConfig);

export default knexLoader