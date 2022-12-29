import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Modal from "react-modal";
import axios from "axios";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { login } from "../../shareComponents/atom";
import { useRecoilState } from "recoil";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import "./T2StudentRegistration.css";
import StudentListModal from "./components/StudentListModal";
import { useForm } from "react-hook-form";
const customStyles = {
  content: {
    // top: "30%",
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    // marginRight: "-20%",
    transform: "translate(-50%, -50%)",
    minWidth: "70%",
    maxWidth: "70%",
    minHeight: "70%",
    maxHeight: "70%",
  },
};
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function T2StudentRegistration() {
  const [editModalIsOpen, setEditModalIsOpen] = useState(false);
  const [studentTable, setStudentTable] = useState([]);
  const navigate = useNavigate();
  const t1MenuDisplay = () => {
    navigate("../T1Menu");
  };

  const displayStudentsList = async () => {
    console.log("object");

    console.log(studentTable);
    setEditModalIsOpen(true);
  };
  const initialRegisterValues = { userName: "", password: "", grade_id: "" };
  const [formValues, setFormValues] = useState(initialRegisterValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [isRevealPassword, setIsRevealPassword] = useState(false);
  const [loginStatus, setLoginStatus] = useState("ログイン中です");
  const [loginInfo, setLoginInfo] = useRecoilState(login);

  const closeModal = () => setEditModalIsOpen(false);
  const [isSnackbar, setIsSnackbar] = useState(false);
  const [isSuccessFlag, setIsSuccessFlag] = useState(true);
  const closeSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setIsSnackbar(false);
  };

  const formChange = (e) => {
    const { name, value } = e.target;
    console.log(e.target);
    setFormValues({ ...formValues, [name]: value });
  };
  const validate = (values) => {
    const errors = {};
    console.log(values);
    if (!values.userName) {
      errors.userName = "ユーザー名を入力してください";
    }
    if (!values.grade) {
      errors.grade = "学年を入力してください";
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

  useEffect(() => {
    if (formErrors.validateOkFlag) {
      axios
        .post("/student", {
          name: formValues.userName,
          grade_id: formValues.grade,
          teacher_id: loginInfo.userId,
          password: formValues.password,
        })
        .then((res) => {
          console.log(res);
          const formElem = document.getElementById("register-form");
          formElem.reset();
          setFormValues(initialRegisterValues);
          console.log(formElem);
        });
    }
  }, [formErrors]);

  const formSubmit = (e) => {
    e.preventDefault();
    //ログイン情報を送信する
    //バリデーションチェックをする
    setFormErrors(validate(formValues));
    setIsSubmit(true);
    setIsSnackbar(true);
    
  };
  return (
    <>
      <div className="form-container">
        <form id="register-form" onSubmit={(e) => formSubmit(e)}>
          <h1 className="register-form-name">生徒新規登録</h1>
          <hr />
          <div className="student-register-ui-form">
            <div className="form-field">
              <label> 名前</label>
              <input
                type="text"
                placeholder="フルネームで入力"
                name="userName"
                className="register-form-input-userName"
                onChange={(e) => formChange(e)}
              />
            </div>
            <p className="register-error-msg">{formErrors.userName}</p>
            <div className="form-field">
              <label> 学年</label>
              <input
                type="number"
                min="1"
                max="6"
                placeholder="1~6を入力"
                name="grade"
                className="register-form-input-grade"
                onChange={(e) => formChange(e)}
              />
            </div>
            <p className="register-error-msg">{formErrors.grade}</p>
            <div className="form-field">
              <label> パスワード</label>
              <div className="register-form-input-password-container">
                <input
                  type={isRevealPassword ? "text" : "password"}
                  placeholder="英数字4〜15桁で入力"
                  name="password"
                  className="register-form-input-password"
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
            <p className="register-error-msg">{formErrors.password}</p>

            <button className="register-button">登録</button>
            <button
              type="button"
              className="register-button"
              onClick={displayStudentsList}
            >
              生徒一覧表示
            </button>
            <button
              type="button"
              className="register-button"
              onClick={t1MenuDisplay}
            >
              戻る
            </button>
            {/* {formErrors.validateOkFlag && isSubmit && (
              <div className="register-status">{loginStatus}</div>
            )} */}
          </div>
        </form>
      </div>

      <button onClick={t1MenuDisplay}>戻る</button>
      <Snackbar
        open={isSnackbar}
        autoHideDuration={6000}
        onClose={closeSnackbar}
        // message="Note archived"
        // action={action}
      >
        {isSuccessFlag ? (
          <Alert
            onClose={closeSnackbar}
            severity="success"
            sx={{ width: "100%" }}
          >
            {isSubmit?"生徒の新規登録が完了しました！":"パスワードの変更が完了しました！"}
          </Alert>
        ) : (
          <Alert
            onClose={closeSnackbar}
            severity="error"
            sx={{ width: "100%" }}
          >
            パスワードは英数字4桁以上15桁以下にしてください
          </Alert>
        )}
      </Snackbar>
      <Modal
        isOpen={editModalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        appElement={document.getElementById("root") || undefined}
      >
        <StudentListModal
          setStudentTable={setStudentTable}
          studentTable={studentTable}
          setIsSnackbar={setIsSnackbar}
          setIsSuccessFlag={setIsSuccessFlag}
        />
      </Modal>
    </>
  );
}
