// import React from "react";
// // import "../styles/testLists.css";
// // import NewTest from "./NewTest";
// // import DoTest from "./DoTest";
// // import CheckResults from "./CheckResults";
// import { useEffect, useState, useRef } from "react";
// import { useNavigate } from "react-router-dom";
// import { login, testList, testResult } from "../../shareComponents/atom";
// import { useRecoilValue, useRecoilState } from "recoil";
// import axios from "axios";

// import { getAllTests } from "../../helperFunctions/useFrontFuncs";

// const subjects = ["国語", "算数", "理科", "社会"];

// export default function T5TestList({ setDispNo, setCurrentTestID }) {
//   const [allTests, setAllTests] = useState([]);
//   // const [listsTable, setListsTable] = useState();
//   const testInfo = useRecoilValue(testList);
//   const navigate = useNavigate();
//   const [currentSelectedTestId, setCurrentSelectedTestId] = useState();
//   const [resultInfo, setResultInfo] = useRecoilState(testResult);

//   let studentId = 1; //TODO仮おきしているので後でDBから持ってくる

//   const t6ResultCheckDisplay = () => {
//     axios
//       .get("/answer", {
//         params: { user_id: studentId, test_id: currentSelectedTestId },
//       })
//       .then((res) => {
//         console.log(res.data);
//         setResultInfo(res.data);
//         navigate("../T6ResultCheck");
//       });
//   };
//   const t1MenuDisplay = () => {
//     navigate("../T1Menu");
//   };

//   useEffect(() => {
//     console.log(testInfo);
//     console.log(testInfo.data);
//   }, [testInfo]);

//   useEffect(() => {
//     console.log(`ラジオ選択：${currentSelectedTestId}`);
//   }, [currentSelectedTestId]);

//   let listsTable = testInfo.map((elem, index) => (
//     <tr key={index}>
//       <td>
//         <input
//           type="radio"
//           name="testListsRadio"
//           id={`testListsRadio${index}`}
//           value={elem.test_id}
//           onChange={(e) => {
//             console.log(e.target.value);
//             setCurrentSelectedTestId(e.target.value);
//           }}
//         />
//       </td>
//       <td>
//         <label for={`testListsRadio${index}`}>{elem.title}</label>
//       </td>
//       <td>
//         <label for={`testListsRadio${index}`}>{elem.grade}</label>
//       </td>
//       <td>
//         <label for={`testListsRadio${index}`}>{elem.subject}</label>
//       </td>
//       <td>
//         <label for={`testListsRadio${index}`}>{elem.question_count}</label>
//       </td>
//       <td>
//         <label for={`testListsRadio${index}`}>
//           {new Date(elem.make_date).toLocaleDateString()}
//         </label>
//       </td>
//       <td>
//         <label for={`testListsRadio${index}`}>
//           {elem.run_date === null
//             ? "-"
//             : new Date(elem.run_date).toLocaleDateString()}
//         </label>
//       </td>
//     </tr>
//   ));

//   return (
//     <>
//       <button onClick={t6ResultCheckDisplay}>生徒テスト結果確認</button>
//       <button onClick={t1MenuDisplay}>戻る</button>
//       <div className="testLists">
//         {/* <NewTest setDispNo={setDispNo} />
//       <DoTest setDispNo={setDispNo} />
//       <CheckResults setDispNo={setDispNo} /> */}
//         <div>
//           <table className="listTable">
//             <thead>
//               <tr>
//                 <th></th>
//                 <th>タイトル</th>
//                 <th>学年</th>
//                 <th>科目</th>
//                 <th>問題数</th>
//                 <th>作成日</th>
//                 <th>実施日</th>
//               </tr>
//             </thead>
//             <tbody>{listsTable}</tbody>
//           </table>
//         </div>
//       </div>
//     </>
//   );
// }

import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import {
  login,
  testList,
  testResult,
  selectedTestInfo,
} from "../../shareComponents/atom";
import { useRecoilValue, useRecoilState } from "recoil";
import axios from "axios";
import { Radio, RadioGroup, FormControlLabel } from "@mui/material";
import TextField from "@mui/material/TextField";
import { useNavigate } from "react-router-dom";
import StatusMessage from "./components/StatusMessage";
import T5Snackbar from "./components/T5Snackbar";
import CreateTableRow from "./components/CreateTableRow";

import "./T5TestList.css";

export default function CollapsibleTable() {
  const loginInfo = useRecoilValue(login);
  const [selectTestInfo, setSelectTestInfo] = useRecoilState(selectedTestInfo);
  const testInfo = useRecoilValue(testList);
  const [testStatus, setTestStatus] = useState({
    statusWord: "テスト開始",
    style: "inherit",
    testId: "",
  });
  const [isSnackbar, setIsSnackbar] = useState(false);
  const [errorWord, setErrorWord] = useState("");
  const [timeLimit, setTimeLimit] = useState(0);
  console.log(testInfo);
  const navigate = useNavigate();

  const t6ResultCheckDisplay = () => {
    if (selectTestInfo.test_id !== "") {
        navigate("../T6ResultCheck");
    }else{
      setErrorWord("テストを選択してください！");
      setIsSnackbar(true);
    }
    }
  
  const t1MenuDisplay = () => {
    navigate("../T1Menu");
  };

  const changeTestStatus = () => {
    if (selectTestInfo.test_id !== "" || testStatus.statusWord === "テスト開始中" ) {
      if (testStatus.statusWord === "テスト開始") {
        if(timeLimit > 0){

          axios
          .put("/teacher/testStart", {
            teacher_id: loginInfo.userId,
            test_id: selectTestInfo.test_id,
            time_limit:timeLimit,
          })
          .then((res) => {
            console.log(res);
            setTestStatus({
              statusWord: "テスト開始中",
              style: "primary",
              testId: res.data.data.test_id,
            });
          });
        }else{
          setErrorWord("テストの制限時間を正しく入力してください！");
          setIsSnackbar(true);
        }
      } else {
        axios
          .put("/teacher/testEnd", {
            teacher_id: loginInfo.userId,
          })
          .then((res) => {
            console.log(res);
            setTestStatus({
              statusWord: "テスト開始",
              style: "inherit",
              testId: res.data.data.test_id,
            });
          });
      }
    } else  {
      setErrorWord("テストを選択してください！");
      setIsSnackbar(true);
    }
  };

  useEffect(() => {
    setSelectTestInfo({test_id:"",title:"",grade:"",subject:"",make_date:"",question_count:"",run_date:""})
    axios
      .get("/teacher/testStatus", {
        params: {
          teacher_id: loginInfo.userId,
        },
      })
      .then((res) => {
        if (res.data.data.test_id === null) {
          setTestStatus({
            statusWord: "テスト開始",
            style: "inherit",
            testId: "",
          });
        } else {
          setTestStatus({
            statusWord: "テスト開始中",
            style: "primary",
            testId: res.data.data.test_id,
          });
        }
      });
  }, []);

  return (
    <div className="T5_container">
      <h1 className="T5-title">テスト一覧</h1>
        <StatusMessage testStatus={testStatus} />
          <div className="T5_button_container">
            <button
              onClick={t1MenuDisplay}
              className="T5-button"
              id="T5-back-button"
            >
              戻る
            </button>
            <span className="T5-action-button-container">
            <TextField
              label="制限時間(分)"
              type="number"
              InputLabelProps={{
                shrink: true,
              }}
              InputProps={{
                inputProps: { 
                  max: 200, min: 0 
                }
              }}
              variant="filled"
              value={timeLimit}
              className="T5-time-limit"
              onChange={(e) => setTimeLimit(e.target.value)}
              />
            <button
              className="T5-button"
              id={testStatus.statusWord==="テスト開始中" ? "T5-status-button":""}
              onClick={changeTestStatus}
              >
              {testStatus.statusWord}
            </button>
            <button onClick={t6ResultCheckDisplay} className="T5-button" id="T5-result-check-button" >生徒テスト結果確認</button>
              </span>
          </div>
      <TableContainer component={Paper}>
        <RadioGroup row>
          <Table aria-label="collapsible table">
            <TableHead>
              <TableRow>
                <TableCell style={{ width: "3%" }} />
                <TableCell align="center" colSpan={2}>
                  テスト名
                </TableCell>
                <TableCell align="center">学年</TableCell>
                <TableCell align="center">科目</TableCell>
                <TableCell align="center">問題数</TableCell>
                <TableCell align="center">作成日</TableCell>
                <TableCell align="center">実施日</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {testInfo.map((row) => (
                <CreateTableRow
                  key={row.test_id}
                  row={row}
                  setSelectedTestInfo={setSelectTestInfo}
                />
              ))}
            </TableBody>
          </Table>
        </RadioGroup>
      </TableContainer>
      <T5Snackbar
        isSnackbar={isSnackbar}
        setIsSnackbar={setIsSnackbar}
        errorWord={errorWord}
      />
    </div>
  );
}
