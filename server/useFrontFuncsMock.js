const axios = require("axios");

async function getAllTestsMock() {
  try {
    const response = [
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
    const tests = response;
    return tests;
  } catch (error) {
    console.error(error);
  }
}

module.exports = {
  getAllTestsMock,
};

// startTest(test_id){
//   return {
//     title:"小テスト2",
//     questions:["1+1","1+3","1+5"],
//   }
// }

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
// //outputResult()        結果確認ボタンを押すと、テスト結果（画面３）に必要な情報を渡す関数
// //submit()              提出ボタンを押すと、回答情報を送付する関数
// //createQuestion()      chatGPTでテストを作成する関数
