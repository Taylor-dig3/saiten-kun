import React, { useEffect, useState } from "react";
import "./S4TestCheck.css";
import CloseTestResult from "./components/CloseTestResult";
// import maru from "../../public/img/maru.png";
// import batsu from "../../public/img/batsu.png";
// import testImg from "../../public/img/test.jpg";
// import studentName1 from "../styles/test2.png";
// import studentName2 from "../styles/test4.png";
import { login, testResult } from "../../shareComponents/atom";
import { useRecoilValue } from "recoil";
import { useNavigate } from "react-router-dom";
import { result } from "lodash";

export default function S4TestCheck({
  setDispNo,
  currentAnswer,
  currentTestID,
}) {
  // const [studentID, setStudentID] = useState(-1);
  const loginInfo = useRecoilValue(login);
  const resultInfo = useRecoilValue(testResult);
  const navigate = useNavigate();
  const s3ResultListDisplay = () => navigate("../S3ResultList");
  // if (currentAnswer["student_id"] !== undefined) {
  //   if (studentID !== currentAnswer["student_id"]) {
  //     setStudentID(Number(currentAnswer["student_id"]));
  //   }
  // }
  let paper = [
    { question: "50音を答えろ", answer_img: "BASE-64", result: true },
    { question: "50音を答えろ", answer: "あいうえお", result: true },
    { question: "50音を答えろ", answer: "あいうえお", result: false },
    { question: "50音を答えろ", answer: "あいうえお", result: true },
    { question: "50音を答えろ", answer: "あいうえお", result: false },
    { question: "50音を答えろ", answer: "あいうえお", result: true },
    { question: "50音を答えろ", answer: "あいうえお", result: true },
  ];
  let title = "小テスト";
  let questions = [];

  useEffect(() => {
    console.log(resultInfo);
    console.log(resultInfo.data);
  }, [resultInfo]);

  questions = resultInfo.data.map((elem, index) => (
    <tr key={index}>
      <td>{elem["question"]}</td>
      <td>
        <img
          className="answer"
          src={"data:image/png;base64," + elem.answer_img}
          alt="answer"
        />
        {elem["result"] ? (
          <img className="marubatsu" src="./img/maru.png" alt="" />
        ) : (
          <img className="marubatsu" src="./img/batsu.png" alt="" />
        )}
      </td>
    </tr>
  ));

  return (
    <div>
      <h2 className="title">{title}</h2>

      <>
        <span className="studentsSelect">
          <div className="studentsID" value="ID">
            ID:{loginInfo.userId}
          </div>
        </span>
        <span className="studentName">
          <img
            className="studentName img"
            src="./img/test4.png"
            alt="student name"
          />
        </span>
        <span className="score">{paper[0]["total"]}</span>
        <span className="scoreUnit">点</span>
      </>
      <button onClick={s3ResultListDisplay}>閉じる</button>
      <div>
        <table className="questionTable">
          <thead>
            <tr>
              <th>問題</th>
              <th>回答</th>
            </tr>
          </thead>
          <tbody>{questions}</tbody>
        </table>
      </div>
    </div>
  );
}
