/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('teachers').del()
  await knex('teachers').insert([
    { name: "薔薇　右衛門",password:"$2b$10$abfzIqACFGs9NpC45KZyGuUaypkYwBv.d1T3JYI3nYC2tY8pyF4aO"},
    { name: "襟　えり子",password:"$2b$10$abfzIqACFGs9NpC45KZyGuUaypkYwBv.d1T3JYI3nYC2tY8pyF4aO"},
    { name: "小池　よしき",password:"$2b$10$abfzIqACFGs9NpC45KZyGuUaypkYwBv.d1T3JYI3nYC2tY8pyF4aO"},
    { name: "茶茶　国男",password:"$2b$10$abfzIqACFGs9NpC45KZyGuUaypkYwBv.d1T3JYI3nYC2tY8pyF4aO"},
    { name: "樋口　和宏",password:"$2b$10$abfzIqACFGs9NpC45KZyGuUaypkYwBv.d1T3JYI3nYC2tY8pyF4aO"},
    { name: "間　悠介",password:"$2b$10$abfzIqACFGs9NpC45KZyGuUaypkYwBv.d1T3JYI3nYC2tY8pyF4aO"},
  ]);
};
