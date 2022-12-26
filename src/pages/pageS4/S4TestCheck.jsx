import React from "react";
import "../styles/testResult.css";
import CloseTestResult from "./CloseTestResult";
import { useState } from "react";
import maru from "../styles/maru.png";
import batsu from "../styles/batsu.png";
import testImg from "../styles/test.jpg";
import studentName1 from "../styles/test2.png";
import studentName2 from "../styles/test4.png";

export default function S4TestCheck({
  setDispNo,
  currentAnswer,
  currentTestID,
  paper,
  studentID,
}) {
  // const [studentID, setStudentID] = useState(-1);

  // if (currentAnswer["student_id"] !== undefined) {
  //   if (studentID !== currentAnswer["student_id"]) {
  //     setStudentID(Number(currentAnswer["student_id"]));
  //   }
  // }

  let questions = [];
  // if (studentID > 0) {
  questions = paper.map((elem, index) => (
    <tr key={index}>
      <td>{elem["question"]}</td>
      <td>
        <img
          className="answer"
          src={currentAnswer.answer[index]}
          alt="answer"
        />
        {elem["result"] ? (
          <img className="marubatsu" src={maru} alt="maru" />
        ) : (
          <img className="marubatsu" src={batsu} alt="batsu" />
        )}
      </td>
    </tr>
  ));
  // }

  return (
    <div>
      <span className="studentsSelect">
        <select
          className="studentsSelect"
          name="maxStudent"
          onChange={(e) => {
            // setStudentID(e.target.value);
          }}
        >
          <option value="">{studentID}</option>
          {}
        </select>
      </span>
      {/* {studentID > 0 ? (
        <> */}
      <span className="studentName">
        <img src={currentAnswer["student_name"]} alt="student name" />
      </span>
      <span className="score">{paper[0]["total"]}</span>
      {/* </>
      ) : (
        <>
          <span className="studentName"></span>
          <span className="score"></span>
        </>
      )} */}
      <span className="scoreUnit">点</span>
      <CloseTestResult setDispNo={setDispNo} />
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
