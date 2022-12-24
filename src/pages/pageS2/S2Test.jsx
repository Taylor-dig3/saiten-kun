import React from "react";
import "./S2Test.css";
import { useState, useEffect } from "react";
import { startTest } from "../../helperFunctions/useFrontFuncs";
import { useNavigate } from "react-router-dom";

import { Buffer } from "buffer";
// const axios = require("axios").default;
import axios from "axios";
const FormData = require("form-data");
const form1 = new FormData();

// function getTest() {
//   const info = {
//     name: "小テスト１",
//     questions: ["1 + 2 =", "5 + 2 =", "4 + 3 =", "4 + 1 ="],
//   };
//   return info;
// }

export default function S2Test() {
  const [currentAnswer, setCurrentAnswer] = useState({});
  const [currentTestID, setCurrentTestID] = useState("1");
  const [paper, setPaper] = useState([{}]);
  const [student_ID, setStudent_ID] = useState(-1);
  const navigate = useNavigate();
  const s1MenuDisplay = ()=>{navigate("../S1Menu")}
  // const [student_ID, setStudent_ID] = useState(-1);
  const answerImg = {};
  let canvas = [];
  let ctx = [];

  useEffect(() => {
    startTest(currentTestID).then((res) => {
      console.log("startTest実行中")
      setPaper(res);
    });
  }, [currentTestID, setPaper]);

  useEffect(() => {
    canvas[0] = document.getElementById("canvasName");
    ctx[0] = canvas[0].getContext("2d");
    // キャンバスを白色に塗る
    ctx[0].fillStyle = "rgb(255,255,255)";
    ctx[0].fillRect(0, 0, 460, 160);
    // PC対応
    canvas[0].addEventListener(
      "mousedown",
      { index: 0, handleEvent: startPoint },
      false
    );
    canvas[0].addEventListener(
      "mousemove",
      { index: 0, handleEvent: movePoint },
      false
    );
    canvas[0].addEventListener(
      "mouseup",
      { index: 0, handleEvent: endPoint },
      false
    );
    // スマホ対応
    // canvas.addEventListener('touchstart', startPoint, false);
    // canvas.addEventListener('touchmove', movePoint, false);
    // canvas.addEventListener('touchend', endPoint, false);
    for (let i = 1; i <= paper.length; i++) {
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
    return canvas[n].toDataURL();
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

  function submitTest() {
    if (
      window.confirm("見直しは終わりましたか？提出しますがよろしいですか？")
    ) {
      // if (student_ID < 1) {
      //   alert("出席番号を選択して下さい");
      // } else {
      console.log("submit start");
      answerImg["student_id"] = student_ID;
      answerImg["student_name"] = chgImg(0);
      answerImg["answer"] = [];
      for (let i = 1; i <= paper.length; i++) {
        answerImg["answer"].push(chgImg(i));
      }
      console.log("answer end", answerImg["answer"]);
      setCurrentAnswer(answerImg);
      console.log("answer set end");

      //ユーザーローカルに画像を入力して、文字列の配列を出力する関数
      const promises = [];
      answerImg.answer.forEach((elem, index) => {
        console.log("answerImg.answer start");

        const buffer = Buffer.from(elem.split(",")[1], "base64");
        // console.log("buffer",buffer);
        // console.log(form1);
        // let base64 = elem.split(";base64,")[1]
        // const binary_string = window.atob(base64);
        // const len = binary_string.length;
        // let bytes = new Uint8Array(len);
        // for (let i = 0; i < len; i++) {
        //   bytes[i] = binary_string.charCodeAt(i);
        // }
        // const arrayBuffer = bytes.buffer;
        // const blob = new Blob([arrayBuffer]);
        // console.log("blob", blob);
        // form1.append("imgData", buffer, "image.png");
        form1.append("imgData", buffer);
        promises[index] = axios({
          method: "post",
          url: "https://ocr-api.userlocal.jp/recognition/raw",
          data: form1,
          headers: {
            "Access-Control-Allow-Headers": "Content-Type, Authorization",
            "Content-Type": "multipart/form-data",
          },

        })
          .then((res) => {
            console.log("res.data", res.data);
            return res.data.text;
          })
          .catch((err) => {
            console.log("err", err);
          });
      });
      console.log("promiseall start");
      // Promise.all(promises).then((answerText) => {
      //   console.log("answertext")
      //   console.log(answerText);
      //   //各問題についてあっていたかあっていなかったかを出力する関数

      //   const copyPaper = paper.concat();
      //   let correctCount = 0;
      //   for (let i = 0; i < copyPaper; i++) {
      //     if (copyPaper[i] === answerText[i]) {
      //       copyPaper["result"] = true;
      //       correctCount += 1;
      //     } else {
      //       copyPaper["result"] = false;
      //     }
      //   }
      //   console.log("copypaper",copyPaper);
      //   copyPaper[0]["total"] = (correctCount / copyPaper.length) * 100;
      // setPaper(copyPaper);

      //結果を保持するusestateに対してsetする
      // setDispNo(3);
      // });
      // }
    }
  }

  let questions = [];
  questions = paper.map((elem, index) => (
    <>
      <tr key={index + 1}>
        <td>{elem["question"]}</td>
        <td>
          <canvas
            id={`canvasAns${index + 1}`}
            className="canvasAns"
            width="460"
            height="160"
          ></canvas>
        </td>
        <td className="canvasButtonDel">
          <button
            type="button"
            onClick={() => {
              clearCanvas(index + 1);
            }}
          >
            リセット
          </button>
        </td>
      </tr>
    </>
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
      <button className="back-button" onClick={s1MenuDisplay}>戻る</button>
        <input
          type="button"
          value="提 出"
          onClick={() => {
            submitTest();
          }}
          />
      </span>
      <table className="table1">
        <tr>
          <td className="studentsSelect1">
            <select
              className="studentsSelect2"
              name="studentID"
              onChange={(e) => {
                // setStudent_ID(e.target.value);
              }}
              >
              <option value="">出席番号</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
              <option value="11">11</option>
              <option value="12">12</option>
              <option value="13">13</option>
              <option value="14">14</option>
              <option value="15">15</option>
              <option value="16">16</option>
              <option value="17">17</option>
              <option value="18">18</option>
              <option value="19">19</option>
              <option value="20">20</option>
              <option value="21">21</option>
              <option value="22">22</option>
              <option value="23">23</option>
              <option value="24">24</option>
              <option value="25">25</option>
              <option value="26">26</option>
              <option value="27">27</option>
              <option value="28">28</option>
              <option value="29">29</option>
              <option value="30">30</option>
              <option value="31">31</option>
              <option value="32">32</option>
              <option value="33">33</option>
              <option value="34">34</option>
              <option value="35">35</option>
              <option value="36">36</option>
              <option value="37">37</option>
              <option value="38">38</option>
              <option value="39">39</option>
              <option value="40">40</option>
              <option value="41">41</option>
              <option value="42">42</option>
              <option value="43">43</option>
              <option value="44">44</option>
              <option value="45">45</option>
              <option value="46">46</option>
              <option value="47">47</option>
              <option value="48">48</option>
              <option value="49">49</option>
              <option value="50">50</option>
            </select>
          </td>
          <td className="writeName">名前</td>
          <td>
            <canvas id="canvasName" width="460" height="160"></canvas>
          </td>
          <td className="canvasButtonDel0">
            <button
              type="button"
              onClick={() => {
                clearCanvas(0);
              }}
              >
              リセット
            </button>
          </td>
        </tr>
      </table>
      <table className="questionsTable">
        <thead>
          <tr>
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
