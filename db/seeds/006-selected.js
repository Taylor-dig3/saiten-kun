/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("selected").del();
  await knex("selected").insert([
    { teacher_id: 1, test_id: null, time_limit: null },
    { teacher_id: 2, test_id: null, time_limit: null },
    { teacher_id: 3, test_id: null, time_limit: null },
    { teacher_id: 4, test_id: null, time_limit: null },
    { teacher_id: 5, test_id: null, time_limit: null },
    { teacher_id: 6, test_id: null, time_limit: null },
  ]);
};
