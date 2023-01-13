/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("students").del();
  await knex("students").insert([
    {
      name: "佐藤　一年",
      password: "$2b$10$3OtbWIOYL.mbFyQbhU6UPe2GY48Hw0DGrPZWcFM/ZFvTUDR58Bp7e",
      grade_id: 1,
      teacher_id: 1,
    },
    {
      name: "鈴木　二年",
      password: "$2b$10$KIUaThfmTx7u3L7AK267d.q5bAfnbEKyejENuzxjNr0kFqG8jNUwq",
      grade_id: 2,
      teacher_id: 2,
    },
    {
      name: "高橋　三年",
      password: "$2b$10$cW4hou9UuiXcLnP4JmRkjOqtcdVcBCKxR3ztzOlawihBv8uZeBsk6",
      grade_id: 3,
      teacher_id: 3,
    },
    {
      name: "田中　四年",
      password: "$2b$10$klqnrTFyDErcRW2rA.GJzuZ5bOXFbwH.oUlghAyjFBb7NRWx0CDUa",
      grade_id: 4,
      teacher_id: 4,
    },
    {
      name: "渡辺　五年",
      password: "$2b$10$M1z0xAFH3zepjp1kE4MkpeUc62gN75GHnT766skw2sPdG5a.Tkra6",
      grade_id: 5,
      teacher_id: 5,
    },
    {
      name: "伊藤　六年",
      password: "$2b$10$AW2zfVcBxZZKOP4N.dYbwOV2tWz0k1h4Ug/KvnmBDs2IRdWALMX1m",
      grade_id: 6,
      teacher_id: 6,
    },
  ]);
};
