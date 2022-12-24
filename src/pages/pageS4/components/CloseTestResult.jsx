import React from "react";
import "../styles/closeTestResult.css";

export default function CloseTestResult({ setDispNo }) {
  return (
    <span className="closeTestResult">
      <input
        type="button"
        value="閉じる"
        onClick={() => {
          setDispNo(0);
        }}
      />
    </span>
  );
}
