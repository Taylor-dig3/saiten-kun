import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { login, testResult, selectedTestId } from "../../shareComponents/atom";
import { useRecoilValue } from "recoil";
import axios from "axios";
import { Buffer } from "buffer";
import Select, { SelectChangeEvent } from "@mui/material/Select";
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
  const resultInfo = useRecoilValue(testResult);
  const selectTestId = useRecoilValue(selectedTestId);
  const [studentIdList, setStudentIdList] = useState();
  const [gradeOpen, setGradeOpen] = useState(false);
  const [filterStudentIdList, setFilterStudentIdList] = useState();
  const [selectGrade, setSelectGrade] = useState("全学年");
  const [studentListOpen, setStudentListOpen] = useState();
  const [selectStudent, setSelectStudent] = useState();
  const [paper, setPaper] = useState();
  const [tablePaper, setTablePaper] = useState();
  const navigate = useNavigate();
  const t5TestListDisplay = () => {
    navigate("../T5TestList");
  };
  const handleClose = () => {
    setGradeOpen(false);
  };

  const handleOpen = () => {
    setGradeOpen(true);
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

  const studentListHandleClose = () => {
    setStudentListOpen(false);
  };

  const studentListHandleOpen = () => {
    setStudentListOpen(true);
  };

  const selectStudentChange = (e) => {
    console.log(e.target)
    console.log(e.target.value.split("&%",2))
    const valueArr = e.target.value.split("&%",2)
    const studentInfo = {id:Number(valueArr[0]),name:valueArr[1]}
    setSelectStudent(studentInfo);
    axios
      .get("/answer", {
        params: {
          user_id: studentInfo.id,
          test_id: selectTestId,
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

  // useEffect(() => {
  //   console.log(resultInfo);
  //   console.log(resultInfo.data);
  // }, [resultInfo]);

  let title = "結果確認";

  useEffect(() => {
    if (paper) {
      console.log("object");
      console.log(paper);
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
              <TableCell><img className="answer" src={decodedFile} alt="answer" />
              </TableCell>
              <TableCell >
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
                    axios.put("/answer",{
                      result_id:elem.result_id
                    }).then(res=>{
                      console.log(res)
                    })
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
    }
  }, [paper]);

  return (
    <div>
      {/* <h2 className="title">{title}</h2> */}
      <span className="studentsSelect">
        <Select
          labelId="demo-controlled-open-select-label"
          id="demo-controlled-open-select"
          open={gradeOpen}
          onClose={handleClose}
          onOpen={handleOpen}
          value={selectGrade}
          label="Age"
          onChange={gradeChange}
        >
          {/* <MenuItem value={"学年を選択してください"}>学年を選択してください</MenuItem> */}
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
          // open={studentListOpen}
          // onClose={studentListHandleClose}
          // onOpen={studentListHandleOpen}
          // value={selectStudent || 0}
          defaultValue={0}
          label="Age"
          onChange={selectStudentChange}
        >
          <MenuItem value={0}>生徒を選択してください</MenuItem>
          {filterStudentIdList
            ? filterStudentIdList.map((elem, index) => {
                return (
                  <MenuItem key={elem.id} value={`${elem.id}&%${elem.name}`} >{`ID:${(
                    "0000" + elem.id
                  ).slice(-4)}　　　 ${elem.name}`}</MenuItem>
                );
              })
            : 1}
        </Select>
        <div className="studentsID" value="ID">
          ID:{selectStudent.id}
        </div>
      </span>
      {/* <span className="studentName">
        <img
        className="studentName img"
        src="./img/test4.png"
        alt="student name"
        />
      </span> */}
      <span className="score">{}</span>
      <span className="scoreUnit">点</span>
      <button onClick={t5TestListDisplay}>戻る</button>
      {/* <div>
        <table className="questionTable">
          <thead>
            <tr>
              <th>問題</th>
              <th>回答</th>
              <th>正誤修正</th>
            </tr>
          </thead> */}
      {/* <tbody>{questions}</tbody> */}
      {/* </table>
      </div> */}
      <Container maxWidth="95%">
        <TableContainer component={Paper} sx={{ maxHeight: "95%" }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <TableCell style={{ width: "40%" }}>問題</TableCell>
                <TableCell style={{ width: "25%" }}>正解</TableCell>
                <TableCell style={{ width: "15%" }}>解答</TableCell>
                <TableCell style={{ width: "10%" }}></TableCell>
                <TableCell style={{ width: "10%" }}>正誤修正</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>{tablePaper || 1}</TableBody>
          </Table>
        </TableContainer>
      </Container>
    </div>
  );
}
// //仮おきデータresultのみ使用
// const [paper, setPaper] = useState([
//   { question: "50音を答えろ1", answer_img: "あいうえお", result: true },
//   { question: "50音を答えろ2", answer_img: "あいうえお", result: true },
//   { question: "50音を答えろ3", answer_img: "あいうえお", result: false },
//   { question: "50音を答えろ4", answer_img: "あいうえお", result: true },
//   { question: "50音を答えろ5", answer_img: "あいうえお", result: false },
//   { question: "50音を答えろ6", answer_img: "あいうえお", result: true },
//   { question: "50音を答えろ7", answer_img: "あいうえお", result: true },
// ]);
// useEffect(() => {

//   if(studentIdList){
//     const filterArr = studentIdList.filter((elem)=>{
//       if(selectGrade !== "全学年"){
//         return elem.grade_id === selectGrade
//       }else{
//         return true
//       }
//     })
//     console.log(filterArr)
//     setFilterStudentIdList(filterArr)
//   }

// }, [selectGrade]);
