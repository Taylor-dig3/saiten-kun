import React from 'react'
import { useNavigate } from "react-router-dom";

export default function T1Menu() {
  const navigate = useNavigate()

  const t2StudentRegistrationDisplay = ()=>{navigate("../T2StudentRegistration")}
  const t3TestCreate = ()=>{navigate("../T3TestCreate")}
  const t5TestList = ()=>{navigate("../T5TestList")}
  
  return (
    <>
    <div>先生メニュー画面</div>
    <button onClick={t2StudentRegistrationDisplay}>新規生徒登録</button>
    <button >新規先生登録</button>
    <button onClick={t3TestCreate}>テスト作成</button>
    <button onClick={t5TestList}>テスト一覧</button>
    </>
  )
}
