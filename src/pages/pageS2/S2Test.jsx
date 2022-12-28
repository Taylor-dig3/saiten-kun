import React from "react";
import "./S2Test.css";
import { useState, useEffect } from "react";
import { startTest } from "../../helperFunctions/useFrontFuncs";
import { useNavigate } from "react-router-dom";
import { login, testQuestion } from "../../shareComponents/atom";
import { useRecoilValue } from "recoil";

import { Buffer } from "buffer";
import axios from "axios";
const FormData = require("form-data");
const form1 = new FormData();

// import axios from "axios";

export default function S2Test() {
  const [currentAnswer, setCurrentAnswer] = useState({});
  const [currentTestID, setCurrentTestID] = useState("1");
  const [paper, setPaper] = useState({ data: [0, 1, 2] });
  const testQuestionInfo = useRecoilValue(testQuestion);
  const loginInfo = useRecoilValue(login);
  const navigate = useNavigate();
  const s1MenuDisplay = () => {
    navigate("../S1Menu");
  };
  // const [student_ID, setStudent_ID] = useState(-1);
  const answerImg = {};
  let canvas = [];
  let ctx = [];

  // useEffect(() => {
  //   startTest(currentTestID).then((res) => {
  //     console.log(res);
  //     console.log("startTest実行中");

  //     setPaper(res);
  //   });
  // }, [currentTestID, setPaper]);

  //S1のテスト開始ボタンでtestQuestionInfoが変わった時にtestQuestionを持ってくる
  useEffect(() => {
    console.log(testQuestionInfo);
    console.log(testQuestionInfo.data);
    setPaper(testQuestionInfo);
  }, [testQuestionInfo]);

  useEffect(() => {
    // canvas[0] = document.getElementById("canvasName");
    // ctx[0] = canvas[0].getContext("2d");
    // キャンバスを白色に塗る
    // ctx[0].fillStyle = "rgb(255,255,255)";
    // ctx[0].fillRect(0, 0, 460, 160);
    // PC対応
    // canvas[0].addEventListener(
    //   "mousedown",
    //   { index: 0, handleEvent: startPoint },
    //   false
    // );
    // canvas[0].addEventListener(
    //   "mousemove",
    //   { index: 0, handleEvent: movePoint },
    //   false
    // );
    // canvas[0].addEventListener(
    //   "mouseup",
    //   { index: 0, handleEvent: endPoint },
    //   false
    // );
    // スマホ対応
    // canvas.addEventListener('touchstart', startPoint, false);
    // canvas.addEventListener('touchmove', movePoint, false);
    // canvas.addEventListener('touchend', endPoint, false);
    console.log("paperやで");
    console.log(paper.data.length);
    console.log(paper.data);
    for (let i = 0; i < paper.data.length; i++) {
      console.log(paper.data.length);
      canvas[i] = document.getElementById(`canvasAns${i}`);
      ctx[i] = canvas[i].getContext("2d");
      ctx[i].fillStyle = "rgb(255,255,255)";
      ctx[i].fillRect(0, 0, 460, 160);
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
    Xpoint = e.layerX;
    Ypoint = e.layerY;
    ctx[this.index].moveTo(Xpoint, Ypoint);
  }

  function movePoint(e) {
    if (e.buttons === 1 || e.witch === 1 || e.type === "touchmove") {
      Xpoint = e.layerX;
      Ypoint = e.layerY;
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
    // if (confirm('Canvasを初期化しますか？')) {
    initLocalStorage();
    temp[n] = [];
    resetCanvas(n);
    // }
  }

  function resetCanvas(n) {
    ctx[n].clearRect(
      0,
      0,
      ctx[n].canvas.clientWidth,
      ctx[n].canvas.clientHeight
    );
    ctx[n].fillStyle = "rgb(255,255,255)";
  }

  function chgImg(n) {
    console.log(canvas[n]);
    console.log(canvas[n].toDataURL());
    let fileData = canvas[n].toDataURL();
    fileData = fileData.replace(/^data:\w+\/\w+;base64,/, "");
    // const decodedFile = Buffer.from(fileData, "base64");
    // form.append("imgData", decodedFile, "test.jpg");
    return fileData;
    // return canvas[n].toDataURL();
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

  async function submitTest() {
    if (
      window.confirm("見直しは終わりましたか？提出しますがよろしいですか？")
    ) {
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
      // const promises = [];
      const arr = [];
      let i = 0;
      for (const elem of answerImg.answer) {
        console.log("for"+i);
        arr[i] = await axios
          .post("/riontest", {
            data: elem,
            headers: {
              "Access-Control-Allow-Headers": "Content-Type, Authorization",
              "Content-Type": "multipart/form-data",
            },
          })
          .then((res) => {
            console.log("then");
            return res.data.text
          });
        i++;
      }
      console.log(arr)
    }
  }

  console.log("object");
  let questions = [];
  questions = paper.data.map((elem, index) => (
    <tr key={index}>
      <td>{elem["question_id"]}</td>
      <td>{elem["question"]}</td>
      <td>
        <canvas
          id={`canvasAns${index}`}
          className="canvasAns"
          width="460"
          height="160"
        ></canvas>
      </td>
      <td className="canvasButtonDel">
        {/* <button
          type="button"
          onClick={() => {
            clearCanvas(index);
          }}
        >
          リセット
        </button> */}
      </td>
    </tr>
  ));

  let title;
  try {
    title = paper[0]["name"];
  } catch (err) {
    title = "";
  }

  return (
    <>
      <div>
        <h2>{title}</h2>
        <span className="submitTest">
          <button className="back-button" onClick={s1MenuDisplay}>
            戻る
          </button>
          <input
            type="button"
            value="提 出"
            onClick={() => {
              submitTest();
            }}
          />
        </span>
        <table className="table1">
          <tbody>
            <tr>
              <td className="studentsID" value="ID">
                ID:{loginInfo.userId}
              </td>
              <td className="writeName">名前</td>
              <td className="studentsID" value="ID">
                名前:{loginInfo.userId}
              </td>
              {/* <canvas id="canvasName" width="460" height="160"></canvas> */}
              {/* <td className="canvasButtonDel0">
                <button
                  type="button"
                  onClick={() => {
                    clearCanvas(0);
                  }}
                >
                  リセット
                </button>
              </td> */}
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
