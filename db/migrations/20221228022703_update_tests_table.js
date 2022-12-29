const { KafkaConnect } = require("aws-sdk");
const { func } = require("prop-types");

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.alterTable("tests",function(table){
    table.integer("subject_id");
    table.foreign("subject_id").references("subjects_id");
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.alterTable("tests",function(table){
    table.dropColumn("subject_id");
  })
};
