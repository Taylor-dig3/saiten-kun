const knex = require("../../knex");
require("dotenv").config();
const bcrypt = require("bcrypt");
const { Sync, NestCamWiredStandTwoTone } = require("@mui/icons-material");

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
    const testList = await knex("tests")
      .select({
        title: "tests.name",
        grade: "grade_id",
        run_date: "run_date",
        make_date: "make_date",
        subject: "subjects.name",
        test_id: "papers.test_id",
      })
      .from("tests")
      .join("subjects", "tests.subject_id", "subjects.id")
      .join("papers", "tests.id", "papers.test_id")
      .groupBy("tests.id", "subjects.id", "papers.test_id")
      .count("papers.question_id", { as: "question_count" })
      .where("teacher_id", reqTeacher_id);

    console.log(testList);
    return testList;
  },

  async registerQuestion(
    reqTestName,
    reqQuestionTitle,
    reqGradeId,
    reqData,
    reqTeacherId,
    reqSubjectId
  ) {
    const newtest = {
      name: reqTestName,
      question_title: reqQuestionTitle,
      make_date: new Date(),
      grade_id: reqGradeId,
      teacher_id: reqTeacherId,
      subject_id: reqSubjectId,
    };
    console.log(newtest);
    //データの挿入
    await knex("tests").insert(newtest);
    reqData.map(async (newQuestion) => {
      const newQuestions = {
        question: newQuestion.question,
        answer: newQuestion.answer,
        subject_id: reqSubjectId,
      };
      console.log(newQuestions);
      await knex("questions").insert(newQuestions);
    });

    //データが正しく挿入されたかの確認処理
    // const addAccount = await knex("students")
    //   .select("*")
    //   .where("name", reqName)
    //   .andWhere("grade_id", reqGrade)
    //   .andWhere("password", reqPassword)
    //   .andWhere("teacher_id", reqTeacher_id);

    // if (!addAccount) {
    //   console.log("signupError");
    //   return false;
    // } else {
    //   console.log("return add acount");
    //   return addAccount;
    // }
  },

  async updateResult(results_id) {
    const reverse = await knex("results")
      .select("result")
      .where({
        id: results_id,
      })
      .first();
    // console.log(reverse);
    return knex("results")
      .where({
        id: results_id,
      })
      .update({
        result: !reverse.result,
      })
      .then((res) => {
        return !reverse.result;
      });
  },

  putSelected(teacher_id, test_id) {
    return knex("selected")
      .where({ teacher_id: teacher_id })
      .update({ test_id: test_id })
      .then((res) => {
        return knex("selected")
          .where({
            teacher_id: teacher_id,
          })
          .select({
            teacher_id: "teacher_id",
            test_id: "test_id",
          })
          .first()
          .then((res) => {
            return {
              status: "ok",
              data: {
                teacher_id: res.teacher_id,
                test_id: res.test_id,
              },
            };
          });
      })
      .catch((err) => {
        return err;
      });
  },
};
