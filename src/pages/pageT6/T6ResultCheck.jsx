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
import "./T6ResultCheck.css";

export default function T6ResultCheck() {
  const loginInfo = useRecoilValue(login);
  const selectTestInfo = useRecoilValue(selectedTestInfo);
  const [studentIdList, setStudentIdList] = useState();
  const [filterStudentIdList, setFilterStudentIdList] = useState();
  const [selectGrade, setSelectGrade] = useState("全学年");
  const [selectStudent, setSelectStudent] = useState();
  const [paper, setPaper] = useState();
  const [tablePaper, setTablePaper] = useState();
  const [score, setScore] = useState();

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
    if (paper!==false && paper!==undefined) {
      console.log("object");
      console.log(paper);

      const questionCount = paper.data.length;
      const correctCount = paper.data.filter((elem) => elem.result).length;
      console.log((correctCount / questionCount) * 100);
      setScore(Math.round((correctCount / questionCount) * 100));
      setTablePaper(
        paper.data.map((elem, index) => {
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
                <img className="answer" src={decodedFile} alt="answer" />
              </TableCell>
              <TableCell>
                {elem["result"] ? (
                  <img className="T6marubatsu" src="./img/maru.png" alt="" />
                ) : (
                  <img className="T6marubatsu" src="./img/batsu.png" alt="" />
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
    }else if(paper===false){
      setScore("")
    }
  }, [paper]);

  return (
    <div>
      <h1 className="T6title">結果確認</h1>
      <div className="studentsSelect">
        <Select
          labelId="demo-controlled-open-select-label"
          id="demo-controlled-open-select"
          value={selectGrade}
          label="Age"
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
          labelId="demo-controlled-open-select-label"
          id="demo-controlled-open-select"
          defaultValue={0}
          label="Age"
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
      {selectStudent ? (
        <>
          <span>テスト名:{selectTestInfo.title}</span>
          <span>問題数:{selectTestInfo.question_count}</span>
          <span>実施日:{selectTestInfo.run_date}</span>
          <span className="T6StudentsID" value="ID">
            ID:{("0000" + selectStudent.id).slice(-4)}
          </span>

          <span className="StudentsName">名前:{selectStudent.name}</span>
          <span className="score">{}</span>
          <span className="scoreUnit">{score}点</span>
          <button onClick={t5TestListDisplay}>戻る</button>
          {paper !== false ? (
            // <>
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
                      <TableCell style={{ width: "10%" }}>正誤修正</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>{tablePaper}</TableBody>
                </Table>
              </TableContainer>
            </Container>
          // </>
          ) : (
            "未実施"
          )}
        </>
      ) : (
        <h1>生徒が選択されていません</h1>
      )}
    </div>
  );
}
