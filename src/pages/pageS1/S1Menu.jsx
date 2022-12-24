import React from "react";
import { useNavigate } from "react-router-dom";

export default function S1Menu() {
  const navigate = useNavigate()
  const s2Test = ()=> navigate("../S2Test")
  const s3ResultListDisplay = ()=> navigate("../S3ResultList")
  const l1LoginDisplay = ()=> navigate("/")
  
  return (
    <>
      <div>
        <button onClick={s2Test}>テスト開始</button>
        <button onClick={s3ResultListDisplay}>過去のテスト一覧</button>
        <button onClick={l1LoginDisplay}>ログアウト</button>
      </div>
    </>
  );
}
