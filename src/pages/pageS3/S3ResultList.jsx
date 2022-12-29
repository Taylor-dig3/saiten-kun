import React from "react";
import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

import { getAllTests } from "../../helperFunctions/useFrontFuncs";
import { login, testResult, testResultList } from "../../shareComponents/atom";
import { useRecoilValue, useRecoilState } from "recoil";
import axios from "axios";

const subjects = ["国語", "算数", "理科", "社会"];
export default function S3ResultList() {
  const navigate = useNavigate();

  //test_idとstudent_idをインポートしてくる
  const [currentSelectedTestId, setCurrentSelectedTestID] = useState();
  const loginInfo = useRecoilValue(login);
  const testResultInfo = useRecoilValue(testResultList);
  const [resultInfo, setResultInfo] = useRecoilState(testResult);
  console.log(testResultInfo);

  const s4TestCheckDisplay = () => {
    axios
      .get("/answer", {
        params: { user_id: loginInfo.userId, test_id: currentSelectedTestId },
      })
      .then((res) => {
        console.log(res.data);
        setResultInfo(res.data);
        navigate("../S4TestCheck");
      });
  };

  const s1MenuDisplay = () => {
    navigate("../S1Menu");
  };
  // const [listsTable, setListsTable] = useState();

  useEffect(() => {
    console.log(testResultInfo);
    console.log(testResultInfo.data);
  }, [testResultInfo]);

  let listsTable = testResultInfo.map((elem, index) => (
    <tr key={index}>
      <td>
        <input
          type="radio"
          name="testListsRadio"
          id={`testListsRadio${index}`}
          value={elem.test_id}
          onChange={(e) => {
            console.log(e.target.value);
            setCurrentSelectedTestID(e.target.value);
          }}
        />
      </td>
      <td>
        <label htmlFor={`testListsRadio${index}`}>{elem.title}</label>
      </td>
      <td>
        <label htmlFor={`testListsRadio${index}`}>{elem.grade}</label>
      </td>
      <td>
        <label htmlFor={`testListsRadio${index}`}>{elem.subject}</label>
      </td>
      <td>
        <label htmlFor={`testListsRadio${index}`}>{elem.question_number}</label>
      </td>
      {/* <td>
        <label htmlFor={`testListsRadio${index}`}>{elem["made_date"]}</label>
      </td> */}
      <td>
        <label htmlFor={`testListsRadio${index}`}>
          {elem.run_date === null
            ? "-"
            : new Date(elem.run_date).toLocaleDateString()}
        </label>
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
                {/* <th>作成日</th> */}
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
