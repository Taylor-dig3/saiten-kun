import React, { useEffect, useState } from 'react'
import { login, testList, testResult } from "../../../shareComponents/atom";
import { useRecoilValue, useRecoilState } from "recoil";
export default function StatusMessage({testStatus}) {
    const testInfo = useRecoilValue(testList);

    const [message,setMessage] = useState("※現在テストは実施されていません")
    useEffect(()=>{
       
       if(testStatus.statusWord === "テスト開始中"){

           const selectTest = testInfo.filter((elem)=>{
               return elem.test_id === Number(testStatus.testId)
            })
            console.log(testInfo)
            console.log(testStatus)
            console.log(selectTest)
            if(selectTest.length > 0){
                setMessage(`※現在${selectTest[0].grade}年生向けの${selectTest[0].subject}の「${selectTest[0].title}」が実施中です`)
            }
        }else if(testStatus.statusWord === "テスト開始"){
            setMessage("※現在テストは実施されていません")
        }
    },[testStatus])
  return (
    <div className='T5-status-message'>{message}</div>
  )
}
