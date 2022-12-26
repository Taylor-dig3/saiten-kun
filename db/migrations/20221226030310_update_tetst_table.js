/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex,Promise) {
  return knex.schema.alterTable("tests",function(table){
    table.integer("grade_id");
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
    table.dropColumn("grage");
    table.dropColumn("teacher_id");
  })
};

