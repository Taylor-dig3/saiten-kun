import React,{useEffect} from "react";
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
import "./S1Menu.css"
export default function S1Menu() {
  const loginInfo = useRecoilValue(login);
  const [testQuestionInfo, setTestQuestionInfo] = useRecoilState(testQuestion);
  const [tesList, setTestList] = useRecoilState(studentTestList);
  const navigate = useNavigate();
  const s2Test = () => {
    axios
      .get("/testsStudent", {
        params: { user_id: loginInfo.userId },
      })
      .then((res) => {
        if (res.data.length) {
          console.log(res.data)
          const filterTest = res.data.filter((elem) => {
            
            return elem.run_date
          })
          console.log(filterTest)
          setTestList(filterTest);
        } else {
          setTestList(false)
        }
        axios
          .get("/questions", {
            params: { user_id: loginInfo.userId },
          })
          .then((res) => {
            console.log("S1pe-zi");
            console.log(res.data);
            setTestQuestionInfo(res.data);
            if (res.data.test_id) {
              navigate("../S2Test");
            }
          });
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
    </>
  );
}
