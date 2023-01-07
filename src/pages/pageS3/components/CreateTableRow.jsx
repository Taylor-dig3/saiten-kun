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
import {studentSelectedTestInfo } from "../../../shareComponents/atom";
import {createDate} from "../../../helperFunctions/createDate"

import axios from "axios";
import { Radio} from "@mui/material";

import {useRecoilState } from "recoil";

import "../S3ResultList.css";

export default function CreateTableRow({ row }) {
  const [selectTestInfo,setSelectTestInfo] = useRecoilState(studentSelectedTestInfo);
  const [open, setOpen] = useState(false);
  const [testDetail, setTestDetails] = useState([{ question: "", answer: "" }]);
  const radioChange = (id, title, grade, subject,count,makeDate,runDate) => {
    console.log(id)
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
  }, []);

  return (
    <React.Fragment>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell align="center">
          <Radio
            value={row.title}
            control={<Radio />}
            onChange={() =>
              radioChange(row.test_id, row.title, row.grade, row.subject,row.question_number,row.run_date)
            }
          />
        </TableCell>
        <TableCell align="center">{row.title}</TableCell>
        
        <TableCell align="center">{row.grade}</TableCell>
        <TableCell align="center">{row.subject}</TableCell>
        <TableCell align="center">{row.question_number}</TableCell>
        <TableCell align="center">{createDate(row.run_date)}</TableCell>
      </TableRow>
      
    </React.Fragment>
  );
}