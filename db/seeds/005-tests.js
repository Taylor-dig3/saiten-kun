/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("tests").del();
  await knex("tests").insert([
    {
      name: "小テスト1",
      question_title: "漢字をひらがなに直しなさい",
      make_date: new Date(Date.now() + ((new Date().getTimezoneOffset() + (9 * 60)) * 60 * 1000)),
      run_date: null,
      grade_id: 5,
      subject_id: 1,
      teacher_id: 1,
    },
    {
      name: "小テスト2",
      question_title: "漢字をひらがなに直しなさい",
      make_date: new Date(Date.now() + ((new Date().getTimezoneOffset() + (9 * 60)) * 60 * 1000)),
      run_date: null,
      grade_id: 5,
      subject_id: 1,
      teacher_id: 1,
    },
    {
      name: "小テスト3",
      question_title: "漢字をひらがなに直しなさい",
      make_date: new Date(Date.now() + ((new Date().getTimezoneOffset() + (9 * 60)) * 60 * 1000)),
      run_date: null,
      grade_id: 5,
      subject_id: 1,
      teacher_id: 1,
    },
    {
      name: "宿題テスト",
      question_title: "漢字をひらがなに直しなさい",
      make_date: new Date(Date.now() + ((new Date().getTimezoneOffset() + (9 * 60)) * 60 * 1000)),
      run_date: null,
      grade_id: 5,
      subject_id: 1,
      teacher_id: 1,
    },
    {
      name: "宿題テスト2",
      question_title: "漢字をひらがなに直しなさい",
      make_date: "2022-12-19",
      run_date: null,
      grade_id: 5,
      subject_id: 1,
      teacher_id: 1,
    },
  ]);
};
