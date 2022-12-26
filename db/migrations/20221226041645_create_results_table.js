/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema 
    .createTable("results",function(table){
      table.increments("id").primary();
      table.integer("student_id");
      table.foreign("student_id").references("students.id");
      table.integer("test_id");
      table.foreign("test_id").references("tests.id");
      table.integer("question_id");
      table.foreign("question_id").references("questions.id");
      table.boolean("result");
      table.binary("answer_img");
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable("results");
};
