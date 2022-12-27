require("dotenv").config();
const express = require("express");
const { getStudentLogin, getTeacherLogin } = require("./db.controller/login.controller")
const { getAllQuestion }= require("./db.controller/tests.controller");
//knexをrequire
const axios = require("axios");
// const PORT = process.env.PORT || 3001;

// app.use(express.json());

const setupServer = () => {
  const app = express();
  app.use(express.json());

  app.post("/login", async(req, res) => {
    let result = {};
    if(req.body.student_flg){
      try {
        result = await getStudentLogin(req.body.user_id,req.body.password);
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

  // app.get("/tests", async (req, res) => {
  //   //knexでDBからtestsテーブルとpaperテーブルを使って必要な中身を全部持ってくる。
  //   const result = await apiModule.getTests();
  //   res.json(result).status(200).end();
  // });

  // app.get("/questions", async (req, res) => {
  //   let result;
  //   if (req.query.test_id !== undefined) {
  //     console.log("aaaaaaa");
  //     result = await getQuestion(req.query.test_id);
  //   } else {
  //     console.log("aaaaaaa");
  //     result = await getAllQuestion();
  //   }
  //   console.log(result);
  //   res.json(result).status(200).end();
  //   //test_idが入っているときはそのidと紐づくquestionの一覧を返す
  //   //test_idが入っていないときは全てのquestionsを返す。
  // });

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
