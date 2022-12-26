import React from 'react'
import {FormControl,InputLabel,Select,MenuItem} from "@mui/material"


export default function GradeSelection({selectGrade,setSelectGrade}) {

    const grade = [1,2,3,4,5,6];
    const handleChange = (e)=>{
        setSelectGrade(e.target.value)
    }
    
  return (
    <FormControl sx={{ minWidth: "200px"}}>
    <InputLabel id="grade-selection-label">学年選択</InputLabel>
    <Select
      labelId="grade-selection-label"
      id="grade-selection"
      value={selectGrade}
      label="Age"
      onChange={handleChange}
      >
      {grade.map((elem,index)=>{
        return(
            <MenuItem  key={index} value={elem}>{elem}</MenuItem>
        )
      })}
    </Select>
  </FormControl>
  )
}
