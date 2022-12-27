require("dotenv").config();
const express = require("express");
const { getStudentLogin, getTeacherLogin } = require("./db.controller/login.controller")
const { getAllQuestion }= require("./db.controller/tests.controller");
//knexをrequire
const axios = require("axios");
// const PORT = process.env.PORT || 3001;


const setupServer = () => {

  const app = express();
  app.use(express.json());

  app.post("/login", async(req, res) => {
    console.log("aaaaaaaaa");
    let result;
    if(req.body.student_flg){
      console.log("bbbbbbbbbb");
      try {
        result = await getStudentLogin(req.body.user_id,req.body.password);
        console.log("ccccccccccc");
      } catch(err) {
        console.log(err);
        res.send(err).status(404).end();
      }
    } else {
      try {
        result = await getTeacherLogin(req.body.user_id,req.body.password);
      } catch (err) {
        res.status(404).end();
      }
    }
    res.send(result).status(200).end();
  })

  //テスト結果画面の処理
  app.get("/result", async (req, res) => {
    //resultsテーブルとquestionsテーブルからresultとanswer_imgとanswerを持ってきてjoinで結合
    //その時にqueryで渡すtest_idとstudent_idが必要　　tests.controller.js
  });

  app.get("/test/rion", async (req, res) => {
    console.log("first");
    await axios
      .post(
        "https://ocr-api.userlocal.jp/recognition/cropped",
        // form1,
        "../public/image.png",
        {
          headers: {
            "Access-Control-Allow-Headers": "Content-Type, Authorization",
            "Content-Type": "multipart/form-data",
          },
        }
      )
      .then((res) => {
        console.log("res.data", res.data);
        return res.data.text;
      })
      .catch((err) => {
        console.log("rionError");
        console.log("err", err);
      });
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

  app.post("/questions", async (req, res) => {
    const testDate = {
      question: "testQuestion",
      answer: "testAnswer",
    };
  })
  // app.get("/test/rion", async (req, res) => {
  //   console.log("first");
  //   await axios
  //     .post(
  //       "https://ocr-api.userlocal.jp/recognition/cropped",
  //       // form1,
  //       "../public/image.png",
  //       {
  //         headers: {
  //           "Access-Control-Allow-Headers": "Content-Type, Authorization",
  //           "Content-Type": "multipart/form-data",
  //         },
  //       }
  //     )
  //     .then((res) => {
  //       console.log("res.data", res.data);
  //       return res.data.text;
  //     })
  //     .catch((err) => {
  //       console.log("rionError");
  //       console.log("err", err);
  //     });
  // });

  // app.post("/questions", async (req, res) => {
  //   const testDate = {
  //     question: "testQuestion",
  //     answer: "testAnswer",
  //   };

  //   //chatGPTで生成された問題文と解答例の配列についてquestionsテーブルに各問題を追加する
  //   // const result = await apiModule.postQuestion(testDate);
  //   //想定は、１レコード毎？
  //   const result = await apiModule.postQuestion(req.body);
  //   res.status(200).end();
  // });

  // app.put("/tests", async (req, res) => {
  //   //selectedテーブルのtest_idをフロントで選択されているテストのidに変更する
  //   //選択されているテストのidはreq.bodyに入っている
  //   const result = await apiModule.putSelected(req.body);
  //   res.status(200).end();
  // });
  return app;
};

module.exports = { setupServer };
