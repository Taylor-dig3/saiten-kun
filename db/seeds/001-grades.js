/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('grades').del()
  await knex('grades').insert([
    { grades_number: 1 },
    { grades_number: 2 },
    { grades_number: 3 },
    { grades_number: 4 },
    { grades_number: 5 },
    { grades_number: 6 }
  ]);
};
