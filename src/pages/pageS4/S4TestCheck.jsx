import React, { useEffect, useState } from "react";
import "./S4TestCheck.css";
import { login, testResult } from "../../shareComponents/atom";
import { useRecoilValue } from "recoil";
import { useNavigate } from "react-router-dom";
import { Buffer } from "buffer";

export default function S4TestCheck() {
  const loginInfo = useRecoilValue(login);
  const resultInfo = useRecoilValue(testResult);
  const navigate = useNavigate();
  const s3ResultListDisplay = () => navigate("../S3ResultList");

  useEffect(() => {
    console.log(resultInfo);
    console.log(resultInfo.data);
  }, [resultInfo]);

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
      </tr>
    );
  });

  return (
    <div>
      <h1 className="title">{resultInfo.question_title}</h1>

      <>
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
      </>
      <button onClick={s3ResultListDisplay}>閉じる</button>
      <div>
        <table className="questionTable">
          <thead>
            <tr>
              <th>問題</th>
              <th>回答</th>
            </tr>
          </thead>
          <tbody>{questions}</tbody>
        </table>
      </div>
    </div>
  );
}
