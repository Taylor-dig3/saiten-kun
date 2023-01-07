// import React, { useEffect, useState } from "react";
// import "./S4TestCheck.css";
// import { login, testResult } from "../../shareComponents/atom";
// import { useRecoilValue } from "recoil";
// import { useNavigate } from "react-router-dom";
// import { Buffer } from "buffer";

// export default function S4TestCheck() {
//   const loginInfo = useRecoilValue(login);
//   const resultInfo = useRecoilValue(testResult);
//   const navigate = useNavigate();
//   const s3ResultListDisplay = () => navigate("../S3ResultList");

//   useEffect(() => {
//     console.log(resultInfo);
//     console.log(resultInfo.data);
//   }, [resultInfo]);

//   const questions = resultInfo.data.map((elem, index) => {
//     const decodedFile = Buffer.from(elem["answer_img"], "base64").toString();
//     return (
//       <tr key={index}>
//         <td>{elem["question"]}</td>
//         <td>
//           <img className="answer" src={decodedFile} alt="answer" />
//           {elem["result"] ? (
//             <img className="marubatsu" src="./img/maru.png" alt="" />
//           ) : (
//             <img className="marubatsu" src="./img/batsu.png" alt="" />
//           )}
//         </td>
//       </tr>
//     );
//   });

//   return (
//     <div>
//       <h1 className="title">{resultInfo.question_title}</h1>

//       <>
//         <span className="studentsSelect">
//           <div className="studentsID" value="ID">
//             ID:{loginInfo.userId}
//           </div>
//         </span>
//         <span className="studentName">
//           <img
//             className="studentName img"
//             src="./img/test4.png"
//             alt="student name"
//           />
//         </span>
//         <span className="score">{}</span>
//         <span className="scoreUnit">点</span>
//       </>
//       <button onClick={s3ResultListDisplay}>閉じる</button>
//       <div>
//         <table className="questionTable">
//           <thead>
//             <tr>
//               <th>問題</th>
//               <th>回答</th>
//             </tr>
//           </thead>
//           <tbody>{questions}</tbody>
//         </table>
//       </div>
//     </div>
//   );
// }



import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { login, studentSelectedTestInfo } from "../../shareComponents/atom";
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
import {createDate} from "../../helperFunctions/createDate"

import "./S4TestCheck.css";

export default function T6ResultCheck() {
  const loginInfo = useRecoilValue(login);
  const selectTestInfo = useRecoilValue(studentSelectedTestInfo);
  const [paper, setPaper] = useState();
  const [tablePaper, setTablePaper] = useState();
  const [score, setScore] = useState();

  const navigate = useNavigate();
  const t5TestListDisplay = () => {
    navigate("../T5TestList");
  };

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
            
            </TableRow>
          );
        })
      );
    }else if(paper===false){
      setScore("")
    }
  }, [paper]);

useEffect(()=>{
  axios
  .get("/answer", {
    params: {
      user_id: loginInfo.userId,
      test_id: selectTestInfo.test_id,
    },
  })
  .then((res) => {
    console.log(res.data);
    setPaper(res.data);
  });
},[])

  

  return (
    <div>
      <h1 className="T6title">結果確認</h1>

       
          <span>テスト名:{selectTestInfo.title}</span>
          <span>問題数:{selectTestInfo.question_count}</span>
          <span>実施日:{createDate(selectTestInfo.run_date)}</span>
          <span className="T6StudentsID" value="ID">
            ID:{("0000" + loginInfo.userId).slice(-4)}
          </span>

          <span className="StudentsName">名前:{loginInfo.name}</span>
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
                      <TableCell style={{ width: "50%" }}>問題</TableCell>
                      <TableCell
                        style={{ width: "50%" }}
                        colSpan={2}
                        align="center"
                      >
                        解答{" "}
                      </TableCell>
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
    </div>
  );
}
