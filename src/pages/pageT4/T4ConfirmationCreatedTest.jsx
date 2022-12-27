import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { questionAndAnswer } from "../../shareComponents/atom";
import { useRecoilState } from "recoil";

export default function T4ConfirmationCreatedTest() {
  const [qAndA, setQAndA] = useRecoilState(questionAndAnswer);
  const navigate = useNavigate();

  const t3TestCreateDisplay = () => {
    navigate("../T3TestCreate");
  };
  const t1MenuDisplay = () => {
    navigate("../T1Menu");
  };
  const getInputValue = () => {
    const editQuestions = document.querySelectorAll(".question-input");
    const editAnswers = document.querySelectorAll(".answer-input");

    console.log("rion");
    const qAndAArr = [];
    for (let i = 0; i < editQuestions.length; i++) {
      qAndAArr.push({ question: editQuestions[i].value, answer: editAnswers[i].value });
    }

    const registerQandAObj = {
      description:"dddsdsd",
      createDate:"2022/12/27",
      qAndA:qAndAArr

    }
    console.log(registerQandAObj);
  };

  useEffect(() => {
    // console.log("rion");
    console.log(qAndA);
  }, [qAndA]);
  return (
    <>
      <div>先生作成テスト確認画面</div>
      <button onClick={t3TestCreateDisplay}>戻る</button>
      {/* <button onClick={t1MenuDisplay}>登録</button> */}
      <button onClick={getInputValue}>登録ss</button>
      <div>
        <input type="text" placeholder="問題の説明を入力してください" />
      </div>
      {qAndA.map((elem, index) => {
        return (
          <div key={index}>
            <input
              type="text"
              className="question-input"
              value={elem.question}
            />
            <input type="text" className="answer-input" value={elem.answer} />
          </div>
        );
      })}
    </>
  );
}
