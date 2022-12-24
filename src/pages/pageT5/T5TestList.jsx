import React from "react";
// import "../styles/testLists.css";
// import NewTest from "./NewTest";
// import DoTest from "./DoTest";
// import CheckResults from "./CheckResults";
import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

import { getAllTests } from "../../helperFunctions/useFrontFuncs";

const subjects = ["国語", "算数", "理科", "社会"];

// function getAllTests() {
//   const listArrayOfObj = [
//     {
//       test_id: 1,
//       made_date: 20221214,
//       grade: 4,
//       subject: 0,
//       question_number: 10,
//       comment: "小テスト１",
//       testdate: 20221215,
//     },
//     {
//       test_id: 2,
//       made_date: 20221215,
//       grade: 3,
//       subject: 1,
//       question_number: 10,
//       comment: "小テスト２",
//       testdate: "",
//     },
//   ];
//   return listArrayOfObj;
// }

export default function T5TestList({ setDispNo, setCurrentTestID }) {
  const [allTests, setAllTests] = useState([]);
  // const [listsTable, setListsTable] = useState();
  const navigate = useNavigate()
  const t6ResultCheckDisplay = () =>{navigate("../T6ResultCheck")}
  const t1MenuDisplay = ()=>{navigate("../T1Menu")}

  useEffect(() => {
    getAllTests().then((res) => {
      setAllTests(res);
    });
  }, []);
  let listsTable = allTests.map((elem, index) => (
    <tr key={index}>
      <td>
        <input
          type="radio"
          name="testListsRadio"
          id={`testListsRadio${index}`}
          value={elem["test_id"]}
          onChange={(e) => {
            setCurrentTestID(e.target.value);
          }}
        />
      </td>
      <td>
        <label for={`testListsRadio${index}`}>{elem["comment"]}</label>
      </td>
      <td>
        <label for={`testListsRadio${index}`}>{elem["grade"]}</label>
      </td>
      <td>
        <label for={`testListsRadio${index}`}>
          {subjects[Number(elem["subject"])]}
        </label>
      </td>
      <td>
        <label for={`testListsRadio${index}`}>{elem["question_number"]}</label>
      </td>
      <td>
        <label for={`testListsRadio${index}`}>{elem["made_date"]}</label>
      </td>
      <td>
        <label for={`testListsRadio${index}`}>{elem["testdate"]}</label>
      </td>
    </tr>
  ));

  return (
    <>
    <button onClick={t6ResultCheckDisplay}>生徒テスト結果確認</button>
    <button onClick={t1MenuDisplay}>戻る</button>
    <div className="testLists">
      {/* <NewTest setDispNo={setDispNo} />
      <DoTest setDispNo={setDispNo} />
      <CheckResults setDispNo={setDispNo} /> */}
      <div>
        <table className="listTable">
          <thead>
            <tr>
              <th></th>
              <th>タイトル</th>
              <th>学年</th>
              <th>科目</th>
              <th>問題数</th>
              <th>作成日</th>
              <th>実施日</th>
            </tr>
          </thead>
          <tbody>{listsTable}</tbody>
        </table>
      </div>
    </div>
      </>
  );
}
