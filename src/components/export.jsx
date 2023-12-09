import React from "react";
import { motion } from "framer-motion";

export default function Export({
  colorPalette,
  paletteToPng,
  exportState,
  handleCopyClickP,
  bgColor,
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -50 }}
      transition={{ duration: 0.3 }}
      className="export"
      onClick={() => {
        exportState();
      }}
    >
      <div className="wrapper" onClick={(e) => e.stopPropagation()}>
        <pre className="css" style={{ backgroundColor: bgColor }}>
          {colorPalette.map((c, i) => (
            <p key={i}>
              <span
                style={{
                  display: "inline-block",
                  backgroundColor: c.color,
                  width: "10px",
                  height: "10px",
                  borderRadius: "50%",
                  marginRight: "10px",
                }}
              ></span>
              --{c.name.replace(" ", "-")} : {c.color};
            </p>
          ))}
        </pre>
        <div className="actions" style={{ backgroundColor: bgColor }}>
          <div className="btn" onClick={handleCopyClickP}>
            Copy CSS variables
          </div>
          <div className="btn" onClick={paletteToPng}>
            Export image
          </div>
        </div>
      </div>
    </motion.div>
  );
}
