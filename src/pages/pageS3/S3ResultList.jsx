import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import { login, studentTestList, studentSelectedTestInfo } from "../../shareComponents/atom";
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
import { values } from "lodash";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function CollapsibleTable() {
  const loginInfo = useRecoilValue(login);
  const [selectTestInfo, setSelectTestInfo] = useRecoilState(studentSelectedTestInfo);
  const testList = useRecoilValue(studentTestList);
  const [isSnackbar, setIsSnackbar] = useState(false)
  console.log(testList);
  const navigate = useNavigate();

  const s4ResultCheckDisplay = () => {
    console.log(selectTestInfo)
    if (selectTestInfo.test_id !== "") {
      navigate("../S4TestCheck");
    } else {
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

  // let score = [];
  const [score, setScore] = useState([])
  useEffect(() => {
    const getScore = testList.map(row => {
      return axios
        .get("/answer", {
          params: {
            user_id: loginInfo.userId,
            test_id: row.test_id,
          },
        })
        .then((res) => {
          const questionCount = res.data.data.length;
          const correctCount = res.data.data.filter((elem) => elem.result).length;
          return Math.round((correctCount / questionCount) * 1000) / 10;
        });
    })
    Promise.all(getScore).then(values => {
      console.log(values);
      // score = values;
      setScore(values);
    })
  }, [])

  return (
    <>
      <div className="user-info">
        {loginInfo.name}
      </div>
      <div className="S3_container">
        <h1 className="S3-title">テスト一覧</h1>
        <div className="S3_button_container">
          <button
            onClick={s1MenuDisplay}
            className="S3-button"
            id="S3-back-button"
          >
            戻る
          </button>
          <button onClick={s4ResultCheckDisplay} className="S3-button" id="S3-result-check-button" >テスト結果確認</button>
        </div>
        {testList ?
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
                    <TableCell align="center">点数</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {testList.map((row, index) => (
                    <CreateTableRow key={row.test_id} row={row} setSelectedTestInfo={setSelectTestInfo} score={score[index]} />
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
    </>
  );
}
