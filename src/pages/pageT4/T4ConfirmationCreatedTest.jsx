import React from 'react'
import { useNavigate } from "react-router-dom";


export default function T4ConfirmationCreatedTest() {
  const navigate = useNavigate()

  const t3TestCreateDisplay = ()=>{navigate("../T3TestCreate")}
  const t1MenuDisplay = ()=>{navigate("../T1Menu")}

  return (
    <>
    <div>先生作成テスト確認画面</div>
    <button onClick={t3TestCreateDisplay}>戻る</button>
    <button onClick={t1MenuDisplay}>登録</button>
    </>
  )
}
