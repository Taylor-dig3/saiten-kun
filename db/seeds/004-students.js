/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('students').del()
  await knex('students').insert([
    { name: "浅田　太郎", login_id: "1", password:"$2b$10$YqKtwP2taSc10F3.CgIeqOexEtfYEnybnR06tkbK9PcQKslBvwd3S",grade_id: 5},
    { name: "飯田　健", login_id: "2", password: "$2b$10$MuGKS4OL111./hWpUOzDB.9TU42DZbTlAiEGwokDE2iCLFOSNWQ4G", grade_id: 5 },
    { name: "遠藤　幹雄", login_id: "3", password: "$2b$10$tDPb7nCnyVu1034TKKOQTONptvfsqYPhDXOreMXGL4KeIgVYxIHKG", grade_id: 5 }
  ]);
};
