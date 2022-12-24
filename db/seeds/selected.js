/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("selected").del();
  await knex("selected").insert([{ test_id: 1 }]);
};
