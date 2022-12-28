/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.alterTable("students",function(table){
    table.dropColumn("login_id");
    table.integer("teacher_id");
    table.foreign("teacher_id").references("teachers.id");
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.alterTable("students",function(table){
    table.string("login_id");
    table.dropColumn("teacher_id");
  })
};
