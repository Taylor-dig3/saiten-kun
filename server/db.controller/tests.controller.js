const knex = require("../../knex");

module.exports = {
  getQuestion(testId) {
    return knex("tests")
      .join("papers", "papers.test_id", "tests.id")
      .join("questions", "questions.id", "papers.question_id")
      .select({
        id: "questions.id",
        name: "tests.name",
        question: "questions.question",
        answer: "questions.answer",
      })
      .where({
        "papers.test_id": testId,
      });
  },

  getAllQuestion() {
    return knex
      .select({
        id: "questions.id",
        question: "questions.question",
        answer: "questions.answer",
      })
      .from("questions");
  },

  getTests() {
    return knex("tests")
      .join("papers", "papers.test_id", "tests.id")
      .select({
        test_id: "tests.id",
        comment: "tests.name",
        made_date: "tests.make_date",
        testdate: "tests.run_date",
      })
      .groupBy("tests.id")
      .count("papers.question_id", { as: "question_number" });
  },
  postQuestion(newQuestion) {
    console.log("aaaaaa");
    console.log(newQuestion);
    return knex("questions").insert(newQuestion);
  },
  putSelected(selectId) {
    return knex("selected").whereNot("test_id", selectId).update({
      test_id: selectId,
    });
  },
};
