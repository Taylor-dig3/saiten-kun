import React from 'react'
import {FormControl,InputLabel,Select,MenuItem} from "@mui/material"


export default function  SubjectSelection({selectSubject,setSelectSubject}) {

    const Subject = ["算数","国語","社会","理科","英語"];
    const handleChange = (e)=>{
        setSelectSubject(e.target.value)
    }
    
  return (
    <FormControl sx={{ minWidth: "200px"}}>
    <InputLabel id="Subject-selection-label">学年選択</InputLabel>
    <Select
      labelId="Subject-selection-label"
      id="Subject-selection"
      value={selectSubject}
      label="Subject"
      onChange={handleChange}
      >
      {Subject.map((elem,index)=>{
        return(
            <MenuItem  key={index} value={elem}>{elem}</MenuItem>
        )
      })}
    </Select>
  </FormControl>
  )
}
