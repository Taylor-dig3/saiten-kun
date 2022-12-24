import React from 'react'
import { useNavigate } from "react-router-dom";


export default function T6ResultCheck() {
  const navigate = useNavigate()
  
  const t5TestListDisplay = ()=>{navigate("../T5TestList")}
  return (
  <>
    <button onClick={t5TestListDisplay}>戻る</button>
    <div>生徒の個別結果確認画面</div>
  </>
  )
}
