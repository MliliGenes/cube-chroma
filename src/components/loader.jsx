import React from "react";

export default function Loader({ bgColor, c }) {
  return (
    <div className="takeOver" style={{ "--bgColor": bgColor, "--c": c }}>
      <div class="spinner">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
}
