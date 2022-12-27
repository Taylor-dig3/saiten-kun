require("dotenv").config();
const { response } = require("express");
const express = require("express");
const { readOnlySelector } = require("recoil");
//knexをrequire

const app = express();
// const PORT = process.env.PORT || 3001;

app.use(express.json());

const setupServerMock = () => {
  app.post("/loginMock", (req, res) => {
    console.log("loginMock");
    if (req.body.login_id === 1) {
      const response = {
        user_id: 1,
        name: "田中　花子",
        login_state: "studentLogin",
      };
    } else if (req.body.login_id === 2) {
      const response = {
        user_id: 2,
        name: "田中　花子",
        login_state: "teacherLogin",
      };
    } else {
      const response = {
        user_id: null,
        name: null,
        login_state: "notYetLoggedIn",
      };
    }
    res.send(response).status(200).end();
  });

  app.get("/questionMock", (req, res) => {
    console.log("questionMock");
    const response = {
      question_title: "漢字をひらがなに直しなさい",
      data: [
        {
          question_id: 1,
          question: "草がはえる",
          answer: "くさ",
        },
        {
          question_id: 2,
          question: "歯がぬけた",
          answer: "は",
        },
        {
          question_id: 3,
          question: "親しらず",
          answer: "おや",
        },
      ],
    };
    res.send(response).status(200).end();
  });

  app.get("/testsMock", (req, res) => {
    console.log("testsMock");
    const testTable = [
      {
        test_id: 1,
        title: "国語小テスト1",
        grade: 5,
        subject: "国語",
        question_number: 3,
        test_date: "2022-12-14",
      },
      {
        test_id: 2,
        title: "国語小テスト1",
        grade: 5,
        subject: "国語",
        question_number: 4,
        test_date: "2022-12-30",
      },
    ];
    res.send(testTable).status(200).end();
  });

  app.post("/answerMock", (req, res) => {
    res.status(200).end();
  });

  app.get("/answerMock", (req, res) => {
    console.log("answerMock");
    const resultTable = {
      question_title: "漢字をひらがなに直しなさい",
      data: [
        {
          question: "草がはえる",
          answer_img: "logo192.png",
          result: true,
        },
        {
          question: "歯がぬけた",
          answer_img: "logo192.png",
          result: false,
        },
        {
          question: "親しらず",
          answer_img: "logo192.png",
          result: false,
        },
      ],
    };
    res.send(resultTable).status(200).end();
  });

  // app.post("/students",())

  // app.get("/testsMock", (req, res) => {
  //   console.log("testsMock");
  //   const testsTable = [
  //     {
  //       test_id: 1,
  //       title: "算数小テスト1",
  //       made_date: "2022-12-01",
  //       question_number: 3,
  //       test_date: "2022-12-14",
  //     },
  //     {
  //       test_id: 2,
  //       title: "算数小テスト2",
  //       made_date: "2022-12-01",
  //       question_number: 10,
  //       test_date: "2022-12-14",
  //     },
  //   ];
  //   res.send(testsTable);
  // });

  // app.get("/questionsMock/:test_id", (req, res) => {
  //   if (Number(req.params.test_id) !== NaN) {
  //     const questionTable = [
  //       {
  //         question_id: 1,
  //         question: "1+1は？",
  //         answer: "2",
  //       },
  //     ];
  //     res.send(questionTable);
  //   } else if (req.params.test_id === undefined) {
  //     const questionTable = [
  //       {
  //         question_id: 1,
  //         question: "1+1は？",
  //         answer: "2",
  //       },
  //       {
  //         question_id: 2,
  //         question: "1+2は？",
  //         answer: "3",
  //       },
  //     ];
  //     res.send(questionTable);
  //   } else {
  //     res.status(404).json({ error: "message" });
  //   }
  // });

  // app.post("/questionsMock", (req, res) => {
  //   console.log("POST:questionsMock", req.body);
  // });

  // app.put("/testsMock", (req, res) => {
  //   res.send(2);
  //   console.log("PUT:tests.Mock", req.body);
  // });

  return app;
};

module.exports = { setupServerMock };
