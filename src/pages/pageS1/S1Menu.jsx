import React,{useEffect,useState} from "react";
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
import S1Snackbar from "./components/S1Snackbar";

import "./S1Menu.css"
export default function S1Menu() {
  const loginInfo = useRecoilValue(login);
  const [testQuestionInfo, setTestQuestionInfo] = useRecoilState(testQuestion);
  const [tesList, setTestList] = useRecoilState(studentTestList);
  const [isSnackbar, setIsSnackbar] = useState(false);
  const [errorWord, setErrorWord] = useState("");
  const navigate = useNavigate();
  const s2Test = () => {
        axios
          .get("/questions", {
            params: { user_id: loginInfo.userId },
          })
          .then((res) => {
            setTestQuestionInfo(res.data);
            if (res.data.test_id) {
              navigate("../S2Test");
            }else{
              setIsSnackbar(true);
            }
          });
  };

  const s3ResultListDisplay = () => {
    axios
      .get("/tests", {
        params: { user_id: loginInfo.userId },
      })
      .then((res) => {
        if (res.data.length) {
          const filterTest = res.data.filter((elem) => {
            return elem.run_date
          })
          setTestList(filterTest);
        } else {
          setTestList(false)
        }
        navigate("../S3ResultList");
      });
  };

  let S1Title = "";
  let S1Start = "";
  let S1Past = "";
  switch (loginInfo.grade) {
    case 1:
      S1Title = "どれにする？";
      S1Start = "テストをはじめる";
      S1Past = "いままでのテスト";
      break;
    case 2:
      S1Title = "どれにする？";
      S1Start = "テストをはじめる";
      S1Past = "今までのテスト";
      break;
    case 3:
      S1Title = "どれにする？";
      S1Start = "テスト開始";
      S1Past = "今までのテスト";
      break;
    case 4:
      S1Title = "メニュー";
      S1Start = "テスト開始";
      S1Past = "今までのテスト";
      break;
    case 5:
      S1Title = "メニュー";
      S1Start = "テスト開始";
      S1Past = "過去のテスト";
      break;
    case 6:
      S1Title = "メニュー";
      S1Start = "テスト開始";
      S1Past = "過去のテスト";
      break;
  }


  useEffect(() => {
    if(loginInfo.loginState === "notYetLoggedIn"){
     navigate("../")
    }
     }, []);

  return (
    <>
      <div className="S1-container">
        <span className="user-info">{loginInfo.name}</span>
        <span className="S1-title">{S1Title}</span>
        <button onClick={s2Test} className={"S1-button"}>{S1Start}</button>
        <button onClick={s3ResultListDisplay} className={"S1-button"}>{S1Past}</button>
        <LogoutButton />
      </div>
      <S1Snackbar
        isSnackbar={isSnackbar}
        setIsSnackbar={setIsSnackbar}
        errorWord={"現在テストは開始されていません！"}
      />
    </>
  );
}
