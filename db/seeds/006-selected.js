/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("selected").del();
  await knex("selected").insert([
    { teacher_id: 2, test_id: 1 },
    { teacher_id: 1, test_id: 3 },
  ]);
};
