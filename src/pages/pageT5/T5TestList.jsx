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

import { login, testList, testResult,selectedTestId } from "../../shareComponents/atom";
import { useRecoilValue, useRecoilState } from "recoil";
import axios from "axios";
import { Radio, RadioGroup, FormControlLabel } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import StatusMessage from "./components/StatusMessage"
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import CreateTableRow from "./components/CreateTableRow"

import "./T5TestList.css"

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

export default function CollapsibleTable() {
  const loginInfo = useRecoilValue(login);
  const [selectTestId,setSelectTestId] = useRecoilState(selectedTestId);
  const testInfo = useRecoilValue(testList);
  const  [selectedTestInfo,setSelectedTestInfo] = useState({test_id:"",title:"",grade:"",subject:"",make_date:"",question_count:"",run_date:""})
  const [testStatus,setTestStatus] = useState({statusWord:"テスト開始",style:"inherit",testId:""})
  const [isSnackbar,setIsSnackbar] = useState(false)
  console.log(testInfo);
  const navigate = useNavigate();
  
  const t6ResultCheckDisplay = () => {
    if(selectedTestInfo.test_id !== ""){

      setSelectTestId(selectedTestInfo.test_id) 
      navigate("../T6ResultCheck");
    }else{
      setIsSnackbar(true)
    }
  };
  const t1MenuDisplay = () => {
    navigate("../T1Menu");
  };

  const closeSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setIsSnackbar(false);
  };

  const changeTestStatus = ()=>{
    if(selectedTestInfo.test_id !== ""){
      if(testStatus.statusWord === "テスト開始"){
        axios.put("/teacher/testStart",{
          teacher_id:loginInfo.userId,
          test_id:selectedTestInfo.test_id
      }).then(res=>{
        console.log(res);
        setTestStatus({statusWord:"テスト開始中",style:"primary",testId:res.data.data.test_id})
      })
    }else{
      axios.put("/teacher/testEnd",{
        teacher_id:loginInfo.userId
      }).then(res=>{
        console.log(res);
        setTestStatus({statusWord:"テスト開始",style:"inherit",testId:res.data.data.test_id})
      })
    }
  }else{
    setIsSnackbar(true)
  }
  }


  useEffect(()=>{
    axios.get("/teacher/testStatus",{
      params:{
        teacher_id:loginInfo.userId
      }
    }).then(res=>{
      if(res.data.data.test_id === null){
        setTestStatus({statusWord:"テスト開始",style:"inherit",testId:""})
      } else {
        setTestStatus({statusWord:"テスト開始中",style:"primary",testId:res.data.data.test_id})
      }
    })
  },[])

  
  return (
    <div className="T5_container">
     <div className="T5_button_container">
      <ArrowCircleLeftIcon onClick={t1MenuDisplay} fontSize="large" color='primary'></ArrowCircleLeftIcon>
      <Button variant="contained" onClick={changeTestStatus} color={testStatus.style}>{testStatus.statusWord}</Button>
      <StatusMessage testStatus={testStatus} />
      <button onClick={t6ResultCheckDisplay}>生徒テスト結果確認</button>
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
                <CreateTableRow key={row.test_id} row={row} setSelectedTestInfo={setSelectedTestInfo} />
              ))}
            </TableBody>
          </Table>
        </RadioGroup>
      </TableContainer>
      <Snackbar
        open={isSnackbar}
        autoHideDuration={6000}
        onClose={closeSnackbar}
      >
       
          <Alert
            onClose={closeSnackbar}
            severity="error"
            sx={{ width: "100%" }}
          >
            テストを選択してください！
          </Alert>
       
      </Snackbar>

    </div>
  );
}
