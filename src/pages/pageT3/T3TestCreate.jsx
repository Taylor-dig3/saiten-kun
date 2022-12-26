import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import axios from "axios";

import "./T3TestCreate.css";

import GradeSelection from "./components/GradeSelection";
import SubjectSelection from "./components/SubjectSelection";
import QuestionAmountSelection from "./components/QuestionAmountSelection";

export default function T3TestCreate() {
  const [selectGrade, setSelectGrade] = useState(1);
  const [selectSubject, setSelectSubject] = useState("算数");
  const [selectQuestionAmount, setSelectQuestionAmount] = useState(10);

  const navigate = useNavigate();
  const t4ConfirmationCreatedTestDisplay = () => {
    const API_KEY = "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";
    axios
      .post(
        "https://api.openai.com/v1/completions",
        JSON.stringify({
          model: "text-davinci-003",
          prompt:
            `小学${selectGrade}年生向けの${selectSubject}のテストをください。${selectQuestionAmount}こください。"Question"と"Answer"に分けてください。改行してください。`,
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
        // console.log(res.data.choices[0].text);
        console.log(res.data.choices[0]);
        let  splitText = res.data.choices[0].text.replace(/\t+/g, '');
       splitText = splitText.split(/(\n|"  ")/);
       const arr = splitText.map((elem)=>elem.trim()).filter((elem)=>{
      //  return  !(elem.search(/\n/) > -1 || elem.search(/\s{5,}/) > -1 ||elem === "  " || elem === " " || elem === "")
       return  !(elem.search(/\n/) > -1 || elem === "")
       })
console.log(arr)
       const questionArr = arr.filter((elem,index)=>{
        return index % 2 === 0
       }).map((elem)=>{
        let newWord = elem
        // const questionIndex = elem.indexOf("Question")
        if(elem.indexOf(":") > -1){
          const  colonIndex = elem.indexOf(":")
          // colonIndex = colonIndex + 1
          newWord = newWord.slice(colonIndex + 1)
        }
        return newWord.trim()
       })

       const answerArr = arr.filter((elem,index)=>{
        return !(index % 2 === 0)
       }).map((elem)=>{
        let newWord = elem
        // const questionIndex = elem.indexOf("Question")
        if(elem.indexOf(":") > -1){
          const  colonIndex = elem.indexOf(":")
          // colonIndex = colonIndex + 1
          newWord = newWord.slice(colonIndex + 1)
        }
        return newWord.trim()
       })


       const resultObj =[]
       for(let i = 0; i < selectQuestionAmount ; i++){
        const obj ={question:questionArr[i],answer:answerArr[i]}
        resultObj.push(obj)

       }
        console.log(resultObj)
      });

    // navigate("../T4ConfirmationCreatedTest");
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
