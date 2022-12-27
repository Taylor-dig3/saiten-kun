import React from "react";
import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

import { getAllTests } from "../../helperFunctions/useFrontFuncs";
import { login, testResult } from "../../shareComponents/atom";
import { useRecoilValue, useRecoilState } from "recoil";
import axios from "axios";

const subjects = ["国語", "算数", "理科", "社会"];
export default function S3ResultList({ setCurrentTestID }) {
  const navigate = useNavigate();

  //test_idとstudent_idをインポートしてくる
  const testId = 1;
  const loginInfo = useRecoilValue(login);
  const [resultInfo, setResultInfo] = useRecoilState(testResult);

  const s4TestCheckDisplay = () => {
    axios
      .get("/answerMock", {
        params: { userId: loginInfo.userId, testId: testId },
      })
      .then((res) => {
        setResultInfo(res.data);
        navigate("../S4TestCheck");
      });
  };

  const s1MenuDisplay = () => {
    navigate("../S1Menu");
  };
  const [allTests, setAllTests] = useState([]);
  // const [listsTable, setListsTable] = useState();

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
      <button onClick={s4TestCheckDisplay}>結果確認</button>
      <button onClick={s1MenuDisplay}>戻る</button>
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
