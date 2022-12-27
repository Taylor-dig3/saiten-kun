import React, { useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import { acquiredQuestion } from '../../shareComponents/atom';
import { useRecoilState } from "recoil";

export default function T4ConfirmationCreatedTest() {
  const [chatGptQuestion,setChatGptQuestion] = useRecoilState(acquiredQuestion);
  const navigate = useNavigate()

  const t3TestCreateDisplay = ()=>{navigate("../T3TestCreate")}
  const t1MenuDisplay = ()=>{navigate("../T1Menu")}

  useEffect(()=>{
    console.log(chatGptQuestion)
  },[chatGptQuestion])
  return (
    <>
    <div>先生作成テスト確認画面</div>
    <button onClick={t3TestCreateDisplay}>戻る</button>
    <button onClick={t1MenuDisplay}>登録</button>
    <div>
    <input type="text"  placeholder='問題の説明を入力してください'/>
    </div>
    {chatGptQuestion.map((elem,index)=>{
      return(
        <div key={index}>
        <input type="text"  value = {elem.question}/>
        <input type="text"  value = {elem.answer}/>
        </div>
      )
    })}
    </>
  )
}
