const knex = require("../../knex");

module.exports = {
  startTest(user_id) {
    return knex("students")
      .join("selected", "students.teacher_id", "selected.teacher_id")
      .select({
        teacher_id: "selected.teacher_id",
        test_id: "selected.test_id",
        time_limit: "selected.time_limit",
      })
      .where({
        "students.id": user_id,
      })
      .first()
      .then((res) => {
        // console.log(res);
        return knex("tests")
          .join("papers", "tests.id", "papers.test_id")
          .join("questions", "papers.question_id", "questions.id")
          .select({
            question_name:"tests.name",
            question_title: "tests.question_title",
            question_id: "questions.id",
            question: "questions.question",
            answer: "questions.answer",
            test_id: "tests.id",
          })
          .where({
            "tests.id": res.test_id,
          })
          .then((testres) => {
            console.log(testres);
            let result = {
              test_id: testres[0].test_id,
              time_limit: res.time_limit,
              question_name:testres[0].question_name,
              question_title: testres[0].question_title,
              data: [],
            };
            result.data = testres.map((obj) => {
              return {
                question_id: obj.question_id,
                question: obj.question,
                answer: obj.answer,
              };
            });
            console.log("aaaaaaaaaaaaaaaaaaaaaaa");
            console.log(result);
            return result;
          });
      });
  },
  async getStudentTest(user_id) {
    // console.log("bbbbbb");
    const testResultList = await knex("tests")
      .join("results", "tests.id", "results.test_id")
      .join("subjects", "subjects.id", "tests.subject_id")
      .join("students", "students.id", "results.student_id")
      .join("grades", "grades.id", "students.grade_id")
      // .join("papers", "papers.test_id", "tests.id")
      .select({
        test_id: "tests.id",
        title: "tests.name",
        run_date: "tests.run_date",
        subject: "subjects.name",
        grade: "grades.grades_number",
      })
      .groupBy("tests.id", "subjects.id", "grades.grades_number")
      .count("results.question_id", { as: "question_number" })
      .where({
        "results.student_id": user_id,
      });
    // .distinct()
    // .first();
    console.log(testResultList);
    return testResultList;
    // .then(res => {
    //   console.log(res);
    // })
  },

  async getTest(user_id) {
    console.log("bbbbbb");
    const testResultList = await knex("tests")
    .join("papers", "tests.id", "papers.test_id")
    .join("teachers","teachers.id","tests.teacher_id")
    .join("subjects", "subjects.id", "tests.subject_id")
    .join("students", "students.teacher_id", "teachers.id")
    .join("grades", "grades.id", "students.grade_id")
    .select({
        test_id: "tests.id",
        title: "tests.name",
        run_date: "tests.run_date",
        subject: "subjects.name",
        grade: "grades.grades_number",
      })
      .groupBy("tests.id", "subjects.id", "grades.grades_number","papers.test_id")
      .count("papers.question_id", { as: "question_number" })
      .where({
        "students.id": user_id,
      })
      .orderBy("tests.id",'desc');
    // console.log("rrrrrrrrrrr",testResultList);
    // console.log("rion");
    return testResultList;
  },

  postAnswer(resultObj) {
    console.log("postAnswer");
    let insertObj = [];
    resultObj.data.forEach((obj) => {
      insertObj.push({
        student_id: resultObj.user_id,
        test_id: resultObj.test_id,
        result: null,
        question_id: obj.question_id,
        answer_img: obj.answer_img,
      });
      console.log(obj.question_id);
    });
    knex("results")
      .select("*")
      .where({
        "student_id" : insertObj[0].student_id,
        "test_id": insertObj[0].test_id
      })
      .first()
      .then(res => {
        // console.log("aaaaaaaa",res);
        if(res){
          // console.log("error");
          return "error"
        } else {
          // console.log("insert",res);
          return knex("results").insert(insertObj);
        }
      })
  },

  getAnswer(user_id, test_id) {
    return knex("results")
      .join("tests", "tests.id", "=", "results.test_id")
      .join("questions", "questions.id", "=", "results.question_id")
      .select({
        question_id: "questions.id",
        question_title: "tests.question_title",
        question: "questions.question",
        answer:"questions.answer",
        answer_img: "results.answer_img",
        result: "results.result",
        result_id: "results.id",
      })
      .where({
        "results.student_id": user_id,
        // "tests.id": test_id,
        "results.test_id": test_id,
      })
      .then((res) => {
        console.log(user_id);
        console.log(test_id);
        console.log(res)
        if(res.length!==0){

          let result = {
            question_title: res[0].question_title,
            data: [],
          };
          result.data = res.map((obj) => {
            return {
              question_id:obj.question_id,
              question: obj.question,
              answer:obj.answer,
              answer_img: obj.answer_img,
              result_id: obj.result_id,
              result: obj.result,
            };
          });
          return result;
        }else{
          return false
        }
      });
  },
};
