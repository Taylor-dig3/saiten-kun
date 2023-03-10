import React, { useEffect, useState, useRef } from "react";
import { Radio, RadioGroup, FormControlLabel,Button } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import IconButton from "@mui/material/IconButton";
import { useNavigate } from "react-router-dom";
import { login } from "../../../shareComponents/atom";
import { useRecoilState, useRecoilValue } from "recoil";
import "../L1Login.css";
import axios from "axios";

export default function LoginModal({setIsLoginModal}) {
  const initialLoginValues = { userId: "", password: "" };
  const [formValues, setFormValues] = useState(initialLoginValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [isRevealPassword, setIsRevealPassword] = useState(false);
  const [loginStatus, setLoginStatus] = useState("ログイン中です");
  const [loginInfo, setLoginInfo] = useRecoilState(login);

  const [studentFlag, setStudentFlag] = useState(true);
  const navigate = useNavigate();
  const changeValue = () =>{
    const selectedElem = document.querySelector("#L1-selected-button")
    selectedElem.id = ""
    const notSelectedElem =document.querySelector("#L1-not-selected-button")
    notSelectedElem.id ="L1-selected-button"
    selectedElem.id = "L1-not-selected-button"

    setStudentFlag((prev) => !prev);
  } 

  const isFirstRender = useRef(false);
  const togglePassword = () => {
    setIsRevealPassword((prevState) => !prevState);
  };

  const formChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };
  const validate = (values) => {
    const errors = {};
    if (!values.userId) {
      errors.userId = "ユーザー名を入力してください";
    }
    if (!values.password) {
      errors.password = "パスワードを入力してください";
    } else if (values.password.length < 4) {
      errors.password = "4文字以上、15文字以下のパスワードを入力してください";
    } else if (values.password.length > 15) {
      errors.password = "4文字以上、15文字以下のパスワードを入力してください";
    }
    if (Object.keys(errors).length === 0) {
      errors.validateOkFlag = true;
    }
    return errors;
  };

  const formSubmit = (e) => {
    e.preventDefault();
    setFormErrors(validate(formValues));
    setIsSubmit(true);
  };

  useEffect(() => {
    if (formErrors.validateOkFlag) {
      axios
        .post("/login", {
          user_id: formValues.userId,
          password: formValues.password,
          student_flg: studentFlag,
        })
        .then((res) => {
          if (res.data.login_state === "studentLogin") {
            setLoginInfo({
              userId: res.data.user_id,
              name: res.data.name,
              loginState: res.data.login_state,
              grade: res.data.grade
            });
          } else if (res.data.login_state === "teacherLogin") {
            setLoginInfo({
              userId: res.data.user_id,
              name: res.data.name,
              loginState: res.data.login_state,
            });
          } else {
            setLoginInfo({
              userId: null,
              name: null,
              loginState: "notYetLoggedIn",
            });
          }
        });
    }
  }, [formErrors]);

  useEffect(() => {
    if (isFirstRender.current) {
      if (loginInfo.loginState === "studentLogin") {
        navigate("S1Menu");
      } else if (loginInfo.loginState === "teacherLogin") {
        navigate("T1Menu");
      } else {
        setLoginStatus("ログイン失敗");
      }
    }
  }, [loginInfo]);

  useEffect(() => {
    isFirstRender.current = true;
  }, []);
  return (
  <div className="form-container">
        <form onSubmit={(e) => formSubmit(e)}>
          <IconButton className="L1-form-close-button" onClick={()=>setIsLoginModal(false)}>
    <HighlightOffIcon  sx={{ fontSize: 35 }}/>
          </IconButton>
          <h1 className="login-form-name">ログインしてください</h1>
          <hr />
            <div className="L1-select-button-container">

            <button type="button" onClick={changeValue} className={"L1-select-button"} id="L1-not-selected-button">先生</button>
            <button type="button" onClick={changeValue} className={"L1-select-button"} id="L1-selected-button">生徒</button>
            </div>
            
          <div className="ui-form">
            <div className="form-field">
              <label> ユーザーID</label>
              <input
                type="text"
                placeholder="ユーザーID"
                name="userId"
                className="login-form-input-userId"
                onChange={(e) => formChange(e)}
              />
            </div>
            <p className="login-error-msg">{formErrors.userId}</p>
            <div className="form-field">
              <label> パスワード</label>
              <div className="login-form-input-password-container">
                <input
                  type={isRevealPassword ? "text" : "password"}
                  placeholder="パスワード"
                  name="password"
                  className="login-form-input-password"
                  onChange={(e) => formChange(e)}
                />

                {isRevealPassword ? (
                  <VisibilityOffIcon
                    onClick={() => setIsRevealPassword(false)}
                    className="password-visual"
                  />
                ) : (
                  <VisibilityIcon
                    onClick={() => setIsRevealPassword(true)}
                    className="password-visual"
                  />
                )}
              </div>
            </div>
            <p className="login-error-msg">{formErrors.password}</p>

            <button className="login-button">ログイン</button>
            {formErrors.validateOkFlag && isSubmit && (
              <div className="login-status">{loginStatus}</div>
            )}
          </div>
        </form>
      </div> 
  );
}
