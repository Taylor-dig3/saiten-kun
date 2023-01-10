import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { questionAndAnswer, login } from "../../shareComponents/atom";
import { useRecoilState, useRecoilValue } from "recoil";
import axios from "axios";

export default function T4ConfirmationCreatedTest() {
  const loginInfo = useRecoilValue(login);
  const [description, setDescription] = useState("");
  const [title, setTitle] = useState("");
  const [qAndA, setQAndA] = useRecoilState(questionAndAnswer);
  const navigate = useNavigate();

  const t3TestCreateDisplay = () => {
    navigate("../T3TestCreate");
  };
  const t1MenuDisplay = () => {
    navigate("../T1Menu");
  };
  const register = async () => {
    const editQuestions = document.querySelectorAll(".question-input");
    const editAnswers = document.querySelectorAll(".answer-input");
    const qAndAArr = [];

    for (let i = 0; i < editQuestions.length; i++) {
      qAndAArr.push({
        question: editQuestions[i].value,
        answer: editAnswers[i].value,
      });
    }

    const registerQandAObj = {
      ...qAndA,
      teacher_id: loginInfo.userId,
      test_name: title,
      question_title: description,
      data: qAndAArr,
    };

    const subjects = ["国語", "算数", "理科", "社会", "英語"];
    const subjectId = () => {
      //教科名からsubject_idに変換
      for (const elem of subjects) {
        console.log(elem);
        if (elem === registerQandAObj.subject) {
          console.log(subjects.indexOf(elem) + 1);
          return subjects.indexOf(elem) + 1;
        }
      }
    };
    //アンサーデータをDBに送信
    await axios
      .post("/question", {
        test_name: registerQandAObj.test_name,
        question_title: registerQandAObj.question_title,
        grade_id: registerQandAObj.grade,
        data: registerQandAObj.data,
        teacher_id: registerQandAObj.teacher_id,
        subject_id: subjectId(),
      })
      .then((res) => {
        console.log("then");
        return res.data.text;
      });

    console.log(registerQandAObj);
  };

  const descriptionChange = (e) => {
    setDescription(e.target.value);
  };
  const titleChange = (e) => {
    setTitle(e.target.value);
  };

  //aaaa

  useEffect(() => {
    // console.log("rion");
    console.log(qAndA);
  }, [qAndA]);
  return (
    <>
      <div>先生作成テスト確認画面</div>
      <button onClick={t3TestCreateDisplay}>戻る</button>
      {/* <button onClick={t1MenuDisplay}>登録</button> */}
      <button onClick={register}>登録</button>
      <div>
        <input
          type="text"
          placeholder="テストタイトルを入力してください"
          onChange={titleChange}
        />
        <input
          type="text"
          placeholder="問題の説明を入力してください"
          onChange={descriptionChange}
        />
      </div>
      {qAndA.data.map((elem, index) => {
        return (
          <div key={index}>
            <input
              type="text"
              className="question-input"
              defaultValue={elem.question}
            />
            <input
              type="text"
              className="answer-input"
              defaultValue={elem.answer}
            />
          </div>
        );
      })}
    </>
  );
}

// import React, { useEffect,useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { questionAndAnswer,login } from "../../shareComponents/atom";
// import { useRecoilState,useRecoilValue } from "recoil";

// export default function T4ConfirmationCreatedTest() {
//   const loginInfo = useRecoilValue(login);
//   const [description, setDescription] =  useState("")
//   const [qAndA, setQAndA] = useRecoilState(questionAndAnswer);
//   const navigate = useNavigate();

//   const t3TestCreateDisplay = () => {
//     navigate("../T3TestCreate");
//   };
//   const t1MenuDisplay = () => {
//     navigate("../T1Menu");
//   };
//   const register = () => {
//     const editQuestions = document.querySelectorAll(".question-input");
//     const editAnswers = document.querySelectorAll(".answer-input");
//     const qAndAArr = [];

//     for (let i = 0; i < editQuestions.length; i++) {
//       qAndAArr.push({ question: editQuestions[i].value, answer: editAnswers[i].value });
//     }

//     const registerQandAObj = {
//       ...qAndA,
//       teacher_id:loginInfo.userId,
//       question_title:description,
//       data:qAndAArr
//     }
//     //ここでAPIを実行してDBに問題を登録する。
//     console.log(registerQandAObj);
//   };

// const descriptionChange = (e)=>{
//   setDescription(e.target.value);
// }

// //aaaa

//   useEffect(() => {
//     // console.log("rion");
//     console.log(qAndA);
//   }, [qAndA]);
//   return (
//     <>
//       <div>先生作成テスト確認画面</div>
//       <button onClick={t3TestCreateDisplay}>戻る</button>
//       {/* <button onClick={t1MenuDisplay}>登録</button> */}
//       <button onClick={register}>登録</button>
//       <div>
//         <input type="text" placeholder="問題の説明を入力してください"  onChange={descriptionChange}/>
//       </div>
//       {qAndA.data.map((elem, index) => {
//         return (
//           <div key={index}>
//             <input
//               type="text"
//               className="question-input"
//               defaultValue={elem.question}
//             />
//             <input type="text" className="answer-input" defaultValue={elem.answer} />
//           </div>
//         );
//       })}
//     </>
//   );
// }
