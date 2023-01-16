import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { login, selectedTestInfo } from "../../shareComponents/atom";
import { useRecoilValue } from "recoil";
import axios from "axios";
import { Buffer } from "buffer";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Container } from "@mui/material";
import { createDate } from "../../helperFunctions/createDate";

import "./T6ResultCheck.css";

export default function T6ResultCheck() {
  const loginInfo = useRecoilValue(login);
  const selectTestInfo = useRecoilValue(selectedTestInfo);
  const [studentIdList, setStudentIdList] = useState();
  const [filterStudentIdList, setFilterStudentIdList] = useState();
  const [selectGrade, setSelectGrade] = useState("全学年");
  const [selectStudent, setSelectStudent] = useState();
  const [selectStudentNameAndId,setSelectStudentNameAndId] = useState(0)
  const [paper, setPaper] = useState();
  const [tablePaper, setTablePaper] = useState();
  const [score, setScore] = useState();
  const [resultStatus, setResultStatus] = useState();
  const navigate = useNavigate();
  const t5TestListDisplay = () => {
    navigate("../T5TestList");
  };

  const gradeChange = (e) => {
    setSelectGrade(e.target.value);
    console.log(e.target.value);
    console.log(studentIdList);
    const filterArr = studentIdList.filter((elem) => {
      if (e.target.value !== "全学年") {
        console.log(elem.grade_id, e.target.value);
        return elem.grade_id === e.target.value;
      } else {
        return true;
      }
    });
    console.log(filterArr);
    setFilterStudentIdList(filterArr);
  };

  const selectStudentChange = (e) => {
    const valueArr = e.target.value.split("&%", 2);
    const studentInfo = { id: Number(valueArr[0]), name: valueArr[1] };
    setSelectStudent(studentInfo);
    setSelectStudentNameAndId(e.target.value)
    axios
      .get("/answer", {
        params: {
          user_id: studentInfo.id,
          test_id: selectTestInfo.test_id,
        },
      })
      .then((res) => {
        console.log(res.data);
        setPaper(res.data);
      });
  };

  useEffect(() => {
    axios
      .get("/teacher/checkResultStatus", {
        params: {
          test_id: selectTestInfo.test_id,
        },
      })
      .then((res) => {
        console.log(res.data);
        setResultStatus(res.data);
      });

    axios
      .get("/teacher/studentIdList", {
        params: {
          teacher_id: loginInfo.userId,
        },
      })
      .then((res) => {
        console.log(res.data);
        setStudentIdList(res.data);
        setFilterStudentIdList(res.data);
      });
  }, []);

  useEffect(() => {
    if (paper !== false && paper !== undefined) {
      console.log("object");
      console.log(paper);

      const questionCount = paper.data.length;
      const correctCount = paper.data.filter((elem) => elem.result).length;
      console.log((correctCount / questionCount) * 100);
      setScore(Math.round((correctCount / questionCount) * 100));
      const sortData = paper.data.sort((a,b)=>{
       if( a.result_id > b.result_id){
        return 1;
       }else if(a.result_id < b.result_id){
        return -1;
       }else{
        return 0;
       }
      })
      setTablePaper(
        sortData.map((elem, index) => {
          console.log(elem);
          const decodedFile = Buffer.from(
            elem["answer_img"],
            "base64"
          ).toString();
          return (
            <TableRow key={index}>
              <TableCell>{elem["question"]}</TableCell>
              <TableCell>{elem["answer"]}</TableCell>
              <TableCell>
                <img className="T6-answer" src={decodedFile} alt="answer" />
              </TableCell>
              <TableCell>
                {elem["result"] === true ? (
                  <img className="T6marubatsu" src="./img/maru.png" alt="" />
                ) : elem["result"] === false ? (
                  <img className="T6marubatsu" src="./img/batsu.png" alt="" />
                ) : (
                  ""
                )}
              </TableCell>
              <TableCell>
                <button
                  onClick={() => {
                    const flag = elem.result ? false : true;
                    axios
                      .put("/answer", {
                        result_id: elem.result_id,
                      })
                      .then((res) => {
                        console.log(res);
                      });
                    setPaper((prev) => {
                      console.log(prev);
                      prev.data.splice(index, 1, {
                        ...prev.data[index],
                        result: flag,
                      });
                      console.log(prev.data);
                      return { ...paper, data: prev.data };
                    });
                  }}
                >
                  正誤反転
                </button>
              </TableCell>
            </TableRow>
          );
        })
      );
    } else if (paper === false) {
      setScore("");
    }
  }, [paper]);

  const automaticGrading = async () => {
    const loadingContainer = document.querySelector("#T6-loading-container");
    loadingContainer.className = "T6-loading-visible";

    await axios
      .get("/teacher/automaticGrading", {
        params: {
          test_id: selectTestInfo.test_id,
        },
      })
      .then((res) => {
        console.log(res.data);
        console.log("採点が完了しました。");
        setResultStatus(true);
      });
      
    loadingContainer.className = "T6-loading-hidden";
    setSelectStudent();
    setSelectStudentNameAndId(0);
  };

  useEffect(() => {
    if(loginInfo.loginState === "notYetLoggedIn"){
     navigate("../")
    }
     }, []);

  return (
    <div className="T6-container">
      <span className="user-info">{loginInfo.name}</span>
      <h1 className="T6-title">テスト結果確認</h1>
      <div className="T6-button-container">
        <button
          onClick={t5TestListDisplay}
          className="T6-button"
          id="T6-back-button"
        >
          戻る
        </button>
      <div className="T6-automatic-grading-container">
      <div className="T6-grading-text">
        {resultStatus ? "採点済みです" : "※採点未実施です"}
      </div>
        <button
          onClick={automaticGrading}
          className="T6-button"
          id="T6-button-grading"
          >
          自動採点
        </button>
          </div>
        <div className="T6-student-select-container">
          <Select
            className="T6-grade-select"
            value={selectGrade}
            onChange={gradeChange}
          >
            <MenuItem value={"全学年"}>全学年</MenuItem>
            <MenuItem value={1}>1年生</MenuItem>
            <MenuItem value={2}>2年生</MenuItem>
            <MenuItem value={3}>3年生</MenuItem>
            <MenuItem value={4}>4年生</MenuItem>
            <MenuItem value={5}>5年生</MenuItem>
            <MenuItem value={6}>6年生</MenuItem>
          </Select>
          <Select
            className="T6-student-select"
            value={selectStudentNameAndId}
            onChange={selectStudentChange}
          >
            <MenuItem value={0}>生徒を選択してください</MenuItem>
            {filterStudentIdList
              ? filterStudentIdList.map((elem, index) => {
                  return (
                    <MenuItem
                      key={elem.id}
                      value={`${elem.id}&%${elem.name}`}
                    >{`ID:${("0000" + elem.id).slice(-4)}　 ${
                      elem.name
                    }`}</MenuItem>
                  );
                })
              : 1}
          </Select>
        </div>
      </div>
      {selectStudent ? (
        <>
          <div className="T6-test-result-info">
            <div className="T6-user-info">
              <span className="T6StudentsID" value="ID">
                ID : {("0000" + selectStudent.id).slice(-4)}
              </span>
              <span className="T6-student-name">
                {" "}
                名前 : {selectStudent.name}
              </span>
            </div>
            {paper !== false ? (
            <div className="T6-test-info">
              <span>{selectTestInfo.title}</span>
              <span>問題数 : {selectTestInfo.question_count}</span>
              <span>実施日 : {createDate(selectTestInfo.run_date)}</span>
              <span className="T6-test-score">{score}点</span>
            </div>)
            :("")}
          </div>
          {paper !== false ? (
            <Container maxWidth="95%">
              <TableContainer component={Paper} sx={{ maxHeight: "95%" }}>
                <Table stickyHeader aria-label="sticky table">
                  <TableHead>
                    <TableRow>
                      <TableCell style={{ width: "40%" }}>問題</TableCell>
                      <TableCell style={{ width: "25%" }}>正解</TableCell>
                      <TableCell
                        style={{ width: "15%" }}
                        colSpan={2}
                        align="center"
                      >
                        解答{" "}
                      </TableCell>
                      <TableCell style={{ width: "15%" }}>正誤修正</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>{tablePaper}</TableBody>
                </Table>
              </TableContainer>
            </Container>
          ) : (
            <h1 className="T6-not-student">この生徒はテスト未実施です!</h1>
          )}
        </>
      ) : (
        <h1 className="T6-not-student">生徒が選択されていません!</h1>
      )}

      <div className="T6-loading-hidden" id="T6-loading-container">
        <div id="T6-div-loading">
          <div id="T6-loading-background"></div>
          <div id="T6-loading-text">テスト採点中...</div>
        </div>
      </div>
    </div>
  );
}
