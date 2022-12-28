/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('teachers').del()
  await knex('teachers').insert([
    { name: "大谷　翔平",password:"$2b$10$WRXvqusQZd.40YOnwSMPReEwIV/3IJa0IV8IneG7C283jqGnhYUn2"},
    { name: "小谷　走平",password:"$2b$10$XSS3eVRNuWhLzo4X7sFj3ei81LdIb3LSElCcGaJtQytnZY9sY6lTi"},
  ]);
};
