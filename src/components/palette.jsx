import React, { useState } from "react";
import { Toaster } from "react-hot-toast";
import { motion } from "framer-motion";
import { HexColorPicker } from "react-colorful";

export default function Palette({
  colorPalette,
  handelClick,
  handelClickPicker,
  handleCopyClick,
  upDateColor,
  notify,
  colorToPng,
}) {
  return (
    <div className="palette">
      {colorPalette.map((element, index) => (
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -10 }}
          transition={{ duration: 0.3 }}
          key={index}
          style={{
            backgroundColor: element.color,
          }}
          className="color bigShadow"
        >
          <div className="info">
            <span className="smallShadow">
              {element.color.replace("#", "")}
            </span>
            <p className="smallShadow">{element.name}</p>
          </div>

          {element.isPickerActive && (
            <motion.div
              initial={{ opacity: 0, y: "50px" }}
              animate={{ opacity: 1, y: "0" }}
              exit={{ opacity: 0, y: "50px" }}
              className="colorPicker smallShadow"
            >
              <HexColorPicker
                color={element.color}
                onChange={(color) => {
                  upDateColor(color, index);
                }}
              />
            </motion.div>
          )}

          <div className="actions">
            <i
              className="fa-solid fa-eye-dropper smallShadow"
              onClick={() => handelClickPicker(index)}
            ></i>

            <i
              onClick={() => {
                colorToPng(element.color, element.name);
              }}
              className="fa-solid fa-download smallShadow"
            ></i>
            <i
              onClick={() => {
                handleCopyClick(element.color);
                notify(element.color);
              }}
              className="fa-solid fa-copy smallShadow"
            ></i>
            <i
              onClick={() => handelClick(index)}
              className={`fa-solid smallShadow ${
                element.isLocked ? "fa-lock" : "fa-lock-open"
              }`}
              style={{}}
            ></i>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
