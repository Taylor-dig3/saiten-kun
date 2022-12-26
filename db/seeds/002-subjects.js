/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('subjects').del()
  await knex('subjects').insert([
    { name: "国語"},
    { name: "数学" },
    { name: "理科" },
    { name: "社会" },
    { name: "英語" }
  ]);
};
