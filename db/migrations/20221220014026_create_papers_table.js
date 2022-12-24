const { createTracing } = require("trace_events");

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("papers", function (table) {
    table.integer("test_id").notNullable();
    table.integer("question_id").notNullable();
    table.foreign("test_id").references("tests.id");
    table.foreign("question_id").references("questions.id");
    table.unique(["test_id", "question_id"]),
      { indexName: "test_question_index" };
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("papers");
};
