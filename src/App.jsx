import { useEffect, useState } from "react";
import chroma from "chroma-js";
import copy from "clipboard-copy";
import toast, { Toaster } from "react-hot-toast";
import { GetColorName } from "hex-color-to-color-name";
import Controls from "./components/controls";
import Palette from "./components/palette";
import generateRandomPalette from "./fn";
import { debounce } from "lodash";
import html2canvas from "html2canvas";
import "./App.css";
import Header from "./components/header";
import PaletteImage from "./components/paletteImage";
import Export from "./components/export";
import Doc from "./components/doc";
import Loader from "./components/loader";

const App = () => {
  const colorSchemes = [
    "complementary",
    "analogous",
    "triadic",
    "tetradic",
    "split Complementary",
    "square",
    "monochromatic",
  ];

  const [loading, setLoading] = useState(true);

  const [color, setColor] = useState(
    chroma.hsl(
      Math.random() * 360,
      0.7 + Math.random() * 0.3,
      0.4 + Math.random() * 0.4
    )
  );

  const [colorsNum, setNum] = useState(5);

  const [method, setMethod] = useState("analogous");

  const [colorPalette, setColorPalette] = useState([]);

  const [avgColor, setAvgColor] = useState();

  const [exportActive, setExportState] = useState(false);

  // const handleSpace = debounce((event) => {
  //   if (event.key === " ") {
  //     generateBaseColors();
  //   }
  //   if (event.keyCode == 32 && event.target == document.body) {
  //     event.preventDefault();
  //   }
  // }, 100);

  const handleSpace = (event) => {
    if (event.key === " " && event.target == document.body) {
      event.preventDefault();
      generateBaseColors();
    }
  };

  const handleEscape = debounce((event) => {
    if (event.key === "Escape") {
      setExportState(false);
    }
  }, 100);

  const handleI = debounce((event) => {
    if (event.key === "+") {
      increment();
    }
  }, 100);

  const handleD = debounce((event) => {
    if (event.key === "-") {
      decrement();
    }
  }, 100);

  const handleS = debounce((event) => {
    if (event.key === "e" || event.key === "E") {
      exportState();
    }
  }, 100);

  useEffect(() => {
    window.addEventListener("keydown", handleSpace);
    window.addEventListener("keydown", handleEscape);
    window.addEventListener("keydown", handleI);
    window.addEventListener("keydown", handleD);
    window.addEventListener("keydown", handleS);

    return () => {
      window.removeEventListener("keydown", handleSpace);
      window.removeEventListener("keydown", handleEscape);
      window.removeEventListener("keydown", handleI);
      window.removeEventListener("keydown", handleD);
      window.removeEventListener("keydown", handleS);
    };
  }, []);

  useEffect(() => {
    let colorScale = generateRandomPalette(color, method, colorsNum, true);

    setColorPalette((prev) => {
      return colorScale.map((color, index) => {
        let newState = [...prev];

        newState[index] = newState[index] || {};

        let hexValue = chroma(color).hex();
        let newColor = {
          color: hexValue,
          name: GetColorName(hexValue.replace("#", "")),
          isLocked: false,
          isPickerActive: newState[index].isPickerActive,
        };

        newState[index] = newState[index].isLocked ? newState[index] : newColor;
        return newState[index];
      });
    });
  }, [method]);

  useEffect(() => {
    colorPalette && avgColor && setTimeout(() => setLoading(false), 1000);
  });

  useEffect(() => {
    const colorArray = colorPalette.map((c) => c.color);
    setAvgColor(() => {
      return colorArray.length > 0
        ? chroma.mix(chroma.average(colorArray).hex(), "fff", 0.8)
        : "white";
    });
  }, [colorPalette]);

  useEffect(() => {
    if (colorPalette.filter((c) => c.isLocked).length == colorsNum) {
      notify2();
      return;
    }

    let colorScale = generateRandomPalette(color, method, colorsNum, true);

    setColorPalette((prev) => {
      return colorScale.map((color, index) => {
        let newState = [...prev];

        newState[index] = newState[index] || {};

        let hexValue = chroma(color).hex();
        let newColor = {
          color: hexValue,
          name: GetColorName(hexValue.replace("#", "")),
          isLocked: false,
          isPickerActive: newState[index].isPickerActive,
        };

        newState[index] = newState[index].isLocked ? newState[index] : newColor;
        return newState[index];
      });
    });
  }, [color, colorsNum]);

  function handelClick(index) {
    setColorPalette((prev) => {
      let newState = [...prev];

      newState[index] = {
        ...prev[index],
        isLocked: !prev[index].isLocked,
      };

      return newState;
    });
  }

  function handelClickPicker(index) {
    setColorPalette((prev) => {
      let newState = [...prev];

      newState[index] = {
        ...prev[index],
        isPickerActive: !prev[index].isPickerActive,
      };

      return newState;
    });
  }

  function upDateColor(value, index) {
    setColorPalette((prev) => {
      let newState = [...prev];

      newState[index] = {
        ...prev[index],
        color: value,
        name: GetColorName(value.replace("#", "")),
      };

      return newState;
    });
  }

  const handleCopyClickP = async () => {
    const colorPaletteText = colorPalette
      .map((c) => `--${c.name.replace(" ", "-")} : ${c.color};`)
      .join("\n");
    try {
      await copy(colorPaletteText);
      notify3();
    } catch (err) {
      console.error("Failed to copy value to clipboard:", err);
    }
  };

  const handleCopyClick = async (value) => {
    try {
      await copy(value);
    } catch (err) {
      console.error("Failed to copy value to clipboard:", err);
    }
  };

  const notify = (hex) =>
    toast("HEX value copied to clipboard " + hex, {
      duration: 2000,
      position: "top-center",

      icon: "✅",
      style: {
        minWidth: "450px",
        borderRadius: "8px",
        boxShadow: `7.5px 7.3px 10px rgba(0, 0, 0, 0.045),
        60px 58px 80px rgba(0, 0, 0, 0.09)`,
      },

      iconTheme: {
        primary: "#2c2c2cs",
        secondary: "#fff",
      },
    });

  const notify2 = () =>
    toast("All colors are locked", {
      duration: 2000,
      position: "top-center",

      icon: "❌",
      style: {
        minWidth: "450px",
        borderRadius: "8px",
        boxShadow: `7.5px 7.3px 10px rgba(0, 0, 0, 0.045),
        60px 58px 80px rgba(0, 0, 0, 0.09)`,
      },

      iconTheme: {
        primary: "#2c2c2cs",
        secondary: "#fff",
      },
    });

  const notify3 = () =>
    toast("CSS variables were copied", {
      duration: 2000,
      position: "top-center",

      icon: "✅",
      style: {
        minWidth: "450px",
        borderRadius: "8px",
        boxShadow: `7.5px 7.3px 10px rgba(0, 0, 0, 0.045),
        60px 58px 80px rgba(0, 0, 0, 0.09)`,
      },

      iconTheme: {
        primary: "#2c2c2cs",
        secondary: "#fff",
      },
    });
  function generateBaseColors() {
    if (colorPalette.filter((c) => c.isLocked).length == colorsNum) {
      notify2();
      return;
    }
    setColor(
      chroma.hsl(
        Math.random() * 360,
        0.7 + Math.random() * 0.3,
        0.4 + Math.random() * 0.4
      )
    );
  }

  function increment() {
    setNum((prev) => (prev + 1 > 7 ? prev : prev + 1));
  }

  function decrement() {
    setNum((prev) => (prev - 1 < 2 ? prev : prev - 1));
  }

  function upDateMethod(mt) {
    setMethod(mt);
  }

  function paletteToPng() {
    const tpP = `<div class="paletteColors">
    ${colorPalette
      .map((c) => {
        return `
        <div class="paletteColors--color" style="background-color: ${c.color};">
          <div class="hex">${c.color}</div>
          <div class="name">${c.name}</div>
        </div>
      `;
      })
      .join("")}
</div>
`;

    const parser = new DOMParser();

    const doc = parser.parseFromString(tpP, "text/html");

    const element = doc.body.firstChild;

    document.body.appendChild(element);

    html2canvas(element)
      .then((canvas) => {
        const imgData = canvas.toDataURL("image/png");

        const downloadLink = document.createElement("a");

        downloadLink.href = imgData;

        downloadLink.download =
          "Cube chroma - " + colorPalette.map((c) => c.name).join("-") + ".png";

        document.body.appendChild(downloadLink);

        downloadLink.click();

        document.body.removeChild(downloadLink);
      })
      .then(() => {
        document.body.removeChild(element);
      });
  }

  function colorToPng(hex, name) {
    const tp = `<div class="img" style="background-color: ${hex};">
    
      <div class="hex" >${hex}</div>
      <div class="name">${name}</div>
    
  </div>
  `;

    const parser = new DOMParser();
    const doc = parser.parseFromString(tp, "text/html");
    const element = doc.body.firstChild;
    document.body.appendChild(element);
    console.log(hex, name);
    html2canvas(element)
      .then((canvas) => {
        const imgData = canvas.toDataURL("image/png");
        const downloadLink = document.createElement("a");
        downloadLink.href = imgData;
        downloadLink.download = "Cube Chroma - " + name + " - " + hex + ".png";
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
      })
      .then(() => {
        document.body.removeChild(element);
      });
  }

  function exportState() {
    setExportState(!exportActive);
  }

  return (
    <div>
      {loading ? (
        <Loader bgColor={avgColor} c={color} />
      ) : (
        <div className="container">
          {exportActive && (
            <Export
              colorPalette={colorPalette}
              paletteToPng={paletteToPng}
              exportState={exportState}
              handleCopyClickP={handleCopyClickP}
              bgColor={avgColor}
            />
          )}
          <Toaster />
          <Header color={colorPalette[0].color} bgColor={avgColor} />
          {/* <input
            type="color"
            value={color.hex()}
            onChange={(e) => setColor(chroma(e.target.value))}
          /> */}
          <Controls
            method={method}
            upDateMethod={upDateMethod}
            bgColor={avgColor}
            fn={generateBaseColors}
            increment={increment}
            decrement={decrement}
            colorsNum={colorsNum}
            exportState={exportState}
            colorPalette={colorPalette}
          />
          <Palette
            colorPalette={colorPalette}
            handelClick={handelClick}
            handelClickPicker={handelClickPicker}
            handleCopyClick={handleCopyClick}
            upDateColor={upDateColor}
            notify={notify}
            colorToPng={colorToPng}
          />
          <Doc color={color} bgColor={avgColor} />
        </div>
      )}
    </div>
  );
};
export default App;
