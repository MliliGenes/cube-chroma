import React from "react";

export default function PaletteImage({ colorPalette }) {
  return (
    <div className="paletteConatiner">
      {colorPalette.map((color) => (
        <div
          className="paletteConatiner-color"
          style={{ backgroundColor: color.color }}
        >
          <div className="hex">{color.color}</div>
          <div className="name">{color.name}</div>
        </div>
      ))}
    </div>
  );
}
