import React, { useEffect, useState } from "react";
import { Radio, RadioGroup, FormControlLabel } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { useNavigate } from "react-router-dom";
import { login } from "../../shareComponents/atom";
import { useRecoilState, useR } from "recoil";
import "./L1Login.css";
import axios from "axios";

export default function L1Login() {
  const initialLoginValues = { userId: "", password: "" };
  const [formValues, setFormValues] = useState(initialLoginValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [isRevealPassword, setIsRevealPassword] = useState(false);
  const [loginStatus, setLoginStatus] = useState("ログイン中です");
  const [loginInfo, setLoginInfo] = useRecoilState(login);

  const [studentFlag, setStudentFlag] = useState(true);
  const navigate = useNavigate();
  const changeValue = () => setStudentFlag((prev) => !prev);

  const togglePassword = () => {
    setIsRevealPassword((prevState) => !prevState);
  };

  const formChange = (e) => {
    const { name, value } = e.target;
    console.log(e.target);
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
    //ログイン情報を送信する
    //バリデーションチェックをする
    setFormErrors(validate(formValues));
    setIsSubmit(true);
  };

  useEffect(() => {
    if (formErrors.validateOkFlag) {
      //ログインをAPIで投げる処理
      //axiosを使用してサーバー側にAPIを投げる

      //ログインができた場合、setLoginInfo でステートを変更する。
      //setLoginInfo({userId:APIから変えてきたID,loginState:APIから返ってきたログインステータス})
      //ログインステータス詳細
      //先生ログイン成功　= “teacherLogin”
      //生徒ログイン成功　= “studentLogin”
      //未ログイン（ログイン失敗またはログイン前）= “notYetLoggedIn”
      // setLoginInfo({userId:"null",loginState:"notYetLoggedIn"})

      axios
        .post("/loginMock", {
          user_id: formValues.userId,
          password: formValues.password,
          student_flg: studentFlag,
        })
        .then((res) => {
          console.log(res.data);
          if (res.data.login_state === "studentLogin") {
            setLoginInfo({
              userId: res.data.user_id,
              name: res.data.name,
              loginState: res.data.login_state,
            });
            navigate("S1Menu");
          } else if (res.data.login_state === "teacherLogin") {
            setLoginInfo({
              userId: res.data.user_id,
              name: res.data.name,
              loginState: res.data.login_state,
            });
            navigate("T1Menu");
          } else {
            setLoginInfo({
              userId: null,
              name: null,
              loginState: "notYetLoggedIn",
            });
          }
        });
      // console.log(formValues);
      // if (studentFlag) {
      //   setLoginInfo({ userId: "0000", loginState: "studentLogin" });
      //   navigate("S1Menu");
      // } else {
      //   setLoginInfo({ userId: "0000", loginState: "teacherLogin" });
      //   navigate("T1Menu");
      // }
    }
  }, [formErrors]);

  return (
    <>
      <div className="form-container">
        <form onSubmit={(e) => formSubmit(e)}>
          <h1 className="login-form-name">ログインしてください</h1>
          <hr />
          <RadioGroup defaultValue="生徒" row>
            <FormControlLabel
              value="先生"
              control={<Radio />}
              label="先生"
              onChange={changeValue}
            />
            <FormControlLabel
              value="生徒"
              control={<Radio />}
              label="生徒"
              onChange={changeValue}
            />
          </RadioGroup>
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
    </>
  );
}
