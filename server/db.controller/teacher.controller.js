const knex = require("../../knex");
require("dotenv").config();
const bcrypt = require("bcrypt");

module.exports = {
  async registerId(reqName, reqGrade, reqPassword, reqTeacher_id) {
    let salt = bcrypt.genSaltSync(Number(process.env.HASH_COUNT));
    let hashed_password = bcrypt.hashSync(
      `${process.env.HASHKEY}${reqPassword}`,
      salt
    );

    const newAccount = {
      name: reqName,
      grade_id: reqGrade,
      password: hashed_password,
      teacher_id: reqTeacher_id,
    };

    //データの挿入
    await knex("students").insert(newAccount);

    //データが正しく挿入されたかの確認処理
    const addAccount = await knex("students")
      .select("*")
      .where("name", reqName)
      .andWhere("grade_id", reqGrade)
      .andWhere("password", reqPassword)
      .andWhere("teacher_id", reqTeacher_id);

    if (!addAccount) {
      console.log("signupError");
      return false;
    } else {
      console.log("return add acount");
      return addAccount;
    }
  },
};
