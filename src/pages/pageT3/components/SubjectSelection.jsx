import React from "react";
import { FormControl, NativeSelect } from "@mui/material";

export default function SubjectSelection({ selectSubject, setSelectSubject }) {
  const Subject = ["算数", "国語", "社会", "理科", "英語"];
  const handleChange = (e) => {
    setSelectSubject(e.target.value);
  };

  return (
    <FormControl className={"T3-pulldown"} sx={{ minWidth: "200px" }}>
      <NativeSelect
        className={"T3-pulldown-select"}
        id="Subject-selection"
        value={selectSubject}
        label="Subject"
        onChange={handleChange}
      >
        {Subject.map((elem, index) => {
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
