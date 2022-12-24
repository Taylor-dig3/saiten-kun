import React from 'react'
import { useNavigate } from "react-router-dom";

export default function T3TestCreate() {
  const navigate = useNavigate()

  const t4ConfirmationCreatedTestDisplay = ()=>{navigate("../T4ConfirmationCreatedTest")}
  const t1MenuDisplay = ()=>{navigate("../T1Menu")}

  return (
    <>
    <div>先生テスト作成画面</div>
    <button onClick={t4ConfirmationCreatedTestDisplay}>作成</button>
    <button onClick={t1MenuDisplay}>戻る</button>
    </>
  )
}
