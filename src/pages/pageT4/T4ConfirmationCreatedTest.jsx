import React, { useEffect,useState } from "react";
import { useNavigate } from "react-router-dom";
import { questionAndAnswer,login } from "../../shareComponents/atom";
import { useRecoilState,useRecoilValue } from "recoil";

export default function T4ConfirmationCreatedTest() {
  const loginInfo = useRecoilValue(login);
  const [description, setDescription] =  useState("")
  const [qAndA, setQAndA] = useRecoilState(questionAndAnswer);
  const navigate = useNavigate();

  const t3TestCreateDisplay = () => {
    navigate("../T3TestCreate");
  };
  const t1MenuDisplay = () => {
    navigate("../T1Menu");
  };
  const register = () => {
    const editQuestions = document.querySelectorAll(".question-input");
    const editAnswers = document.querySelectorAll(".answer-input");
    const qAndAArr = [];

    for (let i = 0; i < editQuestions.length; i++) {
      qAndAArr.push({ question: editQuestions[i].value, answer: editAnswers[i].value });
    }

    const registerQandAObj = {
      ...qAndA,
      teacher_id:loginInfo.userId,
      question_title:description,
      data:qAndAArr
    }
    //ここでAPIを実行してDBに問題を登録する。
    console.log(registerQandAObj);
  };

const descriptionChange = (e)=>{
  setDescription(e.target.value);
}

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
        <input type="text" placeholder="問題の説明を入力してください"  onChange={descriptionChange}/>
      </div>
      {qAndA.data.map((elem, index) => {
        return (
          <div key={index}>
            <input
              type="text"
              className="question-input"
              defaultValue={elem.question}
            />
            <input type="text" className="answer-input" defaultValue={elem.answer} />
          </div>
        );
      })}
    </>
  );
}
