import React, { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import LockResetIcon from "@mui/icons-material/LockReset";
import Paper from "@mui/material/Paper";
import {
  Container,
} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import axios from "axios";

// import { login } from "../../shareComponents/atom";
import { useRecoilState, useRecoilValue } from "recoil";

import CheckCircleOutlineSharpIcon from "@mui/icons-material/CheckCircleOutlineSharp";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";

import "../T2StudentRegistration.css";


export default function StudentListModal({
  setStudentTable,
  studentTable,
}) {
  const unlockClick = (id) => {
    const editItems = document.querySelectorAll(`.change-user-data-edit-${id}`);
    const unlockItem = document.querySelector(`.change-user-data-unlock-${id}`);
    for (const elem of editItems) {
      elem.classList.remove("change-user-data-edit");
    }
    unlockItem.classList.add("user-data-unlock-hidden");
  };

  const cancelClick = (id) => {
    const editItems = document.querySelectorAll(`.change-user-data-edit-${id}`);
    const unlockItem = document.querySelector(`.change-user-data-unlock-${id}`);
    for (const elem of editItems) {
      elem.classList.add("change-user-data-edit");
    }
    unlockItem.classList.remove("user-data-unlock-hidden");
  };
const changePassword = (id)=>{
    const errors = {};
    const editInput = document.querySelector(`.change-user-data-edit-input-${id}`)

    if (editInput.value.length < 4) {
        errors.password = "4文字以上、15文字以下のパスワードを入力してください";
      } else if (editInput.value.length > 15) {
        errors.password = "4文字以上、15文字以下のパスワードを入力してください";
      }

}

  useEffect(() => {
    axios.get("/studentMock").then((res) => {
      console.log(res.data);
      setStudentTable(
        res.data.map((elem, index) => {
          return (
            <TableRow
              key={elem.user_id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="elem">
                {elem.user_id}
              </TableCell>
              <TableCell component="th" scope="elem">
                {elem.name}
              </TableCell>
              <TableCell component="th" scope="elem">
                {elem.grade}
              </TableCell>
              <TableCell
                component="th"
                scope="elem"
                className="pass-change-container"
              >
                {""}
                <input
                  type="password"
                  placeholder="変更後のパスワード"
                  name="userId"
                  className={
                    `change-user-data-edit-${elem.user_id}` +
                    " " +
                    "change-user-data-edit" +
                    " " +
                    "change-user-data-edit-input"+
                    " " +
                    `change-user-data-edit-input-${elem.user_id}`
                  }
                />
                <IconButton
                  aria-label="lockReset"
                  className={
                    `change-user-data-edit-${elem.user_id}` +
                    " " +
                    "change-user-data-edit"
                  }
                >
                  <CheckCircleOutlineSharpIcon
                    className={
                      `change-user-data-edit-${elem.user_id}` +
                      " " +
                      "change-user-data-edit"
                    }
                    onClick={()=>{changePassword(elem.user_id)}}
                  />
                </IconButton>
                <IconButton
                  aria-label="lockReset"
                  className={
                    `change-user-data-edit-${elem.user_id}` +
                    " " +
                    "change-user-data-edit"
                  }
                >
                  <HighlightOffIcon
                    className={
                      `change-user-data-edit-${elem.user_id}` +
                      " " +
                      "change-user-data-edit"
                    }
                    onClick={() => {
                      cancelClick(elem.user_id);
                    }}
                  />
                </IconButton>
                <IconButton
                  aria-label="lockReset"
                  className={`change-user-data-unlock-${elem.user_id}`}
                >
                  <LockResetIcon
                    className={`change-user-data-unlock-${elem.user_id}`}
                    onClick={() => {
                      unlockClick(elem.user_id);
                    }}
                  />
                </IconButton>
              </TableCell>
            </TableRow>
          );
        })
      );
    });
  }, []);

  return (
    <>
      
      <Container maxWidth="lg">
        <TableContainer component={Paper} sx={{ maxHeight: 880 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <TableCell style={{ width: "25%" }}>ユーザーID</TableCell>
                <TableCell style={{ width: "25%" }}>名前</TableCell>
                <TableCell style={{ width: "25%" }}>学年</TableCell>
                <TableCell style={{ width: "25%" }}>
                  パスワードリセット
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>{studentTable}</TableBody>
          </Table>
        </TableContainer>
      </Container>
    </>
  );
}
