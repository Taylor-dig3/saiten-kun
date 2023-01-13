/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("tests").del();
  await knex("tests").insert([
    {
      name: "漢字テスト1",
      question_title: "漢字をひらがなに直しなさい",
      make_date: new Date(Date.now() + ((new Date().getTimezoneOffset() + (9 * 60)) * 60 * 1000)),
      run_date: null,
      grade_id: 4,
      subject_id: 1,
      teacher_id: 1,
    },
    {
      name: "漢字テスト2",
      question_title: "漢字をひらがなに直しなさい",
      make_date: new Date(Date.now() + ((new Date().getTimezoneOffset() + (9 * 60)) * 60 * 1000)),
      run_date: null,
      grade_id: 4,
      subject_id: 1,
      teacher_id: 1,
    },
    {
      name: "漢字テスト3",
      question_title: "漢字をひらがなに直しなさい",
      make_date: new Date(Date.now() + ((new Date().getTimezoneOffset() + (9 * 60)) * 60 * 1000)),
      run_date: null,
      grade_id: 4,
      subject_id: 1,
      teacher_id: 1,
    },
    {
      name: "宿題確認テスト1",
      question_title: "それぞれ何地方か答えなさい",
      make_date: new Date(Date.now() + ((new Date().getTimezoneOffset() + (9 * 60)) * 60 * 1000)),
      run_date: null,
      grade_id: 4,
      subject_id: 4,
      teacher_id: 1,
    },
    {
      name: "宿題確認テスト2",
      question_title: "漢字をひらがなに直しなさい",
      make_date: "2022-12-19",
      run_date: null,
      grade_id: 4,
      subject_id: 1,
      teacher_id: 1,
    },
  ]);
};
