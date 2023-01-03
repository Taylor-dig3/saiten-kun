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
import { login } from "../../../shareComponents/atom";
import { useRecoilState, useRecoilValue } from "recoil";
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
  setIsSuccessFlag,
}) {
  const [formInfo, setFormInfo] = useState({});
  const loginInfo = useRecoilValue(login);

  //バリチェックの後にパスワードの変更処理を実行、正しく書き換えできたらスナックバーの表示
  useEffect(() => {
    if (formInfo.validateOkFlag) {
      axios
        .put("/password", {
          user_id: formInfo.userId,
          password: formInfo.password,
        })
        .then((res) => {
          setIsSuccessFlag(true);
          setIsSnackbar(true);
          cancelClick(formInfo.userId);
        });
    } else if (formInfo.validateOkFlag === false) {
      setIsSuccessFlag(false);
      setIsSnackbar(true);
    }
  }, [formInfo]);

  //初回マウント時にテーブルの中身を生成
  useEffect(() => {
    axios
      .get("/student", {
        params: {
          teacher_id: loginInfo.userId,
        },
      })
      .then((res) => {
        const sortArr = res.data.sort((a, b) => Number(a.id) - Number(b.id));
        setStudentTable(
          sortArr.map((elem, index) => {
            return (
              <TableRow
                key={elem.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="elem">
                  {elem.id}
                </TableCell>
                <TableCell component="th" scope="elem">
                  {elem.name}
                </TableCell>
                <TableCell component="th" scope="elem">
                  {elem.grade_id}
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
                      `change-user-data-edit-${elem.id}` +
                      " " +
                      "change-user-data-edit" +
                      " " +
                      "change-user-data-edit-input" +
                      " " +
                      `change-user-data-edit-input-${elem.id}`
                    }
                  />
                  <IconButton
                    aria-label="lockReset"
                    onClick={() => {
                      changePassword(elem.id, setFormInfo);
                    }}
                  >
                    <CheckCircleOutlineSharpIcon
                      className={
                        `change-user-data-edit-${elem.id}` +
                        " " +
                        "change-user-data-edit"
                      }
                    />
                  </IconButton>
                  <IconButton
                    aria-label="lockReset"
                    onClick={() => {
                      cancelClick(elem.id);
                    }}
                  >
                    <HighlightOffIcon
                      className={
                        `change-user-data-edit-${elem.id}` +
                        " " +
                        "change-user-data-edit"
                      }
                    />
                  </IconButton>
                  <IconButton
                    aria-label="lockReset"
                    onClick={() => {
                      unlockClick(elem.id);
                    }}
                  >
                    <LockResetIcon
                      className={`change-user-data-unlock-${elem.id}`}
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
        <TableContainer component={Paper} sx={{ maxHeight: "90%" }}>
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
