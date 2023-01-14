import React from "react";
import { FormControl, NativeSelect } from "@mui/material";

export default function GradeSelection({ selectGrade, setSelectGrade }) {
  const grade = [1, 2, 3, 4, 5, 6];
  const handleChange = (e) => {
    setSelectGrade(e.target.value);
  };

  return (
    <FormControl className={"T3-pulldown"} sx={{ minWidth: "200px" }}>
      <NativeSelect
        className={"T3-pulldown-select"}
        id="grade-selection"
        value={selectGrade}
        label="Age"
        onChange={handleChange}
      >
        {grade.map((elem, index) => {
          return (
            <option value={elem}  key={index}>
              {elem}
            </option>
          );
        })}
      </NativeSelect>
    </FormControl>
  );
}
