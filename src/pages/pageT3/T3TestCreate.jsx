import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FormControl, InputLabel, Select } from "@mui/material";
import { login, questionAndAnswer } from "../../shareComponents/atom";
import { useRecoilState, useRecoilValue } from "recoil";
import axios from "axios";

import "./T3TestCreate.css";

import GradeSelection from "./components/GradeSelection";
import SubjectSelection from "./components/SubjectSelection";
import QuestionAmountSelection from "./components/QuestionAmountSelection";

export default function T3TestCreate() {
  const [selectGrade, setSelectGrade] = useState(1);
  const [selectSubject, setSelectSubject] = useState("算数");
  const [selectQuestionAmount, setSelectQuestionAmount] = useState(10);
  const [chatGptQAndA, setChatGptQAndA] = useRecoilState(questionAndAnswer);
  const loginInfo = useRecoilValue(login);

  const navigate = useNavigate();
  const t4ConfirmationCreatedTestDisplay = () => {
    const loadingContainer = document.querySelector("#T3-loading-container");
    loadingContainer.className = "T3-loading-visible";
    const API_KEY = process.env.REACT_APP_OPENAI_API_KEY;

    let searchWord;

    switch (selectSubject) {
      case "算数":
        searchWord = `小学校${selectGrade}年生が解く算数の計算問題を出題してください。絶対に${selectQuestionAmount}問出題してください。"Question:"と"Answer:"に分けて改行して出力してください。Answerは数字にしてください。`;
        break;
      case "国語":
        searchWord = `小学校${selectGrade}年生が解く漢字の読み取り問題を出題してください。"Question:"と"Answer:"に分けて改行して出力してください。Answerはひらがなにしてください。必ず${selectQuestionAmount}問ください。`;
        break;
      case "社会":
        const wordArr = [
          `小学校${selectGrade}年生向けの社会科の歴史に関する問題を出題してください。"Question:"と"Answer:"に分けて改行して出力してください。Answerは単語にしてください。必ず${selectQuestionAmount}問分ください。`,
          `小学校${selectGrade}年生向けの社会科の都道府県に関する問題を出題してください。"Question:"と"Answer:"に分けて改行して出力してください。Answerは単語にしてください。必ず${selectQuestionAmount}問分ください。`,
        ];
        searchWord = wordArr[Math.round(Math.random())];
        break;
      case "理科":
        searchWord = `小学${selectGrade}年生向けの理科の問題を${selectQuestionAmount}個出題して。"Question:"と"Answer:"に分けて改行して出力して。`;
        break;
      case "英語":
        searchWord = `小学${selectGrade}年生向けの英語の問題を${selectQuestionAmount}個出題して。"Question:"と"Answer:"に分けて改行して出力して。Answerは単語にしてください。`;
        break;

      default:
    }

    axios
      .post(
        "https://api.openai.com/v1/completions",
        JSON.stringify({
          model: "text-davinci-003",
          prompt: searchWord,
          max_tokens: 1000,
          temperature: 0.3,
          frequency_penalty: 0.5,
          presence_penalty: 0.0,
        }),
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${API_KEY}`,
          },
        }
      )
      .then((res) => {
        let getText = res.data.choices[0].text;
        getText = getText.split(/(\n|\s{3,}|\t)/);
        const arr = getText
          .map((elem) => elem.trim())
          .filter((elem) => {
            return !(
              elem.search(/\n/) > -1 ||
              elem.search(/\t/) > -1 ||
              elem === ""
            );
          });
        const questionArr = arr
          .filter((elem, index) => {
            return index % 2 === 0;
          })
          .map((elem) => {
            let newWord = elem;
            const colonIndex = elem.indexOf(":");
            const colonZenkakuIndex = elem.indexOf("：");
            const commaIndex = elem.indexOf(".");
            const spaceIndex = elem.indexOf(" ");
            if (colonIndex > -1) {
              newWord = newWord.slice(colonIndex + 1);
            } else if (colonZenkakuIndex > -1) {
              newWord = newWord.slice(colonZenkakuIndex + 1);
            } else if (commaIndex > -1) {
              newWord = newWord.slice(commaIndex + 1);
            } else if (spaceIndex > -1) {
              newWord = newWord.slice(spaceIndex + 1);
            }
            return newWord.trim();
          });

        const answerArr = arr
          .filter((elem, index) => {
            return !(index % 2 === 0);
          })
          .map((elem) => {
            let newWord = elem;
            const colonIndex = elem.indexOf(":");
            const colonZenkakuIndex = elem.indexOf("：");
            const commaIndex = elem.indexOf(".");
            const spaceIndex = elem.indexOf(" ");
            if (colonIndex > -1) {
              newWord = newWord.slice(colonIndex + 1);
            } else if (colonZenkakuIndex > -1) {
              newWord = newWord.slice(colonZenkakuIndex + 1);
            } else if (commaIndex > -1) {
              newWord = newWord.slice(commaIndex + 1);
            } else if (spaceIndex > -1) {
              newWord = newWord.slice(spaceIndex + 1);
            }
            return newWord.trim();
          });

        const qAndAArry = [];
        for (let i = 0; i < selectQuestionAmount; i++) {
          const obj = { question: questionArr[i], answer: answerArr[i] };
          qAndAArry.push(obj);
        }
        const resultObj = {
          grade: selectGrade,
          subject: selectSubject,
          data: qAndAArry,
        };
        setChatGptQAndA(resultObj);
        loadingContainer.className = "T3-loading-hidden";
        navigate("../T4ConfirmationCreatedTest");
      });
  };

  const t1MenuDisplay = () => {
    navigate("../T1Menu");
  };

  useEffect(() => {
    if (loginInfo.loginState === "notYetLoggedIn") {
      navigate("../");
    }
  }, []);

  return (
    <div className="T1-container">
      <span className="user-info">{loginInfo.name}</span>
      <div className="T3-title">テスト作成</div>
      <div className="T3-subtitle">学年</div>
      <GradeSelection
        selectGrade={selectGrade}
        setSelectGrade={setSelectGrade}
      />
      <div className="T3-subtitle">教科</div>
      <SubjectSelection
        selectSubject={selectSubject}
        setSelectSubject={setSelectSubject}
      />
      <div className="T3-subtitle">問題数</div>
      <QuestionAmountSelection
        selectQuestionAmount={selectQuestionAmount}
        setSelectQuestionAmount={setSelectQuestionAmount}
      />
      <br></br>
      <br></br>
      <br></br>
      <button
        className={"T1-button"}
        onClick={t4ConfirmationCreatedTestDisplay}
      >
        作成
      </button>
      <button className={"T1-button"} onClick={t1MenuDisplay}>
        戻る
      </button>
      <div className="T3-loading-hidden" id="T3-loading-container">
        <div id="div-loading">
          <div id="loading-background"></div>

          <div id="loading-text">テスト作成中...</div>
        </div>
      </div>
    </div>
  );
}
