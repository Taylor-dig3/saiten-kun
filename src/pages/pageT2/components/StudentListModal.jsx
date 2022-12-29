import React, { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import LockResetIcon from "@mui/icons-material/LockReset";
import Paper from "@mui/material/Paper";
import { Container } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import axios from "axios";

import {
  unlockClick,
  cancelClick,
  changePassword,
} from "../helperFunc/t2Helper";

import CheckCircleOutlineSharpIcon from "@mui/icons-material/CheckCircleOutlineSharp";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";

import "../T2StudentRegistration.css";

export default function StudentListModal({
  setStudentTable,
  studentTable,
  setIsSnackbar,
}) {
  const [formInfo, setFormInfo] = useState({});

  //バリチェックの後にパスワードの変更処理を実行、正しく書き換えできたらスナックバーの表示
  useEffect(() => {
    if (formInfo.validateOkFlag) {
      axios
        .put("/password", {
          user_id: formInfo.userId,
          password: formInfo.password,
        })
        .then((res) => {
          setIsSnackbar(true);
        });
    }
  }, [formInfo]);

  //初回マウント時にテーブルの中身を生成
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
                    "change-user-data-edit-input" +
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
                    onClick={() => {
                      changePassword(elem.user_id, setFormInfo);
                    }}
                >
                  <CheckCircleOutlineSharpIcon
                    className={
                      `change-user-data-edit-${elem.user_id}` +
                      " " +
                      "change-user-data-edit"
                    }
                  />
                </IconButton>
                <IconButton
                  aria-label="lockReset"
                  className={
                    `change-user-data-edit-${elem.user_id}` +
                    " " +
                    "change-user-data-edit"
                }
                onClick={() => {
                  cancelClick(elem.user_id);
                }}
                >
                  <HighlightOffIcon
                    className={
                      `change-user-data-edit-${elem.user_id}` +
                      " " +
                      "change-user-data-edit"
                    }
                  />
                </IconButton>
                <IconButton
                  aria-label="lockReset"
                  className={`change-user-data-unlock-${elem.user_id}`}
                    onClick={() => {
                        setIsSnackbar(true)
                      unlockClick(elem.user_id);
                    }}
                >
                  <LockResetIcon
                    className={`change-user-data-unlock-${elem.user_id}`}
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
