/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema
    .createTable("teachers",function(table){
      table.increments("id").primary();
      table.string("login_id").notNullable();
      table.string("password").notNullable();
      table.string("name");
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable("teachers");
};
