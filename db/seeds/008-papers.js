/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("papers").del();
  await knex("papers").insert([
    { test_id: 1, question_id: 1 },
    { test_id: 1, question_id: 2 },
    { test_id: 1, question_id: 3 },
    { test_id: 1, question_id: 4 },
    { test_id: 1, question_id: 5 },
    { test_id: 2, question_id: 6 },
    { test_id: 2, question_id: 7 },
    { test_id: 2, question_id: 8 },
    { test_id: 2, question_id: 9 },
    { test_id: 2, question_id: 10 },
    { test_id: 3, question_id: 11 },
    { test_id: 3, question_id: 12 },
    { test_id: 3, question_id: 13 },
    { test_id: 3, question_id: 14 },
    { test_id: 3, question_id: 15 },
    { test_id: 4, question_id: 16 },
    { test_id: 4, question_id: 17 },
    { test_id: 4, question_id: 18 },
    { test_id: 4, question_id: 19 },
    { test_id: 4, question_id: 20 },
  ]);
};
