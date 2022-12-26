import React from "react";
import "../S4TestCheck.css";

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
