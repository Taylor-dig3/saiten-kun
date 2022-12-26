/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('results').del()
  await knex('results').insert([
    { 
      test_id:1, 
      question_id: 1, 
      student_id:1, 
      result: true,
      answer_img:"logo192.png"
    },
    {
      test_id: 1,
      question_id: 2,
      student_id: 1,
      result:false,
      answer_img: "bG9nbzE5Mi5wbmc="
    },
    {
      test_id: 1,
      question_id: 3,
      student_id: 1,
      result:  true,
      answer_img: "bG9nbzE5Mi5wbmc="
    },
    {
      test_id: 1,
      question_id: 4,
      student_id: 1,
      result: false,
      answer_img: "bG9nbzE5Mi5wbmc="
    },
    {
      test_id: 1,
      question_id: 5,
      student_id: 1,
      result: true,
      answer_img: null
    }
  ]);
};
