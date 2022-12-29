// const axios = require("axios").default;
import axios from "axios";
// const FormData = require('form-data');
// const fs = require('fs');
// const form = new FormData();
// form.append('imgData', fs.readFileSync('test4.png'), 'test4.png');

// axios.post(
//   'https://ocr-api.userlocal.jp/recognition/raw',
//   form,
// ).then(res => {
//   console.log("res = ", res.data);
// });

//今回のMVP外
function outputResult(test_id) {
  try {
    return axios
      // .get("/questions", {
        .get("/questions", {
        params: {
          test_id: test_id,
        },
      })
      .then((response) => {
        console.log(response.data);
        return response.data;
      });
  } catch (err) {
    console.error(err);
  }
}

function getAllTests() {
  try {
    // return axios.get("/tests").then((response) => {
      return axios.get("/tests").then((response) => {
      return response.data.map((obj) => {
        obj["grade"] = "1";
        obj["subject"] = "国語";
        return obj;
      });
    });
  } catch (error) {
    console.error(error);
  }
}

async function startTest(test_id) {
  // console.log(test_id);
  try {
    console.log("rionやで");
    // const response = await
    return axios

      // .get("/questions", {
        .get("/question", {
        params: {
          test_id: Number(test_id),
        },
      })
      .then((response) => {
        console.log(response);
        return response.data;
      });
    // const tests = response.date;
    // console.log("tests;", response);
    // return tests;
  } catch (error) {
    console.error(error);
  }
}

export { startTest, getAllTests };
// /*
// startTest(test_id){
//   return {
//     title:"小テスト2",
//     questions:["1+1","1+3","1+5"],
//     answer:["2","4","6"]
//   }
// }
// */

// outputResult(test_id){
//   return [
//     {
//       student_id:1,
//       answer:["a.img", "b.img", "c.img"],
//       judge:[true,true,false]
//     },
//     {
//       student_id:2,
//       answer:["d.img", "e.img", "f.img"],
//       judge:[true,false,false]
//     }
// }

// submit(test_id,student_id,name_img,answer_img_Arr){
//   //const answer_img_Arr_data = answer_img_Arr
//   //serverで採点するときに使う
// }

// answer_text(){
//   aipiに送ってanswer_img_Arr_dataを文字列にする
// }

// judgeFun(){
//   //answer()とデータベースの回答と比較して判定
//   //return データベースに保存　問題ごと、生徒ごと
// }

// //フロントが利用する関数一覧
// //startTest()           テスト実施ボタンを押すと、選択しているテスト画面（画面４）に必要な情報を渡す関数
// //outputResult()        提出ボタンを押すと、テスト結果（画面３）に必要な情報を渡す関数
// //submit()              提出ボタンを押すと、回答情報を送付する関数
// //createQuestion()      chatGPTでテストを作成する関数
