import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { login, testResult } from "../../shareComponents/atom";
import { useRecoilValue } from "recoil";
import axios from "axios";
import { Buffer } from "buffer";

export default function T6ResultCheck() {
  const loginInfo = useRecoilValue(login);
  const resultInfo = useRecoilValue(testResult);
  const navigate = useNavigate();
  const t5TestListDisplay = () => {
    navigate("../T5TestList");
  };

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

  const questions = resultInfo.data.map((elem, index) => {
    const decodedFile = Buffer.from(elem["answer_img"], "base64").toString();
    return (
      <tr key={index}>
        <td>{elem["question"]}</td>
        <td>
          <img className="answer" src={decodedFile} alt="answer" />
          {elem["result"] ? (
            <img className="marubatsu" src="./img/maru.png" alt="" />
          ) : (
            <img className="marubatsu" src="./img/batsu.png" alt="" />
          )}
        </td>
        <td>
          <button
            onClick={() => {
              const update = [];
              const flag = elem[index].result ? false : true;
              paper.forEach((item, i) => {
                if (i === index) {
                  update.push({ ...item, result: flag });
                } else {
                  update.push(item);
                }
              });
              setPaper(update);
            }}
          >
            正誤反転
          </button>
        </td>
      </tr>
    );
  });

  useEffect(() => {
    axios.get("/questions").then((res) => {
      console.log(res);
      // setPaper(res);
    });
  }, []);

  return (
    <div>
      <h2 className="title">{title}</h2>
      <span className="studentsSelect">
        <div className="studentsID" value="ID">
          ID:{loginInfo.userId}
        </div>
      </span>
      <span className="studentName">
        <img
          className="studentName img"
          src="./img/test4.png"
          alt="student name"
        />
      </span>
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
          <tbody>{questions}</tbody>
        </table>
      </div>
    </div>
  );
}
