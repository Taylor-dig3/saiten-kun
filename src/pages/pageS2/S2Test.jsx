import React from "react";
import axios from "axios";
import "./S2Test.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { login, studentTestList, testQuestion } from "../../shareComponents/atom";
import { useRecoilValue } from "recoil";
import delImg from "./eraser.png";
import gridImg from "./grid.png";
import CountDownTimer from "./components/CountDownTimer";

export default function S2Test() {
  const [currentAnswer, setCurrentAnswer] = useState({});
  const [paper, setPaper] = useState({ data: [] });
  const [timeUpFlag, setTimeUpFlag] = useState(false);
  const testList = useRecoilValue(studentTestList);
  const testQuestionInfo = useRecoilValue(testQuestion);
  const loginInfo = useRecoilValue(login);
  const navigate = useNavigate();
  const s1MenuDisplay = () => {
    navigate("../S1Menu");
  };
  const answerImg = {};

  let canvas = [];
  let ctx = [];

  //S1のテスト開始ボタンでtestQuestionInfoが変わった時にtestQuestionを持ってくる
  useEffect(() => {
    setPaper(testQuestionInfo);
  }, [testQuestionInfo]);

  useEffect(() => {
    console.log(paper.data.length);
    console.log(paper.data);
    for (let i = 0; i < paper.data.length; i++) {
      console.log(paper.data.length);
      canvas[i] = document.getElementById(`canvasAns${i}`);
      ctx[i] = canvas[i].getContext("2d");
      ctx[i].fillStyle = "rgba(255,255,255,0.5)";
      ctx[i].fillRect(0, 0, 460, 160);

      // PC対応
      canvas[i].addEventListener(
        "mousedown",
        { index: i, handleEvent: startPoint },
        false
      );
      canvas[i].addEventListener(
        "mousemove",
        { index: i, handleEvent: movePoint },
        false
      );
      canvas[i].addEventListener(
        "mouseup",
        { index: i, handleEvent: endPoint },
        false
      );
      // スマホ対応
      canvas[i].addEventListener(
        "touchstart",
        { index: i, handleEvent: startPoint },
        false
      );
      canvas[i].addEventListener(
        "touchmove",
        { index: i, handleEvent: movePoint },
        false
      );
      canvas[i].addEventListener(
        "touchend",
        { index: i, handleEvent: endPoint },
        false
      );
    }
  });

  let moveflg = 0;
  let Xpoint;
  let Ypoint;
  let temp = [[], []];

  //初期値（サイズ、色、アルファ値）の決定
  let defSize = 1;
  let defColor = "#000";

  // ストレージの初期化
  let myStorage = localStorage;
  window.onload = initLocalStorage();

  function startPoint(e) {
    e.preventDefault();
    ctx[this.index].beginPath();
    let rect = e.target.getBoundingClientRect();
    if (e.clientX) {
      Xpoint = e.clientX - rect.left;
      Ypoint = e.clientY - rect.top;
    } else {
      Xpoint = e.touches[0].clientX - rect.left;
      Ypoint = e.touches[0].clientY - rect.top;
      // マルチタッチの場合はズームやスライド等の操作であるため、お絵かきをやめる。
      if (e.touches.length > 1) {
        return;
      }
    }
    ctx[this.index].moveTo(Xpoint, Ypoint);
  }

  function movePoint(e) {
    if (e.buttons === 1 || e.witch === 1 || e.type === "touchmove") {
      let rect = e.target.getBoundingClientRect();
      if (e.clientX) {
        Xpoint = e.clientX - rect.left;
        Ypoint = e.clientY - rect.top;
      } else {
        Xpoint = e.touches[0].clientX - rect.left;
        Ypoint = e.touches[0].clientY - rect.top;
        // マルチタッチの場合はズームやスライド等の操作であるため、お絵かきをやめる。
        if (e.touches.length > 1) {
          return;
        }
      }
      moveflg = 1;
      ctx[this.index].lineTo(Xpoint, Ypoint);
      ctx[this.index].lineCap = "round";
      ctx[this.index].lineWidth = defSize * 2;
      ctx[this.index].strokeStyle = defColor;
      ctx[this.index].stroke();
    }
  }

  function endPoint(e) {
    if (moveflg === 0) {
      ctx[this.index].lineTo(Xpoint - 1, Ypoint - 1);
      ctx[this.index].lineCap = "round";
      ctx[this.index].lineWidth = defSize * 2;
      ctx[this.index].strokeStyle = defColor;
      ctx[this.index].stroke();
    }
    moveflg = 0;
    setLocalStoreage(this.index);
  }

  function clearCanvas(n) {
    initLocalStorage();
    temp[n] = [];
    resetCanvas(n);
  }

  function resetCanvas(n) {
    ctx[n].clearRect(0, 0, ctx[n].canvas.clientWidth, ctx[n].canvas.clientHeight);
    ctx[n].fillStyle = "rgba(255,255,255,0.65)";
    ctx[n].fillRect(0, 0, 460, 160);
  }

  function chgImg(n) {
    let fileData = canvas[n].toDataURL();
    // fileData = fileData.replace(/^data:\w+\/\w+;base64,/, "");
    return fileData;
  }

  function initLocalStorage() {
    myStorage.setItem("__log", JSON.stringify([]));
  }

  function setLocalStoreage(n) {
    let png = canvas[n].toDataURL();
    let logs = JSON.parse(myStorage.getItem("__log"));
    setTimeout(function () {
      logs.unshift({ png: png });
      myStorage.setItem("__log", JSON.stringify(logs));
      temp[n] = [];
    }, 0);
  }

  async function submitTest(isTimeUp) {
    let flag = false;
    if (isTimeUp) {
      window.alert("テストはおわりです。提出します。");
      flag = true;
    } else {
      if (
        window.confirm("見なおしをしましたか？　提出しますがよいですか？")
      ) {
        flag = true;
      }
    }
    if (flag) {
      console.log("submit start");
      // answerImg["student_id"] = student_ID;
      // answerImg["student_name"] = chgImg(0);
      answerImg["answer"] = [];
      for (let i = 0; i < paper.data.length; i++) {
        answerImg["answer"].push(chgImg(i));
      }
      console.log("answer end", answerImg["answer"]);
      setCurrentAnswer(answerImg);
      console.log("answer set end");
      console.log(answerImg);

      //ユーザーローカルに画像を入力して、文字列の配列を出力する関数
      // const arr = [];
      // let i = 0;
      // for (const elem of answerImg.answer) {
      //   console.log("for" + i);
      //   arr[i] = await axios
      //     .post("/riontest", {
      //       data: elem.replace(/^data:\w+\/\w+;base64,/, ""),
      //       headers: {
      //         "Access-Control-Allow-Headers": "Content-Type, Authorization",
      //         "Content-Type": "multipart/form-data",
      //       },
      //     })
      //     .then((res) => {
      //       console.log("then");
      //       return res.data.text;
      //     });
      //   i++;
      // }
      // console.log(arr);

      // const answerResult = [];
      // for (let i = 0; i < testQuestionInfo.data.length; i++) {
      //   if (testQuestionInfo.data[i].answer === arr[i]) {
      //     answerResult.push(true);
      //   } else {
      //     answerResult.push(false);
      //   }
      // }
      // console.log(answerResult);

      const dataArray = [];
      for (let i = 0; i < testQuestionInfo.data.length; i++) {
        const dataObj = {
          question_id: testQuestionInfo.data[i].question_id,
          answer_img: answerImg.answer[i],
          // result: answerResult[i],
        };
        dataArray.push(dataObj);
      }
      console.log(dataArray);

      //アンサーデータをDBに送信
      await axios
        .post("/answer", {
          user_id: loginInfo.userId,
          test_id: testQuestionInfo.test_id,
          data: dataArray,
        })
        .then((res) => {
          console.log("then");
          s1MenuDisplay();
          return res.data.text;
        });
    }
  }

  let questions = [];
  questions = paper.data.map((elem, index) => (
    <tr key={index}>
      <td>{index + 1}</td>
      <td>{elem["question"]}</td>
      <td className="canvasTd">
        <canvas
          id={`canvasAns${index}`}
          className="canvasAns"
          width="460"
          height="160"
        ></canvas>
        <img className="bkImg" src={gridImg} alt="backgroundImg" />
      </td>
      <td className="canvasButtonDel">
        <button
          type="button"
          onClick={() => {
            clearCanvas(index);
          }}
        >
          <img src={delImg} alt="delete" />
        </button>
      </td>
    </tr>
  ));

  let title;
  let question;
  try {
    title = testList[0].title;
    question = testQuestionInfo.question_title;
  } catch (err) {
    title = "";
    question = "";
  }

  return (
    <>
      <div className="S2-div">
        <div className="user-info">
          {loginInfo.name}
        </div>
        <h2 className="testTitle">{title}</h2>
        <span className="submitTest">
          <button
            className="submitButton"
            onClick={() => {
              submitTest(false);
            }}>提 出
          </button>
        </span>
        <CountDownTimer timeLimit={testQuestionInfo.time_limit} setTimeUpFlag={setTimeUpFlag} submitTest={submitTest} />
        <table className="table1">
          <tbody>
            <tr>
              <td className="questionTitle">
                {question}
              </td>
            </tr>
          </tbody>
        </table>
        <table className="questionsTable">
          <thead>
            <tr>
              <th>No.</th>
              <th>問題</th>
              <th>回答欄</th>
            </tr>
          </thead>
          <tbody>{questions}</tbody>
        </table>
      </div>
    </>
  );
}
