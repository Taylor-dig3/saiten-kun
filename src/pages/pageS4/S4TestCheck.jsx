import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { login, studentSelectedTestInfo } from "../../shareComponents/atom";
import { useRecoilValue } from "recoil";
import axios from "axios";
import { Buffer } from "buffer";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { useReward } from "react-rewards";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Container } from "@mui/material";
import { createDate } from "../../helperFunctions/createDate";

import "./S4TestCheck.css";

const rewardObj = {
  lifetime: 300,
  angle: 110,
  decay: 0.98,
  spread: 200,
  startVelocity: 15,
  elementCount: 500,
  elementSize: 15,
  zIndex: 4,
  onAnimationComplete: () => {
    const elem = document.querySelector(".S4-baraemon-visible")
    elem.className = "S4-baraemon-hidden"
  }
};

export default function T6ResultCheck() {
  const loginInfo = useRecoilValue(login);
  const selectTestInfo = useRecoilValue(studentSelectedTestInfo);
  const [paper, setPaper] = useState();
  const [tablePaper, setTablePaper] = useState();
  const [score, setScore] = useState();
  const { reward, isAnimating } = useReward("rewardId", "confetti", rewardObj);
  console.log(selectTestInfo);
  const navigate = useNavigate();
  const s3TestListDisplay = () => {
    navigate("../S3ResultList");
  };

  let S4Name = "";
  let S4Back = "";
  let S4Result = "";
  let S4Num = "";
  let S4Problem = "";
  let S4Score = "";
  let S4Ans = "";

  switch (loginInfo.grade) {
    case 1:
      S4Name = "なまえ";
      S4Back = "もどる";
      S4Result = "テストけっかかくにん";
      S4Num = "すう";
      S4Problem = "もんだい";
      S4Score = "てん";
      S4Ans = "こたえ";
      break;
    case 2:
      S4Name = "名前";
      S4Back = "もどる";
      S4Result = "テストけっかかくにん";
      S4Num = "数";
      S4Problem = "もんだい";
      S4Score = "点";
      S4Ans = "答え";
      break;
    case 3:
      S4Name = "名前";
      S4Back = "もどる";
      S4Result = "テストけっかかくにん";
      S4Num = "数";
      S4Problem = "問題";
      S4Score = "点";
      S4Ans = "答え";
      break;
    case 4:
      S4Name = "名前";
      S4Back = "もどる";
      S4Result = "テスト結果かくにん";
      S4Num = "数";
      S4Problem = "問題";
      S4Score = "点";
      S4Ans = "答え";
      break;
    case 5:
      S4Name = "名前";
      S4Back = "もどる";
      S4Result = "テスト結果確にん";
      S4Num = "数";
      S4Problem = "問題";
      S4Score = "点";
      S4Ans = "解答";
      break;
    case 6:
      S4Name = "名前";
      S4Back = "もどる";
      S4Result = "テスト結果確認";
      S4Num = "数";
      S4Problem = "問題";
      S4Score = "点";
      S4Ans = "解答";
      break;
  }

  useEffect(() => {
    if (loginInfo.loginState === "notYetLoggedIn") {
      navigate("../")
    }
  }, []);

  useEffect(() => {
    if (paper !== false && paper !== undefined) {
      console.log("object");
      console.log(paper);

      const questionCount = paper.data.length;
      let resultNullFlag = false;
      const correctCount = paper.data.filter((elem) => {
        if (elem.result === null) {
          resultNullFlag = true;
        }
        return elem.result;
      }).length;
      // console.log((correctCount / questionCount) * 100);
      if (!resultNullFlag) {
        setScore(Math.round((correctCount / questionCount) * 100));
      } else {
        setScore("＊＊ ");
      }
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
                <img className="S4-answer" src={decodedFile} alt="answer" />
              </TableCell>
              <TableCell>
                {elem["result"] ? (
                  <img className="S4marubatsu" src="./img/maru.png" alt="" />
                ) : (elem["result"] === null ? (
                  <></>
                ) : (
                  <img className="S4marubatsu" src="./img/batsu.png" alt="" />
                ))}
              </TableCell>
            </TableRow>
          );
        })
      );
    } else if (paper === false) {
      setScore("");
    }
  }, [paper]);

  useEffect(() => {
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
  }, []);

  useEffect(() => {
    if (score === 100) {
      console.log("score入ったよ");

      const elem = document.querySelector(".S4-baraemon-hidden")
      elem.className = "S4-baraemon-visible"
      setTimeout(() => {
        reward();
      }, 500)

    }
  }, [score]);

  return (
    <div className="S4-container">
      <h1 className="S4-title">{S4Result}</h1>
      <div className="S4-button-container">
        <button onClick={s3TestListDisplay} className="S4-button">
          {S4Back}
        </button>
      </div>
      <div className="S4-test-result-info">
        <div className="S4-user-info">
          <span className="T6StudentsID" value="ID">
            ID : {("0000" + loginInfo.userId).slice(-4)}
          </span>
          <span className="S4-student-name">{S4Name} : {loginInfo.name}</span>
        </div>
        <div className="S4-test-info">
          <span>{selectTestInfo.title}</span>
          <span>{S4Problem}{S4Num} : {selectTestInfo.question_count}</span>
          <span>テストの日 : {createDate(selectTestInfo.run_date)}</span>
          <span className="S4-test-score">{score} {S4Score}</span>
        </div>
      </div>
      {paper !== false ? (
        // <>
        <Container maxWidth="95%">
          <TableContainer component={Paper} sx={{ maxHeight: "95%" }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  <TableCell style={{ width: "50%" }}>{S4Problem}</TableCell>
                  <TableCell
                    style={{ width: "50%" }}
                    colSpan={2}
                    align="center"
                  >
                    {S4Ans}{" "}
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>{tablePaper}</TableBody>
            </Table>
          </TableContainer>
        </Container>
      ) : (
        // </>
        <h1 className="S4-mizissi">まだやってないよ</h1>
      )}
      <div className="S4-baraemon-hidden" >
        <div id="rewardId">
          <img src="./Bara-emon.PNG" className="S4-baraemon-img" />
        </div>
      </div>

    </div>
  );
}
