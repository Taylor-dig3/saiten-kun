/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("students").del();
  await knex("students").insert([
    {
      name: "リオンくん抜歯待ち",
      password: "$2b$10$YqKtwP2taSc10F3.CgIeqOexEtfYEnybnR06tkbK9PcQKslBvwd3S",
      grade_id: 5,
      teacher_id: 2,
    },
    {
      name: "飯田　健",
      password: "$2b$10$MuGKS4OL111./hWpUOzDB.9TU42DZbTlAiEGwokDE2iCLFOSNWQ4G",
      grade_id: 5,
      teacher_id: 1,
    },
    {
      name: "遠藤　幹雄",
      password: "$2b$10$tDPb7nCnyVu1034TKKOQTONptvfsqYPhDXOreMXGL4KeIgVYxIHKG",
      grade_id: 5,
      teacher_id: 2,
    },
  ]);
};
