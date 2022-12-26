import React from 'react'
import {FormControl,InputLabel,Select,MenuItem} from "@mui/material"


export default function GradeSelection({selectQuestionAmount,setSelectQuestionAmount}) {

    const questionAmount = [1,2,3,4,5,6,7,8,9,10];
    const handleChange = (e)=>{
        setSelectQuestionAmount(e.target.value)
    }
    
  return (
    <FormControl sx={{ minWidth: "200px"}}>
    <InputLabel id="question-amount-selection-label">問題数選択</InputLabel>
    <Select
      labelId="question-amount-selection-label"
      id="question-amount-selection"
      value={selectQuestionAmount}
      label="question-amount"
      onChange={handleChange}
      >
      {questionAmount.map((elem,index)=>{
        return(
            <MenuItem  key={index} value={elem}>{elem}</MenuItem>
        )
      })}
    </Select>
  </FormControl>
  )
}
