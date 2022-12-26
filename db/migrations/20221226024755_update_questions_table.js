/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.alterTable("questions",function(table){
    table.integer("subject_id");
    table.foreign("subject_id").references("subjects.id")
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.alterTable("questions",function(table){
    table.dropColumn("subject_id");
  })
};
