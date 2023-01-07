// import React from "react";
// import { useEffect, useState, useRef } from "react";
// import { useNavigate } from "react-router-dom";

// import { getAllTests } from "../../helperFunctions/useFrontFuncs";
// import { login, testResult, testResultList } from "../../shareComponents/atom";
// import { useRecoilValue, useRecoilState } from "recoil";
// import axios from "axios";

// const subjects = ["国語", "算数", "理科", "社会"];
// export default function S3ResultList() {
//   const navigate = useNavigate();

//   //test_idとstudent_idをインポートしてくる
//   const [currentSelectedTestId, setCurrentSelectedTestID] = useState();
//   const loginInfo = useRecoilValue(login);
//   const testResultInfo = useRecoilValue(testResultList);
//   const [resultInfo, setResultInfo] = useRecoilState(testResult);
//   console.log(testResultInfo);

//   const s4TestCheckDisplay = () => {
//     axios
//       .get("/answer", {
//         params: { user_id: loginInfo.userId, test_id: currentSelectedTestId },
//       })
//       .then((res) => {
//         console.log(res.data);
//         setResultInfo(res.data);
//         navigate("../S4TestCheck");
//       });
//   };

//   const s1MenuDisplay = () => {
//     navigate("../S1Menu");
//   };
//   // const [listsTable, setListsTable] = useState();

//   useEffect(() => {
//     console.log(testResultInfo);
//     console.log(testResultInfo.data);
//   }, [testResultInfo]);

//   let listsTable = testResultInfo.map((elem, index) => (
//     <tr key={index}>
//       <td>
//         <input
//           type="radio"
//           name="testListsRadio"
//           id={`testListsRadio${index}`}
//           value={elem.test_id}
//           onChange={(e) => {
//             console.log(e.target.value);
//             setCurrentSelectedTestID(e.target.value);
//           }}
//         />
//       </td>
//       <td>
//         <label htmlFor={`testListsRadio${index}`}>{elem.title}</label>
//       </td>
//       <td>
//         <label htmlFor={`testListsRadio${index}`}>{elem.grade}</label>
//       </td>
//       <td>
//         <label htmlFor={`testListsRadio${index}`}>{elem.subject}</label>
//       </td>
//       <td>
//         <label htmlFor={`testListsRadio${index}`}>{elem.question_number}</label>
//       </td>
//       {/* <td>
//         <label htmlFor={`testListsRadio${index}`}>{elem["made_date"]}</label>
//       </td> */}
//       <td>
//         <label htmlFor={`testListsRadio${index}`}>
//           {elem.run_date === null
//             ? "-"
//             : new Date(elem.run_date).toLocaleDateString()}
//         </label>
//       </td>
//     </tr>
//   ));

//   return (
//     <>
//       <button onClick={s4TestCheckDisplay}>結果確認</button>
//       <button onClick={s1MenuDisplay}>戻る</button>
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
//                 {/* <th>作成日</th> */}
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

import { login, studentTestList,studentSelectedTestInfo } from "../../shareComponents/atom";
import { useRecoilValue, useRecoilState } from "recoil";
import axios from "axios";
import { Radio, RadioGroup, FormControlLabel } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import CreateTableRow from "./components/CreateTableRow"

import "./S3ResultList.css"

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

export default function CollapsibleTable() {
  const loginInfo = useRecoilValue(login);
  const [selectTestInfo,setSelectTestInfo] = useRecoilState(studentSelectedTestInfo);
  const testList = useRecoilValue(studentTestList);
  const [isSnackbar,setIsSnackbar] = useState(false)
  console.log(testList);
  const navigate = useNavigate();
  
  const t6ResultCheckDisplay = () => {
    console.log(selectTestInfo)
    if(selectTestInfo.test_id !== ""){
      navigate("../S4TestCheck");
    }else{
      setIsSnackbar(true)
    }
  };
  const s1MenuDisplay = () => {
    navigate("../S1Menu");
  };

  const closeSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setIsSnackbar(false);
  };


  useEffect(()=>{
    
  },[])

  
  return (
    <div className="S3_container">
     <div className="S3_button_container">
      <ArrowCircleLeftIcon onClick={s1MenuDisplay} fontSize="large" color='primary'></ArrowCircleLeftIcon>
      {/* <Button variant="contained" onClick={changeTestStatus} color={testStatus.style}>{testStatus.statusWord}</Button> */}
      <button onClick={t6ResultCheckDisplay}>テスト結果確認</button>
     </div>
    { testList ?
      <TableContainer component={Paper}>
        <RadioGroup row>
          <Table aria-label="collapsible table">
            <TableHead>
              <TableRow>
                <TableCell style={{ width: "3%" }} />
                <TableCell align="center" >
                  テスト名
                </TableCell>
                <TableCell align="center">学年</TableCell>
                <TableCell align="center">科目</TableCell>
                <TableCell align="center">問題数</TableCell>
                <TableCell align="center">実施日</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {testList.map((row) => (
                <CreateTableRow key={row.test_id} row={row} setSelectedTestInfo={setSelectTestInfo} />
              ))}
            </TableBody>
          </Table>
        </RadioGroup>
      </TableContainer>
      :
      "テストはありません"}
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
