import React from "react";
import { FormControl, InputLabel, NativeSelect, MenuItem } from "@mui/material";

export default function GradeSelection({
  selectQuestionAmount,
  setSelectQuestionAmount,
}) {
  const questionAmount = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const handleChange = (e) => {
    setSelectQuestionAmount(e.target.value);
  };

  return (
    <FormControl className={"T3-pulldown"} sx={{ minWidth: "200px" }}>
      <NativeSelect
        className={"T3-pulldown-select"}
        labelId="question-amount-selection-label"
        id="question-amount-selection"
        value={selectQuestionAmount}
        label="question-amount"
        onChange={handleChange}
      >
        {questionAmount.map((elem, index) => {
          return (
            <option value={elem} MenuItem key={index}>
              {elem}
            </option>
          );
        })}
      </NativeSelect>
    </FormControl>
  );
}
