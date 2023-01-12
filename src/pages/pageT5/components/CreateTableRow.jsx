import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import {selectedTestInfo } from "../../../shareComponents/atom";
import {createDate} from "../../../helperFunctions/createDate"

import axios from "axios";
import { Radio} from "@mui/material";

import {useRecoilState } from "recoil";

import "../T5TestList.css";

export default function CreateTableRow({ row }) {
  const [selectTestInfo,setSelectTestInfo] = useRecoilState(selectedTestInfo);
  const [open, setOpen] = useState(false);
  const [resultStatus, setResultStatus] = useState();
  const [testDetail, setTestDetails] = useState([{ question: "", answer: "" }]);
  const radioChange = (id, title, grade, subject,count,makeDate,runDate) => {
    setSelectTestInfo((prev) => {
      return {
        ...prev,
        test_id: id,
        title: title,
        grade: grade,
        subject: subject,
        question_count:count,
        make_date:makeDate,
        run_date:runDate
      };
    });
  };

  useEffect(() => {
    axios
      .get("testDetail", {
        params: {
          test_id: row.test_id,
        },
      })
      .then((res) => {
        console.log(res.data);
        setTestDetails(res.data);
      });
      axios
        .get("/teacher/checkResultStatus", {
          params: {
            test_id: row.test_id,
          },
        })
        .then((res) => {
          console.log("ここですよ",res.data);
          setResultStatus(res.data);
        });

  }, []);

  // useEffect(() => {
  //     axios
  //       .get("/teacher/checkResultStatus", {
  //         params: {
  //           test_id: row.test_id,
  //         },
  //       })
  //       .then((res) => {
  //         console.log("ここですよ",res.data);
  //         setResultStatus(res.data);
  //       });
  //     // axios
  //     //   .get("/teacher/studentIdList", {
  //     //     params: {
  //     //       teacher_id: loginInfo.userId,
  //     //     },
  //     //   })
  //     //   .then((res) => {
  //     //     console.log(res.data);
  //     //     setStudentIdList(res.data);
  //     //     setFilterStudentIdList(res.data);
  //     //   });
  //   },[]);

  return (
    <React.Fragment>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell align="center">
          <Radio
            value={row.test_id}
            control={<Radio />}
            onChange={() =>
              radioChange(row.test_id, row.title, row.grade, row.subject,row.question_count,row.make_date,row.run_date)
            }
          />
        </TableCell>
        <TableCell align="center">{row.title}</TableCell>
        <TableCell align="left">
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell align="center">{row.grade}</TableCell>
        <TableCell align="center">{row.subject}</TableCell>
        <TableCell align="center">{row.question_count}</TableCell>
        <TableCell align="center">{createDate(row.make_date)}</TableCell>
        <TableCell align="center">{createDate(row.run_date)}</TableCell>
        <TableCell align="center">{resultStatus
          ? "実施済み" : "未実施"}</TableCell>

      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Typography variant="h6" gutterBottom component="div">
                {`問題一覧 (テストID:${row.test_id})`}
              </Typography>
              <Table size="medium" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>No.</TableCell>
                    <TableCell align="left">問題</TableCell>
                    <TableCell align="center">解答</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {testDetail.map((elem, index) => (
                    <TableRow key={index}>
                      <TableCell component="th" scope="row">
                        {index + 1}
                      </TableCell>
                      <TableCell>{elem.question}</TableCell>
                      <TableCell align="center">{elem.answer}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}
