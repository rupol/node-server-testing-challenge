const knex = require("knex");
const config = require("../knex-old");

const environment = process.env.NODE_ENV || "development";

module.exports = knex(config[environment]);
