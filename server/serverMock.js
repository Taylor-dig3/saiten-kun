require("dotenv").config();
const express = require("express");
//knexをrequire

const app = express();
// const PORT = process.env.PORT || 3001;

app.use(express.json());

const setupServerMock = () => {
  app.get("/testsMock", (req, res) => {
    console.log("testsMock");
    const testsTable = [
      {
        test_id: 1,
        title: "算数小テスト1",
        made_date: "2022-12-01",
        question_number: 3,
        test_date: "2022-12-14",
      },
      {
        test_id: 2,
        title: "算数小テスト2",
        made_date: "2022-12-01",
        question_number: 10,
        test_date: "2022-12-14",
      },
    ];
    res.send(testsTable);
  });

  app.get("/questionsMock/:test_id", (req, res) => {
    if (Number(req.params.test_id) !== NaN) {
      const questionTable = [
        {
          question_id: 1,
          question: "1+1は？",
          answer: "2",
        },
      ];
      res.send(questionTable);
    } else if (req.params.test_id === undefined) {
      const questionTable = [
        {
          question_id: 1,
          question: "1+1は？",
          answer: "2",
        },
        {
          question_id: 2,
          question: "1+2は？",
          answer: "3",
        },
      ];
      res.send(questionTable);
    } else {
      res.status(404).json({ error: "message" });
    }
  });

  app.post("/questionsMock", (req, res) => {
    console.log("POST:questionsMock", req.body);
  });

  app.put("/testsMock", (req, res) => {
    res.send(2);
    console.log("PUT:tests.Mock", req.body);
  });

  return app;
};

module.exports = { setupServerMock };
