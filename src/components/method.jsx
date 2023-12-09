import React, { useState } from "react";
import { motion } from "framer-motion";

export default function Method({ upDateMethod, method }) {
  const [isActive, setActive] = useState(false);

  return (
    <div className="methodSelector">
      <div
        className="selectedOption smallShadow"
        onClick={() => setActive(!isActive)}
        onBlur={() => setActive(!isActive)}
      >
        <span>{method}</span>
        <i
          className={
            isActive
              ? "fa-solid fa-caret-down rotate"
              : "fa-solid fa-caret-down"
          }
        ></i>
      </div>
      {isActive && (
        <motion.div
          initial={{ opacity: 0, y: "-50px" }}
          animate={{ opacity: 1, y: "0" }}
          exit={{ opacity: 0, y: "-50px" }}
          className="options"
        >
          <div
            className="option"
            onClick={() => {
              upDateMethod("analogous");
              setActive(false);
            }}
          >
            <span>analogous</span>
            {method == "analogous" && <i className="fa-solid fa-check"></i>}
          </div>
          <div
            className="option"
            onClick={() => {
              upDateMethod("complementary");
              setActive(false);
            }}
          >
            <span>complementary</span>
            {method == "complementary" && <i className="fa-solid fa-check"></i>}
          </div>
          <div
            className="option"
            onClick={() => {
              upDateMethod("monochromatic");
              setActive(false);
            }}
          >
            <span>monochromatic</span>
            {method == "monochromatic" && <i className="fa-solid fa-check"></i>}
          </div>
          <div
            className="option"
            onClick={() => {
              upDateMethod("split Complementary");
              setActive(false);
            }}
          >
            <span>split Complementary</span>
            {method == "split Complementary" && (
              <i className="fa-solid fa-check"></i>
            )}
          </div>
          <div
            className="option"
            onClick={() => {
              upDateMethod("square");
              setActive(false);
            }}
          >
            <span>square</span>
            {method == "square" && <i className="fa-solid fa-check"></i>}
          </div>
          <div
            className="option"
            onClick={() => {
              upDateMethod("triadic");
              setActive(false);
            }}
          >
            <span>triadic</span>
            {method == "triadic" && <i className="fa-solid fa-check"></i>}
          </div>
          <div
            className="option"
            onClick={() => {
              upDateMethod("tetradic");
              setActive(false);
            }}
          >
            <span>tetradic</span>
            {method == "tetradic" && <i className="fa-solid fa-check"></i>}
          </div>
        </motion.div>
      )}
    </div>
  );
}
