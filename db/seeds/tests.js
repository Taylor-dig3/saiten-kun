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
      make_date: "2022-11-28",
      run_date: "2022-11-30",
    },
    {
      name: "小テスト2",
      make_date: "2022-12-05",
      run_date: "2022-12-07",
    },
    {
      name: "小テスト3",
      make_date: "2022-12-12",
      run_date: "2022-12-14",
    },
    {
      name: "宿題テスト",
      make_date: "2022-12-19",
      run_date: "2022-12-19",
    },
    { name: "宿題テスト2", make_date: "2022-12-19", run_date: null },
  ]);
};
