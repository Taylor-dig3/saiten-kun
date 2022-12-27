import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { questionAndAnswer } from '../../shareComponents/atom';
import { useRecoilState } from "recoil";
import axios from "axios";

import "./T3TestCreate.css";

import GradeSelection from "./components/GradeSelection";
import SubjectSelection from "./components/SubjectSelection";
import QuestionAmountSelection from "./components/QuestionAmountSelection";

export default function T3TestCreate() {
  const [selectGrade, setSelectGrade] = useState(1);
  const [selectSubject, setSelectSubject] = useState("算数");
  const [selectQuestionAmount, setSelectQuestionAmount] = useState(10);
  const [chatGptQAndA,setChatGptQAndA] = useRecoilState(questionAndAnswer);

  const navigate = useNavigate();
  const t4ConfirmationCreatedTestDisplay = () => {
    const API_KEY = "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";
    axios
      .post(
        "https://api.openai.com/v1/completions",
        JSON.stringify({
          model: "text-davinci-003",
          prompt: `小学校${selectGrade}年生向けの${selectSubject}の問題をください。絶対に${selectQuestionAmount}問出題してください。"Question:"と"Answer:"に分けて改行して出力してください。Answerは単語または数字にしてください。`,
          max_tokens: 1000,
          temperature: 0.3,
          // top_p: 1,
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
        console.log(getText)
        const arr = getText
          .map((elem) => elem.trim())
          .filter((elem) => {
            // return !(elem.search(/\n/) > -1 || elem.search(/\t/) > -1 || elem === "" ||(elem.indexOf("Question") > -1 && elem.length < 11)||(elem.indexOf("Answer") > -1 && elem.length < 10));
            return !(elem.search(/\n/) > -1 || elem.search(/\t/) > -1 || elem === "" );
          });
          console.log(arr)
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
            }else if(colonZenkakuIndex > -1){
              newWord = newWord.slice(colonZenkakuIndex + 1);
            }else if(commaIndex > -1){
              newWord = newWord.slice(commaIndex + 1);
            }else if(spaceIndex > -1){
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
            }else if(colonZenkakuIndex > -1){
              newWord = newWord.slice(colonZenkakuIndex + 1);
            }else if(commaIndex > -1){
              newWord = newWord.slice(commaIndex + 1);
            }else if(spaceIndex > -1){
              newWord = newWord.slice(spaceIndex + 1);
            }
            return newWord.trim();
          });

        const resultObj = [];
        for (let i = 0; i < selectQuestionAmount; i++) {
          const obj = { question: questionArr[i], answer: answerArr[i] };
          resultObj.push(obj);
        }
        console.log(resultObj);
        setChatGptQAndA(resultObj);
      });

    navigate("../T4ConfirmationCreatedTest");
  };

  const t1MenuDisplay = () => {
    navigate("../T1Menu");
  };

  return (
    <>
      <div>先生テスト作成画面</div>
      <div className="creation-conditions-container">
        <GradeSelection
          selectGrade={selectGrade}
          setSelectGrade={setSelectGrade}
        />
        <SubjectSelection
          selectSubject={selectSubject}
          setSelectSubject={setSelectSubject}
        />
        <QuestionAmountSelection
          selectQuestionAmount={selectQuestionAmount}
          setSelectQuestionAmount={setSelectQuestionAmount}
        />
      </div>
      <button onClick={t4ConfirmationCreatedTestDisplay}>作成</button>
      <button onClick={t1MenuDisplay}>戻る</button>
    </>
  );
}
