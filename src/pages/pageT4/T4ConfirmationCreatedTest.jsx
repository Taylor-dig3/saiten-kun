import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { questionAndAnswer, login } from "../../shareComponents/atom";
import { useRecoilState, useRecoilValue } from "recoil";
import axios from "axios";

import "./T4ConfirmationCreatedTest.css";

export default function T4ConfirmationCreatedTest() {
  const loginInfo = useRecoilValue(login);
  const [description, setDescription] = useState("");
  const [title, setTitle] = useState("");
  const [qAndA, setQAndA] = useRecoilState(questionAndAnswer);
  const navigate = useNavigate();

  const t3TestCreateDisplay = () => {
    navigate("../T3TestCreate");
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
    navigate("../T1Menu");
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
    <div className="T4-container">
      <div className="T4-title">作成テスト確認</div>
      <div className="T4-subtitle">テストタイトル</div>
      <input
        className="T4-text"
        type="text"
        placeholder="テストタイトルを入力"
        onChange={titleChange}
      />
      <div className="T4-subtitle">説明</div>
      <input
        className="T4-text"
        type="text"
        placeholder="問題の説明を入力"
        onChange={descriptionChange}
      />
      <div className="T4-container-qa">
        <div className="T4-subtitle-qa-blank"></div>
        <div className="T4-subtitle-qa">問題</div>
        <div className="T4-subtitle-qa">解答</div>
      </div>

      {qAndA.data.map((elem, index) => {
        return (
          <>
            <div className="T4-text-container" key={index}>
              <div className="T4-question-no" key={index}>
                No.{index + 1}
              </div>
              <input
                type="text"
                className="T4-text"
                defaultValue={elem.question}
              />
              <input
                type="text"
                className="T4-text"
                defaultValue={elem.answer}
              />
            </div>
          </>
        );
      })}
      <button className={"T1-button"} onClick={register}>
        登録
      </button>
      <button className={"T1-button"} onClick={t3TestCreateDisplay}>
        戻る
      </button>
    </div>
  );
}
