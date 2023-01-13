import axios from "axios";
import React,{useEffect} from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import { login, testList } from "../../shareComponents/atom";
import LogoutButton from "../../shareComponents/LogoutButton";
import "./T1Menu.css"
export default function T1Menu() {
  const navigate = useNavigate();
  const loginInfo = useRecoilValue(login);
  const [testInfo, setTestInfo] = useRecoilState(testList);

  const t2StudentRegistrationDisplay = () => {
    navigate("../T2StudentRegistration");
  };
  const t3TestCreate = () => {
    navigate("../T3TestCreate");
  };

  const t5TestList = () => {
    console.log(loginInfo.userId);
    axios
      .get("/teacherTests", {
        params: { teacher_id: loginInfo.userId },
      })
      .then((res) => {
        console.log("t5pe-zi");
        console.log(res.data);
        setTestInfo(res.data);
        navigate("../T5TestList");
      });
  };

  useEffect(() => {
    if(loginInfo.loginState === "notYetLoggedIn"){
     navigate("../")
    }
     }, []);

  return (
    <div className="T1-container">
      <div className="T1-title">先生メニュー画面</div>
      <button onClick={t2StudentRegistrationDisplay} className={"T1-button"}>新規生徒登録</button>
      <button className={"T1-button"}>新規先生登録</button>
      <button onClick={t3TestCreate} className={"T1-button"}>テスト作成</button>
      <button onClick={t5TestList} className={"T1-button"}>テスト一覧</button>
      <LogoutButton />
    </div>
  );
}
