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
      question_title:"漢字をひらがなに直しなさい",
      make_date: "2022-11-28",
      run_date: "2022-11-30",
      grade_id: 5,
      teacher_id: 1
    },
    {
      name: "小テスト2",
      question_title: "漢字をひらがなに直しなさい",
      make_date: "2022-12-05",
      run_date: "2022-12-07",
      grade_id: 5,
      teacher_id: 1
    },
    {
      name: "小テスト3",
      question_title: "漢字をひらがなに直しなさい",
      make_date: "2022-12-12",
      run_date: "2022-12-14",
      grade_id: 5,
      teacher_id: 1
    },
    {
      name: "宿題テスト",
      question_title: "漢字をひらがなに直しなさい",
      make_date: "2022-12-19",
      run_date: "2022-12-19",
      grade_id: 5,
      teacher_id: 1
    },
    { name: "宿題テスト2",
      question_title: "漢字をひらがなに直しなさい",
      make_date: "2022-12-19", 
      run_date: null ,
      grade_id: 5,
      teacher_id: 1
    },
  ]);
};
