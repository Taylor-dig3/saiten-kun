const { create } = require("domain");

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("tests", function (table) {
    table.increments("id").primary();
    table.string("name");
    table.date("make_date");
    table.date("run_date");
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("tests");
};
