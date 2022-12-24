import React from 'react'
import { useNavigate } from "react-router-dom";

export default function T2StudentRegistration() {
  const navigate = useNavigate()
  const t1MenuDisplay = ()=>{navigate("../T1Menu")}
  return (
    <>
    <div>新規生徒登録画面</div>
    <button>登録</button>
    <button onClick={t1MenuDisplay}>戻る</button>

    </>
  )
}
