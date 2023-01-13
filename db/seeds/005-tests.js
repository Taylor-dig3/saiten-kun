/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("tests").del();
  await knex("tests").insert([
    {
      name: "都道府県テスト1",
      question_title: "それぞれ何地方か答えなさい",
      make_date: new Date(Date.now() + ((new Date().getTimezoneOffset() + (9 * 60)) * 60 * 1000)),
      run_date: null,
      grade_id: 4,
      subject_id: 4,
      teacher_id: 4,
    },
    {
      name: "漢字テスト1",
      question_title: "漢字をひらがなに直しなさい",
      make_date: new Date(Date.now() + ((new Date().getTimezoneOffset() + (9 * 60)) * 60 * 1000)),
      run_date: null,
      grade_id: 4,
      subject_id: 1,
      teacher_id: 4,
    },
    {
      name: "計算テスト1",
      question_title: "計算しなさい",
      make_date: new Date(Date.now() + ((new Date().getTimezoneOffset() + (9 * 60)) * 60 * 1000)),
      run_date: null,
      grade_id: 4,
      subject_id: 2,
      teacher_id: 4,
    },
    {
      name: "英語テスト1",
      question_title: "以下の単語から連想される単語を答えなさい",
      make_date: new Date(Date.now() + ((new Date().getTimezoneOffset() + (9 * 60)) * 60 * 1000)),
      run_date: null,
      grade_id: 4,
      subject_id: 5,
      teacher_id: 4,
    },
  ]);
};
