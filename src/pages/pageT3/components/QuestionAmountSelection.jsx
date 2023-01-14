import React from "react";
import { FormControl, NativeSelect,  } from "@mui/material";

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
        id="question-amount-selection"
        value={selectQuestionAmount}
        label="question-amount"
        onChange={handleChange}
      >
        {questionAmount.map((elem, index) => {
          return (
            <option value={elem} key={index}>
              {elem}
            </option>
          );
        })}
      </NativeSelect>
    </FormControl>
  );
}
