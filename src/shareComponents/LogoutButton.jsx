import React from "react";
import { login } from "./atom";
import { useRecoilState } from "recoil";
import { useNavigate } from "react-router-dom";
import "./LogoutButton.css"

export default function LogoutButton() {
  const [loginInfo, setLoginInfo] = useRecoilState(login);
  const navigate = useNavigate();


const logout = ()=>{
    setLoginInfo({userId:null,loginState:"notYetLoggedIn"})
    navigate("../");
}

  return (
  <>
  <button onClick={logout} className="logout-button">
    ログアウト
  </button>
  </>
    
    
    );
}
