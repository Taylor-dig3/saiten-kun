import React from "react";
import { useNavigate } from "react-router-dom";
import { login, testQuestion, testResult } from "../../shareComponents/atom";
import { useRecoilValue, useRecoilState } from "recoil";
import axios from "axios";

export default function S1Menu() {
  const loginInfo = useRecoilValue(login);
  const testId = 1;
  const [testQuestionInfo, setTestQuestionInfo] = useRecoilState(testQuestion);

  const navigate = useNavigate();
  const s2Test = () => {
    axios
      .get("/questionMock", {
        params: { userId: loginInfo.userId },
      })
      .then((res) => {
        console.log("S1pe-zi");
        console.log(res.data);
        setTestQuestionInfo(res.data);
        navigate("../S2Test");
      });
  };
  const s3ResultListDisplay = () => navigate("../S3ResultList");
  const l1LoginDisplay = () => navigate("/");

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
