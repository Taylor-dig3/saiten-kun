// import React, { useEffect, useState, useRef } from "react";
// import { Radio, RadioGroup, FormControlLabel,Button } from "@mui/material";
// import VisibilityIcon from "@mui/icons-material/Visibility";
// import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
// import { useNavigate } from "react-router-dom";
// import { login } from "../../shareComponents/atom";
// import { useRecoilState, useRecoilValue } from "recoil";
// import "./L1Login.css";
// import axios from "axios";

// export default function L1Login() {
//   const initialLoginValues = { userId: "", password: "" };
//   const [formValues, setFormValues] = useState(initialLoginValues);
//   const [formErrors, setFormErrors] = useState({});
//   const [isSubmit, setIsSubmit] = useState(false);
//   const [isRevealPassword, setIsRevealPassword] = useState(false);
//   const [loginStatus, setLoginStatus] = useState("ログイン中です");
//   const [loginInfo, setLoginInfo] = useRecoilState(login);

//   const [studentFlag, setStudentFlag] = useState(true);
//   const navigate = useNavigate();
//   const changeValue = () => setStudentFlag((prev) => !prev);

//   const isFirstRender = useRef(false);
//   const togglePassword = () => {
//     setIsRevealPassword((prevState) => !prevState);
//   };

//   const formChange = (e) => {
//     const { name, value } = e.target;
//     // console.log(e.target);
//     setFormValues({ ...formValues, [name]: value });
//   };
//   const validate = (values) => {
//     const errors = {};
//     if (!values.userId) {
//       errors.userId = "ユーザー名を入力してください";
//     }
//     if (!values.password) {
//       errors.password = "パスワードを入力してください";
//     } else if (values.password.length < 4) {
//       errors.password = "4文字以上、15文字以下のパスワードを入力してください";
//     } else if (values.password.length > 15) {
//       errors.password = "4文字以上、15文字以下のパスワードを入力してください";
//     }
//     if (Object.keys(errors).length === 0) {
//       errors.validateOkFlag = true;
//     }
//     return errors;
//   };

//   const formSubmit = (e) => {
//     e.preventDefault();
//     setFormErrors(validate(formValues));
//     setIsSubmit(true);
//   };

//   useEffect(() => {
//     if (formErrors.validateOkFlag) {
//       console.log(formValues);
//       axios
//         .post("/login", {
//           user_id: formValues.userId,
//           password: formValues.password,
//           student_flg: studentFlag,
//         })
//         .then((res) => {
//           console.log(res.data);
//           if (res.data.login_state === "studentLogin") {
//             setLoginInfo({
//               userId: res.data.user_id,
//               name: res.data.name,
//               loginState: res.data.login_state,
//             });
//           } else if (res.data.login_state === "teacherLogin") {
//             setLoginInfo({
//               userId: res.data.user_id,
//               name: res.data.name,
//               loginState: res.data.login_state,
//             });
//           } else {
//             setLoginInfo({
//               userId: null,
//               name: null,
//               loginState: "notYetLoggedIn",
//             });
//           }
//         });
//     }
//   }, [formErrors]);

//   useEffect(() => {
//     if (isFirstRender.current) {
//       if (loginInfo.loginState === "studentLogin") {
//         navigate("S1Menu");
//       } else if (loginInfo.loginState === "teacherLogin") {
//         navigate("T1Menu");
//       } else {
//         setLoginStatus("ログイン失敗");
//       }
//     }
//   }, [loginInfo]);

//   useEffect(() => {
//     isFirstRender.current = true;
//   }, []);
//   return (
//     <div className="T1-container">
//       <div className="logo-container">
//         <img src="./img/risu.png" className="saitenkun-risu" />
//         <img src="./img/saitenkunzidake.png" className="saitenkun-logo" />
//       </div>
//       <Button variant="contained" size="x-large">
//           ログイン
//         </Button> 

//     </div>
//   );
// }


import "./styles.css";
import "./L1Login.css";

import { Suspense, useState } from "react";
import { motion, MotionConfig, useMotionValue } from "framer-motion";
import { Shapes } from "./Shapes";
import { transition } from "./settings";
import useMeasure from "react-use-measure";

import LoginModal from "./components/LoginModal"
export default function L1Login() {
  const [ref, bounds] = useMeasure({ scroll: false });
  const [isHover, setIsHover] = useState(false);
  const [isPress, setIsPress] = useState(false);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const [isLoginModal,setIsLoginModal] = useState(false)

  const resetMousePosition = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <div className="T1-container">
    <div className="logo-container">
        <img src="./img/risu.png" className="saitenkun-risu" />
        <img src="./img/saitenkunzidake.png" className="saitenkun-logo" />
        <img src="./img/risu2.png" className="saitenkun-risu" />

      </div>
      <div className="T1-login-button-container">

    <MotionConfig transition={transition}>
      <motion.button
      className="T1-login-button"
      ref={ref}
      initial={false}
      animate={isHover ? "hover" : "rest"}
      whileTap="press"
      variants={{
        rest: { scale: 1 },
        hover: { scale: 1.5 },
        press: { scale: 1.4 }
      }}
      onHoverStart={() => {
        resetMousePosition();
        setIsHover(true);
      }}
      onHoverEnd={() => {
        resetMousePosition();
        setIsHover(false);
      }}
      onTapStart={() => setIsPress(true)}
      onTap={() => setIsPress(false)}
      onTapCancel={() => setIsPress(false)}
      onPointerMove={(e) => {
        mouseX.set(e.clientX - bounds.x - bounds.width / 2);
        mouseY.set(e.clientY - bounds.y - bounds.height / 2);
      }}
      onClick={()=>setIsLoginModal(true)}
      >
        <motion.div
          className="shapes"
          variants={{
            rest: { opacity: 0 },
            hover: { opacity: 1 }
          }}
          >
          <div className="pink blush" />
          <div className="blue blush" />
          <div className="container">
            <Suspense fallback={null}>
              <Shapes
                isHover={isHover}
                isPress={isPress}
                mouseX={mouseX}
                mouseY={mouseY}
                />
            </Suspense>
          </div>
        </motion.div>
        <motion.div
          variants={{ hover: { scale: 0.85 }, press: { scale: 1.1 } }}
          className="label"
          >
          ログイン
        </motion.div>
      </motion.button>
    </MotionConfig>
          </div>
{isLoginModal? <LoginModal setIsLoginModal={setIsLoginModal}/>:<></>}
          </div>
  );
}












