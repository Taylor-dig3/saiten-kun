/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema
    .createTable("students",function(table){
      table.increments("id").primary();
      table.string("login_id").notNullable();
      table.string("password").notNullable();
      table.string("name").notNullable();
      table.integer("grade_id");
      table.foreign("grade_id").references("grades.id");
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable("students");
};
