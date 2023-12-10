import React, { useState } from "react";
import Method from "./method";
import "react-tippy/dist/tippy.css";
import { Tooltip } from "react-tippy";
import { motion } from "framer-motion";
import Allcolors from "./allcolors";

export default function Controls({
  upDateMethod,
  method,
  bgColor,
  fn,
  increment,
  decrement,
  colorsNum,
  exportState,
  colorPalette,
}) {
  return (
    <motion.div
      animate={{ opacity: 1, y: 0 }}
      variants={{ opacity: 0, x: 0 }}
      className="controls bigShadow"
      style={{
        backgroundColor: bgColor,
      }}
    >
      <Allcolors colorPalette={colorPalette} />
      <Tooltip title="Update Method" position="top" theme="light" arrow={true}>
        <Method upDateMethod={upDateMethod} method={method} />
      </Tooltip>
      <Tooltip
        title="Increment steps ( + )"
        position="top"
        theme="light"
        arrow={true}
      >
        <div
          onClick={increment}
          className={
            colorsNum === 7
              ? "btn faded colorSteps smallShadow "
              : "btn  smallShadow colorSteps"
          }
        >
          <span>{colorsNum} Steps</span>
          <i className="fa-solid fa-plus"></i>
        </div>
      </Tooltip>
      <Tooltip
        title="Decrement steps ( - )"
        position="top"
        theme="light"
        arrow={true}
      >
        <div
          onClick={decrement}
          className={
            colorsNum === 2 ? "btn smallShadow faded" : "btn smallShadow"
          }
        >
          <i className="fa-solid fa-minus"></i>
        </div>
      </Tooltip>
      {/* <div className="btn smallShadow">
        <i className="fa-solid fa-rotate-left"></i>
      </div>
      <div className="btn smallShadow" >
        <i className="fa-solid fa-rotate-right"></i>
      </div> */}
      <Tooltip
        title="Generate ( spacebar )"
        position="top"
        theme="light"
        arrow={true}
      >
        <div onClick={fn} className="btn Shuffle smallShadow">
          <span>Generate</span>
          <i className="fa-solid fa-shuffle"></i>
        </div>
      </Tooltip>
      <Tooltip title="Export" position="top" theme="light" arrow={true}>
        <div className="btn Shuffle smallShadow" onClick={exportState}>
          <span>Export</span>
          <i className="fa-solid fa-file-arrow-down"></i>
        </div>
      </Tooltip>
    </motion.div>
  );
}
