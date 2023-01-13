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
    <div className="L1-container">
    <div className="logo-container">
        <img src="./img/risu.png" className="saitenkun-risu" />
        <img src="./img/saitenkunzidake.png" className="saitenkun-logo" />
        <img src="./img/risu2.png" className="saitenkun-risu" />

      </div>
      <div className="L1-login-button-container">

    <MotionConfig transition={transition}>
      <motion.button
      className="L1-login-button"
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












