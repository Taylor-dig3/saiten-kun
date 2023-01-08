import React from "react";
import { useNavigate } from "react-router-dom";
import {
  login,
  testQuestion,
  testResult,
  studentTestList,
} from "../../shareComponents/atom";
import { useRecoilValue, useRecoilState } from "recoil";
import axios from "axios";
import LogoutButton from "../../shareComponents/LogoutButton";
export default function S1Menu() {
  const loginInfo = useRecoilValue(login);
  const [testQuestionInfo, setTestQuestionInfo] = useRecoilState(testQuestion);
  const [tesList, setTestList] = useRecoilState(studentTestList);
console.log(testQuestionInfo)
  const navigate = useNavigate();
  const s2Test = () => {
    axios
      .get("/questions", {
        params: { user_id: loginInfo.userId },
      })
      .then((res) => {
        console.log("S1pe-zi");
        console.log(res.data);
        setTestQuestionInfo(res.data);
        navigate("../S2Test");
      });
  };
  
  const s3ResultListDisplay = () => {
    axios
      .get("/tests", {
        params: { user_id: loginInfo.userId },
      })
      .then((res) => {
        console.log("S3pe-zi");
        console.log(res.data);
        if(res.data.length){
          const filterTest = res.data.filter((elem)=>{
           return elem.run_date
          })
          setTestList(filterTest);
        }else{
          setTestList(false)
        }
        navigate("../S3ResultList");
      });
  };


  return (
    <>
      <div>
        <button onClick={s2Test}>テスト開始</button>
        <button onClick={s3ResultListDisplay}>過去のテスト一覧</button>
        <LogoutButton />
      </div>
    </>
  );
}
