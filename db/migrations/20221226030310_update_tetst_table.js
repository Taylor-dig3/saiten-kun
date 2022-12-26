/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex,Promise) {
  return knex.schema.alterTable("tests",function(table){
    table.integer("grade_id");
    table.string("question_title").notNullable();
    table.foreign("grade_id").references("grades.id");
    table.integer("teacher_id").notNullable();
    table.foreign("teacher_id").references("teachers.id");
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.alterTable("tests",function(table){
    table.dropColumn("grade_id");
    table.dropColumn("question_title");
    table.dropColumn("teacher_id");
  })
};

