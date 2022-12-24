import React, { useState } from "react";
import { Radio, RadioGroup, FormControlLabel } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function L1Login() {
  const [studentFlag, setStudentFlag] = useState(true);
  const changeValue = () => setStudentFlag((prev) => !prev);
  const navigate = useNavigate()

  const s1MenuDisplay = () =>{
    if(studentFlag){
      navigate("S1Menu")
    }else{
      navigate("T1Menu")
    }
  }

  return (
    <>
      <RadioGroup defaultValue="生徒" row>
        <FormControlLabel value="先生" control={<Radio />} label="先生" onChange={changeValue}/>
        <FormControlLabel value="生徒" control={<Radio />} label="生徒" onChange={changeValue}/>
      </RadioGroup>
      <input type="text" placeholder="ユーザーID" />
      <input type="text" placeholder="パスワード" />
      <button onClick={s1MenuDisplay}> ログイン　</button>
    </>
  );
}
