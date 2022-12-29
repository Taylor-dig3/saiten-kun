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

  async pickupStudents(reqTeacher_id) {
    const studentList = await knex("students")
      .select("id", "name", "grade_id")
      .where("teacher_id", Number(reqTeacher_id));

    console.log(studentList);
    return studentList;
  },

  async updatePassword(reqUser_id, reqPassword) {
    let salt = bcrypt.genSaltSync(Number(process.env.HASH_COUNT));
    let hashed_password = bcrypt.hashSync(
      `${process.env.HASHKEY}${reqPassword}`,
      salt
    );

    const setedPassword = await knex("students")
      .where("id", reqUser_id)
      .update({ password: hashed_password });

    console.log("update");
    console.log(setedPassword);
    return setedPassword;
  },

  async pickupTests(reqTeacher_id) {
    console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");
    const testList = await knex("tests")
      .select("name", "grade_id", "run_date", "make_date", "subject_id")
      .from("tests")
      .join("subjects", "tests.id", "subjects.name")
      .where("teacher_id", reqTeacher_id);

    console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");
    console.log(testList);
    // return testList;
  },

  async updateResult(results_id){
    const reverse = await knex("results")
      .select("result")
      .where({              
        "id" : results_id
      })
      .first()
    // console.log(reverse);
    return knex("results")
      .where({
        "id" : results_id
      })
      .update({
        "result" : !reverse.result
      })
      .then(res => {
        return !reverse.result
      })
  }
  
};