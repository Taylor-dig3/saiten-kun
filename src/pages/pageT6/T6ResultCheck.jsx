import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { login, testResult } from "../../shareComponents/atom";
import { useRecoilValue } from "recoil";
import axios from "axios";
import { Buffer } from "buffer";
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

export default function T6ResultCheck() {
  const loginInfo = useRecoilValue(login);
  const resultInfo = useRecoilValue(testResult);
  const [studentIdList,setStudentIdList] = useState()
  const [gradeOpen,setGradeOpen] = useState(false)
  const [filterStudentIdList,setFilterStudentIdList] = useState();
  const [selectGrade,setSelectGrade] = useState("全学年")
  const [studentListOpen,setStudentListOpen] = useState();
  const [selectStudent,setSelectStudent] = useState();

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

  const gradeChange=(e) =>{
    setSelectGrade(e.target.value)
    const filterArr = studentIdList.filter((elem)=>{
     if(selectGrade === "学年を選択してください"){
      return false
     }else if(selectGrade !== "全学年"){
        return elem.grade_id === e.target.value
      }else{
        return true
      }
    })
    console.log(filterArr)
    setFilterStudentIdList(filterArr)
  }

  const studentListHandleClose = () => {
    setStudentListOpen(false);
  };

  const studentListHandleOpen = () => {
    setStudentListOpen(true);
  };

  const selectStudentChange=(e) =>{
    setSelectStudent(e.target.value)
  }
  useEffect(() => {
    // axios.get("/questions").then((res) => {
    //   console.log(res);
    //   // setPaper(res);
    // });
  
    axios.get("/teacher/studentIdList",{
      params:{
        teacher_id:loginInfo.userId
      }
    }).then(res=>{
      console.log(res.data)
      setStudentIdList(res.data)
    })
  }, []);

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
  
  
  useEffect(() => {
    console.log(resultInfo);
    console.log(resultInfo.data);
  }, [resultInfo]);
  
  //仮おきデータresultのみ使用
  const [paper, setPaper] = useState([
    { question: "50音を答えろ1", answer_img: "あいうえお", result: true },
    { question: "50音を答えろ2", answer_img: "あいうえお", result: true },
    { question: "50音を答えろ3", answer_img: "あいうえお", result: false },
    { question: "50音を答えろ4", answer_img: "あいうえお", result: true },
    { question: "50音を答えろ5", answer_img: "あいうえお", result: false },
    { question: "50音を答えろ6", answer_img: "あいうえお", result: true },
    { question: "50音を答えろ7", answer_img: "あいうえお", result: true },
  ]);

  let title = "結果確認";

useEffect(()=>{

},[])

  // const questions = resultInfo.data.map((elem, index) => {
  //   const decodedFile = Buffer.from(elem["answer_img"], "base64").toString();
  //   return (
  //     <tr key={index}>
  //       <td>{elem["question"]}</td>
  //       <td>
  //         <img className="answer" src={decodedFile} alt="answer" />
  //         {elem["result"] ? (
  //           <img className="marubatsu" src="./img/maru.png" alt="" />
  //         ) : (
  //           <img className="marubatsu" src="./img/batsu.png" alt="" />
  //         )}
  //       </td>
  //       <td>
  //         <button
  //           onClick={() => {
  //             const update = [];
  //             const flag = elem[index].result ? false : true;
  //             paper.forEach((item, i) => {
  //               if (i === index) {
  //                 update.push({ ...item, result: flag });
  //               } else {
  //                 update.push(item);
  //               }
  //             });
  //             setPaper(update);
  //           }}
  //         >
  //           正誤反転
  //         </button>
  //       </td>
  //     </tr>
  //   );
  // });


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
          <MenuItem value={"学年を選択してください"}>学年を選択してください</MenuItem>
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
          open={studentListOpen}
          onClose={studentListHandleClose}
          onOpen={studentListHandleOpen}
          value={selectStudent}
          label="Age"
          onChange={selectStudentChange}
        >
          {filterStudentIdList ? filterStudentIdList.map((elem)=>{
            return(
              <MenuItem key={elem.id} value={elem.id}>{`ID:${elem.id}  名前: ${elem.name}`}</MenuItem>
              )
          }):<MenuItem  value={0}>生徒を選択してください</MenuItem>
        }
        </Select>
        <div className="studentsID" value="ID">
          ID:{loginInfo.userId}
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
      <div>
        <table className="questionTable">
          <thead>
            <tr>
              <th>問題</th>
              <th>回答</th>
              <th>正誤修正</th>
            </tr>
          </thead>
          {/* <tbody>{questions}</tbody> */}
        </table>
      </div>
    </div>
  );
}
