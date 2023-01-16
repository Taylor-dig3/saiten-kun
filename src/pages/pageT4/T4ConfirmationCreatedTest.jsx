import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { questionAndAnswer, login } from "../../shareComponents/atom";
import { useRecoilValue } from "recoil";
import axios from "axios";
import T4Snackbar from "./components/T4Snackbar";

import "./T4ConfirmationCreatedTest.css";

export default function T4ConfirmationCreatedTest() {
  const loginInfo = useRecoilValue(login);
  const [description, setDescription] = useState("");
  const [title, setTitle] = useState("");
  const qAndA = useRecoilValue(questionAndAnswer);
  const navigate = useNavigate();
  const [isSnackbar, setIsSnackbar] = useState(false);
  const [errorWord, setErrorWord] = useState("");
  const t3TestCreateDisplay = () => {
    navigate("../T3TestCreate");
  };

  const register = async () => {

    const editQuestions = document.querySelectorAll("#question-input");
    const editAnswers = document.querySelectorAll("#answer-input");
    const testTitle = document.querySelector("#testTitle");
    const testDescription = document.querySelector("#testDescription");
    const qAndAArr = [];

    let count = 0;

    for (let i = 0; i < editQuestions.length; i++) {
      if (
        //空欄がある場合アラート
        editQuestions[i].value === "" ||
        editAnswers[i].value === "" ||
        testTitle.value === "" ||
        testDescription === ""
      ) {
        setErrorWord("空欄を全て入力してください！");
        setIsSnackbar(true);
      } else {
        //空欄なければqAndAArrにデータ格納
        qAndAArr.push({
          question: editQuestions[i].value,
          answer: editAnswers[i].value,
        });
        count++;

        if (count === editQuestions.length) {
          //全てのデータをqAndAArrに格納した段階でAPI投げる
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
              if (elem === registerQandAObj.subject) {
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
              // loadingContainer.className = "T4-registering-hidden";
              navigate("../T1Menu");
              return res.data.text;
            });

        }
      }
    }
  };

  const descriptionChange = (e) => {
    setDescription(e.target.value);
  };
  const titleChange = (e) => {
    setTitle(e.target.value);
  };

  useEffect(() => {
    if(loginInfo.loginState === "notYetLoggedIn"){
     navigate("../")
    }
     }, []);

  return (
    <div className="T4-container">
      <span className="user-info">{loginInfo.name}</span>
      <div className="T4-title">作成テスト確認</div>
      <div className="T4-subtitle">テストタイトル</div>
      <input
        id="testTitle"
        className="T4-text"
        type="text"
        placeholder="テストタイトルを入力"
        onChange={titleChange}
      />
      <div className="T4-subtitle">説明</div>
      <input
        id="testDescription"
        className="T4-text"
        type="text"
        placeholder="問題の説明を入力"
        onChange={descriptionChange}
      />
      <div className="T4-container-qa">
        <div className="T4-subtitle-qa-blank"></div>
        <div className="T4-subtitle-question">問題</div>
        <div className="T4-subtitle-answer">解答</div>
      </div>

      {qAndA.data.map((elem, index) => {
        return (
         
            <div className="T4-text-container" key={index}>
              <div className="T4-question-no" key={index}>
                No.{index + 1}
              </div>
              <input
                id="question-input"
                type="text"
                className="T4-text-question"
                defaultValue={elem.question}
              />
              <input
                id="answer-input"
                type="text"
                className="T4-text-answer"
                defaultValue={elem.answer}
              />
            </div>
         
        );
      })}
      <button className={"T1-button"} onClick={register}>
        登録
      </button>
      <button className={"T1-button"} onClick={t3TestCreateDisplay}>
        戻る
      </button>
      <T4Snackbar
        isSnackbar={isSnackbar}
        setIsSnackbar={setIsSnackbar}
        errorWord={errorWord}
      />
    </div>
  );
}
