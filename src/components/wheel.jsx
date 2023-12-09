import React, { useState, useEffect } from "react";
import "react-color/react-color";

export default function ColorWheel({ colors }) {
  const [selectedColor, setSelectedColor] = useState(colors[0]);

  useEffect(() => {
    const wheelEl = document.querySelector(".color-wheel");
    wheelEl.addEventListener("click", (e) => {
      setSelectedColor(e.target.offsetWidth);
    });
  }, [colors]);

  return (
    <div className="color-wheel">
      {colors.map((color, index) => (
        <div
          key={index}
          className={`color-segment ${
            color === selectedColor ? "selected" : ""
          }`}
          style={{ width: color === selectedColor ? 100 : 0 }}
        >
          {color}
        </div>
      ))}
    </div>
  );
}

ColorWheel.propTypes = {
  colors: React.PropTypes.arrayOf(React.PropTypes.string).isRequired,
};
