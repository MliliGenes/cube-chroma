import React from "react";

export default function Allcolors({ colorPalette }) {
  return (
    <div className="swatch smallShadow">
      {colorPalette.map((c, i) => (
        <div key={i} style={{ backgroundColor: c.color }}></div>
      ))}
    </div>
  );
}
