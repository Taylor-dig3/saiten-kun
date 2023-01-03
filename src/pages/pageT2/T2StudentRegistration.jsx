import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Modal from "react-modal";
import axios from "axios";
import { login } from "../../shareComponents/atom";
import { useRecoilValue } from "recoil";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import StudentListModal from "./components/StudentListModal";
import StatusSnackbar from "./components/StatusSnackbar";
import "./T2StudentRegistration.css";

const customStyles = {
  content: {
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
  const [isRevealPassword, setIsRevealPassword] = useState(false);
  const loginInfo = useRecoilValue(login);

  const closeModal = () => setEditModalIsOpen(false);
  const [isRegisterSnackbar, setIsRegisterSnackbar] = useState(false);
  const [isSuccessFlag, setIsSuccessFlag] = useState(true);
  const [isChangePassSnackbar, setIsChangePassSnackbar] = useState(false);
  
  const formChange = (e) => {
    // console.log("入ったよ");
    const { name, value } = e.target;
    console.log(e.target.value);
    setFormValues({ ...formValues, [name]: value });
  };

  const validate = (values) => {
    const errors = {};
    // console.log(values);
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
          // console.log(res);
          const formElem = document.getElementById("register-form");
          formElem.reset();
          setFormValues(initialRegisterValues);
          console.log(formElem);
          setIsRegisterSnackbar(true);
        });
    }
  }, [formErrors]);

  const formSubmit = (e) => {
    e.preventDefault();
    console.log(formValues);
    setFormErrors(validate(formValues));

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
                // autocomplete="off"
                onInput={(e) => formChange(e)}
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
                // autocomplete="off"
                onInput={(e) => formChange(e)}
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
          </div>
        </form>
      </div>

      <button onClick={t1MenuDisplay}>戻る</button>
      <StatusSnackbar isSnackbar={isRegisterSnackbar} setIsSnackbar={setIsRegisterSnackbar} isSuccessFlag={isSuccessFlag} successWord ={"生徒の新規登録が完了しました！"}/>
      <StatusSnackbar isSnackbar={isChangePassSnackbar} setIsSnackbar={setIsChangePassSnackbar} isSuccessFlag={isSuccessFlag} successWord ={"パスワードの変更が完了しました！"}/>

      <Modal
        isOpen={editModalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        appElement={document.getElementById("root") || undefined}
      >
        <StudentListModal
          setStudentTable={setStudentTable}
          studentTable={studentTable}
          setIsSnackbar={setIsChangePassSnackbar}
          setIsSuccessFlag={setIsSuccessFlag}
        />
      </Modal>
    </>
  );
}
