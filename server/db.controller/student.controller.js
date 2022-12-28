const knex = require("../../knex");

module.exports = {
  startTest(user_id){
     return knex("students")
      .join("selected","students.teacher_id","selected.teacher_id")
      .select({
        teacher_id:"selected.teacher_id",
        test_id:"selected.test_id"
      })
      .where({
        "students.id" : user_id
      })
      .first()
      .then(res => {
        // console.log(res);
        return knex("tests")
        .join("papers","tests.id","papers.test_id")
        .join("questions","papers.question_id","questions.id")
        .select({
          question_title:"tests.question_title",
          question_id:"questions.id",
          question:"questions.question",
          answer:"questions.answer"
        })
        .where({
          "tests.id" : res.test_id
        })
        .then(testres => {
          // console.log(testres);
          let result = {
            question_title:testres[0].question_title,
            data:[]
          }
          result.data = testres.map(obj => {
            return {
              question_id:obj.question_id,
              question:obj.question,
              answer:obj.answer
            }
          });
          console.log(result);
          return result;
        }) 
      })

    // return knex("tests")
    //   .join("papers","tests.id","papers.test_id")
    //   .join("questions","papers.question_id","questions.id")
    //   .select({
    //     question_title:"tests.question.title",
    //     question_id:"questions.id",
    //     question:"questions.question",
    //     answer:"questions.answer"
    //   })
    //   .where({

    //   })
  }
}