import React from "react";
// import "../styles/testLists.css";
// import NewTest from "./NewTest";
// import DoTest from "./DoTest";
// import CheckResults from "./CheckResults";
import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { login, testList, testResult } from "../../shareComponents/atom";
import { useRecoilValue, useRecoilState } from "recoil";
import axios from "axios";

import { getAllTests } from "../../helperFunctions/useFrontFuncs";

const subjects = ["国語", "算数", "理科", "社会"];

export default function T5TestList({ setDispNo, setCurrentTestID }) {
  const [allTests, setAllTests] = useState([]);
  // const [listsTable, setListsTable] = useState();
  const testInfo = useRecoilValue(testList);
  const navigate = useNavigate();
  const [currentSelectedTestId, setCurrentSelectedTestId] = useState();
  const [resultInfo, setResultInfo] = useRecoilState(testResult);

  let studentId = 1; //TODO仮おきしているので後でDBから持ってくる

  const t6ResultCheckDisplay = () => {
    axios
      .get("/answer", {
        params: { user_id: studentId, test_id: currentSelectedTestId },
      })
      .then((res) => {
        console.log(res.data);
        setResultInfo(res.data);
        navigate("../T6ResultCheck");
      });
  };
  const t1MenuDisplay = () => {
    navigate("../T1Menu");
  };

  useEffect(() => {
    console.log(testInfo);
    console.log(testInfo.data);
  }, [testInfo]);

  useEffect(() => {
    console.log(`ラジオ選択：${currentSelectedTestId}`);
  }, [currentSelectedTestId]);

  let listsTable = testInfo.map((elem, index) => (
    <tr key={index}>
      <td>
        <input
          type="radio"
          name="testListsRadio"
          id={`testListsRadio${index}`}
          value={elem.test_id}
          onChange={(e) => {
            console.log(e.target.value);
            setCurrentSelectedTestId(e.target.value);
          }}
        />
      </td>
      <td>
        <label for={`testListsRadio${index}`}>{elem.title}</label>
      </td>
      <td>
        <label for={`testListsRadio${index}`}>{elem.grade}</label>
      </td>
      <td>
        <label for={`testListsRadio${index}`}>{elem.subject}</label>
      </td>
      <td>
        <label for={`testListsRadio${index}`}>{elem.question_count}</label>
      </td>
      <td>
        <label for={`testListsRadio${index}`}>
          {new Date(elem.make_date).toLocaleDateString()}
        </label>
      </td>
      <td>
        <label for={`testListsRadio${index}`}>
          {elem.run_date === null
            ? "-"
            : new Date(elem.run_date).toLocaleDateString()}
        </label>
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
