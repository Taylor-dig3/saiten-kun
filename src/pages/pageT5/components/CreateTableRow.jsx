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

import axios from "axios";
import { Radio, RadioGroup, FormControlLabel } from "@mui/material";

import "../T5TestList.css";

export default function CreateTableRow({ row, setSelectedTestInfo }) {
  const [open, setOpen] = useState(false);
  const [testDetail, setTestDetails] = useState([{ question: "", answer: "" }]);
  const radioChange = (id, title, grade, subject) => {
    setSelectedTestInfo((prev) => {
      return {
        ...prev,
        test_id: id,
        title: title,
        grade: grade,
        subject: subject,
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
              radioChange(row.test_id, row.title, row.grade, row.subject)
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
        <TableCell align="center">{row.make_date}</TableCell>
        <TableCell align="center">{row.run_date}</TableCell>
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