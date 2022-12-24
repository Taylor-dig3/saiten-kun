import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
// import "../styles/styles.css";
// import TestLists from "./TestLists";
import { useState } from "react";
// import TestResult from "./TestResult";
// import Test from "./Test";
import L1Login from "./pages/pageL1/L1Login";
import S1Menu from "./pages/pageS1/S1Menu";
import S2Test from "./pages/pageS2/S2Test";
import S3ResultList from "./pages/pageS3/S3ResultList";
// import S4TestCheck from "./pages/pageS4/S4TestCheck";
import T1Menu from "./pages/pageT1/T1Menu";
import T2StudentRegistration from "./pages/pageT2/T2StudentRegistration";
import T3TestCreate from "./pages/pageT3/T3TestCreate";
import T4ConfirmationCreatedTest from "./pages/pageT4/T4ConfirmationCreatedTest";
import T5TestList from "./pages/pageT5/T5TestList";
import T6ResultCheck from "./pages/pageT6/T6ResultCheck";

export default function App() {
  const [dispNo, setDispNo] = useState(0);
  const [currentAnswer, setCurrentAnswer] = useState({});
  const [currentTestID, setCurrentTestID] = useState("0");
  const [paper, setPaper] = useState([{}]);
  const [student_ID, setStudent_ID] = useState(-1);

  return (
    <BrowserRouter>
      <Routes>
      <Route path="/" element={<L1Login />} />
      <Route path="/S1Menu" element={<S1Menu />} />
      <Route path="/S2Test" element={<S2Test/>} />
      <Route path="/S3ResultList" element={<S3ResultList />} />
      {/* <Route path="/S4TestCheck" element={<S4TestCheck />} /> */}
      <Route path="/T1Menu" element={<T1Menu />} />
      <Route path="/T2StudentRegistration" element={<T2StudentRegistration />} />
      <Route path="/T3TestCreate" element={<T3TestCreate />} />
      <Route path="/T4ConfirmationCreatedTest" element={<T4ConfirmationCreatedTest />} />
      <Route path="/T5TestList" element={<T5TestList />} />
      <Route path="/T6ResultCheck" element={<T6ResultCheck />} />


      </Routes>
    </BrowserRouter>
  );
}
