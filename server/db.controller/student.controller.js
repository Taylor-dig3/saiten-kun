const { getByTestId } = require("@testing-library/react");
const { func } = require("prop-types");
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
  },
  getTest(user_id){
    // return knex("tests")
    //   .join("results","tests.id","results.test_id")
    //   .join("subjects","subjects.id","tests.subject_id")
    //   .join("students","students.id","results.stundets_id")
    //   .join("grades","grades.id","students.grade_id")
    //   .join("papers", "papers.test_id", "tests.id")



    //   .select({
    //     test_id:"tests.id",
    //     title:"tests.name",
    //     run_date:"tests.run_date",
    //     subject:"subjects.name",
    //     grade:"grades.grades_number"
    //   })
    //   .groupBy("tests.id")
    //   .count("papers.question_id", { as : "question_number"})
    //   .where({
    //     "results.student_id" : user_id
    //   })
    //   .then(res => {
    //     console.log("aaaaaaaaaaa");
    //     console.log(res);
    //   })
  },
  postAnswer(resultObj){
    console.log("postAnswer");
    let insertObj = []
    resultObj.data.forEach( obj => {
      insertObj.push({
        student_id:resultObj.user_id,
        test_id:resultObj.test_id,
        result:obj.result,
        question_id:obj.question_id,
        answer_img:obj.answer_img
      })
      console.log(obj.question_id);
    });
    // console.log(insertObj);
    return knex("results").insert(insertObj);
  },

  async getAnswer(user_id,test_id){
    const paperSub = await knex("papers").select({id:"question_id"}).where({"test_id": test_id});
    // console.log(paperSub);
    // const questionsSub = await knex("questions").select("*").where(paperSub[0])
    // console.log(questionsSub);
 
    return knex("results")
      .join("tests","tests.id","=","results.test_id")
      .join("questions","questions.id","=","results.question_id")
      .select({
        question_id:"questions.id",
        question_title:"tests.question_title",
        question:"questions.question",
        answer_img:"results.answer_img",
        result:"results.result"
      })
      .where({
        "results.student_id" : user_id,
        "tests.id" : test_id,
        "results.test_id":test_id
      })
      .then(res => {
        // console.log(res);
        let result = {
          question_title: res[0].question_title,
          data: []
        }
        result.data = res.map(obj => {
          return {
            question:obj.question,
            answer_img: obj.answer_img,
            result: obj.result
          }
        });
        // console.log(result);
        return result;
        
      })
                     
  }
  
}