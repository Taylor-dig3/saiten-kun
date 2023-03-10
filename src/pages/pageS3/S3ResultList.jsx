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
  const navigate = useNavigate();

  const s4ResultCheckDisplay = () => {
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
    if(testList!==false){

      const getScore = testList.map(row => {
        return axios
        .get("/answer", {
          params: {
            user_id: loginInfo.userId,
            test_id: row.test_id,
          },
        })
        .then((res) => {
          if (res.data.data[0].result === null) {
            return "???????????????";
          } else {
            const questionCount = res.data.data.length;
            const correctCount = res.data.data.filter((elem) => elem.result).length;
            return Math.round((correctCount / questionCount) * 100);
          }
        });
      })
      Promise.all(getScore).then(values => {
        // score = values;
        setScore(values);
      })
    }
  }, [])

  let S3Title = "";
  let S3Back = "";
  let S3Result = "";
  let S3Sub = "";
  let S3Problem = "";
  let S3Score = "";
  switch (loginInfo.grade) {
    case 1:
      S3Title = "??????????????????????????????";
      S3Back = "?????????";
      S3Result = "??????????????????????????????";
      S3Sub = "????????????";
      S3Problem = "??????????????????";
      S3Score = "????????????";
      break;
    case 2:
      S3Title = "???????????????????????????";
      S3Back = "?????????";
      S3Result = "??????????????????????????????";
      S3Sub = "??????";
      S3Problem = "???????????????";
      S3Score = "??????";
      break;
    case 3:
      S3Title = "???????????????????????????";
      S3Back = "?????????";
      S3Result = "??????????????????????????????";
      S3Sub = "??????";
      S3Problem = "?????????";
      S3Score = "??????";
      break;
    case 4:
      S3Title = "???????????????????????????";
      S3Back = "?????????";
      S3Result = "???????????????????????????";
      S3Sub = "??????";
      S3Problem = "?????????";
      S3Score = "??????";
      break;
    case 5:
      S3Title = "??????????????????";
      S3Back = "?????????";
      S3Result = "????????????????????????";
      S3Sub = "??????";
      S3Problem = "?????????";
      S3Score = "??????";
      break;
    case 6:
      S3Title = "?????????????????????";
      S3Back = "?????????";
      S3Result = "?????????????????????";
      S3Sub = "??????";
      S3Problem = "?????????";
      S3Score = "??????";
      break;
  }

  useEffect(() => {
    if(loginInfo.loginState === "notYetLoggedIn"){
     navigate("../")
    }
     }, []);

  return (
    <>
      <div className="user-info">
        {loginInfo.name}
      </div>
      <div className="S3_container">
        <h1 className="S3-title">{S3Title}</h1>
        <div className="S3_button_container">
          <button
            onClick={s1MenuDisplay}
            className="S3-button"
            id="S3-back-button"
          >
            {S3Back}
          </button>
          <button onClick={s4ResultCheckDisplay} className="S3-button" id="S3-result-check-button" >{S3Result}</button>
        </div>
        {testList ?
          <TableContainer component={Paper}>
            <RadioGroup row>
              <Table aria-label="collapsible table">
                <TableHead>
                  <TableRow>
                    <TableCell style={{ width: "3%" }} />
                    <TableCell align="center" >
                      ????????????
                    </TableCell>
                    <TableCell align="center">??????</TableCell>
                    <TableCell align="center">{S3Sub}</TableCell>
                    <TableCell align="center">{S3Problem}</TableCell>
                    <TableCell align="center">???????????????</TableCell>
                    <TableCell align="center">{S3Score}</TableCell>
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
         <h1 className="S3-not-test-message">??????????????????????????? </h1> }
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
            ???????????????????????????????????????
          </Alert>

        </Snackbar>

      </div>
    </>
  );
}
