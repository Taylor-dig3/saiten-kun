require("dotenv").config();
const express = require("express");
const path = require("path");
const {
  getStudentLogin,
  getTeacherLogin,
} = require("./db.controller/login.controller");
// const { getAllQuestion }= require("./db.controller/tests.controller");
const {
  startTest,
  getTest,
  postAnswer,
  getAnswer,
} = require("./db.controller/student.controller");
//knexをrequire
const axios = require("axios");
const {
  registerId,
  pickupStudents,
  updatePassword,
  pickupTests,
  updateResult,
  putTestStart,
  putTestEnd,
  checkTestStatus,
  registerQuestion,
  getStudentIdList,
  getSelectTests,
  checkResultStatus,
  automaticGrading
} = require("./db.controller/teacher.controller");
const { ResetTvSharp } = require("@mui/icons-material");
// const PORT = process.env.PORT || 3001;
const FormData = require("form-data");
const { Buffer } = require("buffer");

const setupServer = () => {
  console.log("first");

  const app = express();
  app.use(express.static(path.join(__dirname, "../build")));
  app.use(express.json({ extended: true, limit: "100mb" }));

  app.post("/login", async (req, res) => {
    let result = {};
    if (req.body.student_flg) {
      try {
        result = await getStudentLogin(req.body.user_id, req.body.password);
        console.log("result", result);
        res.send(result).status(200).end();
      } catch (err) {
        console.log(err);
        res.send(err).status(404).end();
      }
    } else {
      try {
        result = await getTeacherLogin(req.body.user_id, req.body.password);
        res.send(result).status(200).end();
      } catch (err) {
        res.status(404).end();
      }
    }
  });

  app.get("/questions", async (req, res) => {
    console.log("bbbbbbbbbbbbbbbbbbbbbbbb");
    let result;
    try {
      result = await startTest(req.query.user_id);
      res.json(result).status(200).end();
    } catch (err) {
      console.log(err);
      res.send(err).status(404).end();
    }
  });

  app.get("/testDetail",async (req,res)=>{
    console.log("選択した問題と解答を取得するAPI",req.query.test_id)
    let result;
    try {
      result = await getSelectTests(Number(req.query.test_id));
      console.log("選択した問題と解答を取得するAPI",result)
      res.json(result).status(200).end();
    } catch (err) {
      console.log(err);
      res.send(err).status(404).end();
    }
  })

  app.get("/tests", async (req, res) => {
    console.log("開始");
    let result;
    try {
      console.log("aaaaaaaa");
      result = await getTest(req.query.user_id);
      console.log(result);
      res.json(result).status(200).end();
    } catch (err) {
      console.log(err);
      res.send(err).status(404).end();
    }
  });

  app.get("/answer", async (req, res) => {
    console.log("cccccccccccc");
    let result1;
    try {
      result1 = await getAnswer(req.query.user_id, req.query.test_id);
      res.json(result1).status(200).end();
    } catch (err) {
      console.log(err);
    }
  });

  app.post("/riontest",  (req, res) => {
    const form = new FormData();

    const decodedFile = Buffer.from(req.body.data, "base64");
    console.log(decodedFile);
    form.append("imgData", decodedFile, "test.jpg");
    axios({
      method: "post",
      url: "https://ocr-api.userlocal.jp/recognition/cropped",
      data: form,
      headers: {
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
        "Content-Type": "multipart/form-data",
      },
    })
      .then((response) => {
        console.log("response.data", response.data);
        res.send(response.data).status(200).end();
        // return res.data;
      })
      .catch((err) => {
        console.log("err", err);
        res.send(err).status(400).end();
      });

  });

  app.post("/answer", async (req, res) => {
    console.log("aaaaaaaa8");
    let result;
    try {
      result = await postAnswer(req.body);
      res.status(200).end();
    } catch (err) {
      res.status(404).end();
    }
  });

  app.put("/answer", async (req, res) => {
    let result;
    try {
      console.log("aaaaaaaaaaaaa");
      result = await updateResult(req.body.result_id);
      res.json(result).status(200).end();
    } catch (err) {
      res.send(err).status(404).end();
    }
  });

  app.post("/student", (req, res) => {
    let result = {};
    console.log(req.body);

    try {
      result = registerId(
        req.body.name,
        req.body.grade_id,
        req.body.password,
        req.body.teacher_id
      );
      res.json(result).status(200).end();
    } catch (err) {
      console.log(err);
      res.send(err).status(404).end();
    }
  });

  app.get("/student", async (req, res) => {
    let result = {};
    console.log(req.query);

    try {
      result = await pickupStudents(req.query.teacher_id);
      console.log(result);
      res.json(result).status(200).end();
    } catch (err) {
      console.log(err);
      res.send(err).status(404).end();
    }
  });

  app.get("/teacherTests", async (req, res) => {
    let result = {};
    console.log(req);
    console.log("dddddddddd1");

    try {
      result = await pickupTests(req.query.teacher_id);
      console.log(result);
      res.json(result).status(200).end();
    } catch (err) {
      console.log(err);
      res.send(err).status(404).end();
    }
  });

  app.put("/password", (req, res) => {
    let result = {};
    console.log(req);

    try {
      result = updatePassword(req.body.user_id, req.body.password);
      res.json(result).status(200).end();
    } catch (err) {
      console.log(err);
      res.send(err).status(404).end();
    }
  });

  app.post("/question", (req, res) => {
    let result = {};
    console.log("rrrrrrrrrrrrrr")
    console.log(req.body);

    try {
      result = registerQuestion(
        req.body.test_name,
        req.body.question_title,
        req.body.grade_id,
        req.body.data,
        req.body.teacher_id,
        req.body.subject_id
      );
      res.json(result).status(200).end();
    } catch (err) {
      console.log(err);
      res.send(err).status(404).end();
    }
  });
  app.put("/teacher/testStart", async (req, res) => {
    let result;
    try {
      result = await putTestStart(req.body.teacher_id, req.body.test_id,req.body.time_limit);
      console.log(result)
      res.json(result).status(200).end();
    } catch (err) {
      console.log(err);
      res.send(err).status(404).end();
    }
  });

  app.put("/teacher/testEnd", async (req, res) => {
    let result;
    try {
      result = await putTestEnd(req.body.teacher_id);
      res.json(result).status(200).end();
    } catch (err) {
      console.log(err);
      res.send(err).status(404).end();
    }
  });
  app.get("/teacher/testStatus", async (req, res) => {
    let result;
    try {
      result = await checkTestStatus(req.query.teacher_id);
      res.json(result).status(200).end();
    } catch (err) {
      console.log(err);
      res.send(err).status(404).end();
    }
  });
  app.get("/teacher/studentIdList", async (req, res) => {
    let result;
    try {
      result = await getStudentIdList(req.query.teacher_id);
      res.json(result).status(200).end();
    } catch (err) {
      console.log(err);
      res.send(err).status(404).end();
    }
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



  app.get("/teacher/checkResultStatus", async(req, res) => {
    console.log("checkResultStatus");
    try {
      const result = await checkResultStatus(req.query.test_id)
      res.send(result).status(200).end();
    } catch(err){
      res.status(404).end();
    }
  });


  app.get("/teacher/automaticGrading", async(req, res) => {
    const result = await automaticGrading(req.query.test_id)
    res.send(result).status(200).end();
  });
  // app.post("/questions", async (req, res) => {
  //   const testDate = {
  //     question: "testQuestion",
  //     answer: "testAnswer",
  //   };
  // });
  // =======
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
  // >>>>>>> Cure-Spicy/addAPI

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
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname,'/index.html'));
  });
  return app;
};

module.exports = { setupServer };
