import React from "react";
import "../styles/testResult.css";
import CloseTestResult from "./CloseTestResult";
import { useState } from "react";
import maru from "../styles/maru.png";
import batsu from "../styles/batsu.png";
import testImg from "../styles/test.jpg";
import studentName1 from "../styles/test2.png";
import studentName2 from "../styles/test4.png";

// function getTest() {
//   const info = {
//     name: "小テスト１",
//     questions: ["1 + 2 =", "5 + 2 =", "4 + 3 =", "4 + 1 ="],
//   };
//   return info;
// }

// function getTestResult(num) {
//   const info = [
//     {
//       name: studentName1,
//       total: 75,
//       questions: ["1 + 2 =", "5 + 2 =", "4 + 3 =", "4 + 1 ="],
//       answers: [testImg, testImg, testImg, testImg],
//       results: [true, false, true, true],
//     },
//     {
//       name: studentName2,
//       total: 50,
//       questions: ["1 + 2 =", "5 + 2 =", "4 + 3 =", "4 + 1 ="],
//       answers: [testImg, testImg, testImg, testImg],
//       results: [true, false, false, true],
//     },
//   ];
//   return info[num];
// }

export default function TestResult({
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
          {/* <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
          <option value="7">7</option>
          <option value="8">8</option>
          <option value="9">9</option>
          <option value="10">10</option>
          <option value="11">11</option>
          <option value="12">12</option>
          <option value="13">13</option>
          <option value="14">14</option>
          <option value="15">15</option>
          <option value="16">16</option>
          <option value="17">17</option>
          <option value="18">18</option>
          <option value="19">19</option>
          <option value="20">20</option>
          <option value="21">21</option>
          <option value="22">22</option>
          <option value="23">23</option>
          <option value="24">24</option>
          <option value="25">25</option>
          <option value="26">26</option>
          <option value="27">27</option>
          <option value="28">28</option>
          <option value="29">29</option>
          <option value="30">30</option>
          <option value="31">31</option>
          <option value="32">32</option>
          <option value="33">33</option>
          <option value="34">34</option>
          <option value="35">35</option>
          <option value="36">36</option>
          <option value="37">37</option>
          <option value="38">38</option>
          <option value="39">39</option>
          <option value="40">40</option>
          <option value="41">41</option>
          <option value="42">42</option>
          <option value="43">43</option>
          <option value="44">44</option>
          <option value="45">45</option>
          <option value="46">46</option>
          <option value="47">47</option>
          <option value="48">48</option>
          <option value="49">49</option>
          <option value="50">50</option> */}
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
