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
import "./S1Menu.css"
export default function S1Menu() {
  const loginInfo = useRecoilValue(login);
  const [testQuestionInfo, setTestQuestionInfo] = useRecoilState(testQuestion);
  const [tesList, setTestList] = useRecoilState(studentTestList);
  const navigate = useNavigate();
  const s2Test = () => {
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

  console.log(loginInfo);
  return (
    <>
      <div className="S1-container">
        <span className="user-info">{loginInfo.name}</span>
        <span className="S1-title">どれにする？</span>
        <button onClick={s2Test} className={"S1-button"}>テストをはじめる</button>
        <button onClick={s3ResultListDisplay} className={"S1-button"}>いままでのテスト</button>
        <LogoutButton />
      </div>
    </>
  );
}
