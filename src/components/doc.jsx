import React from "react";
import generateRandomPalette from "../fn";

export default function Doc({ color, bgColor }) {
  const colorGenerationAlgorithms = [
    {
      name: "analogous",
      description:
        "Typically produces 3 colors: the base color and its two neighboring colors.",
      recommendedSteps: [3, 4, 5],
    },
    {
      name: "complementary",
      description:
        "Produces 2 colors: the base color and its complementary color.",
      recommendedSteps: [2],
    },
    {
      name: "split Complementary",
      description:
        "Results in 3 colors: the base color, its complementary color, and one additional color adjacent to the complementary color.",
      recommendedSteps: [3, 4, 5],
    },
    {
      name: "square",
      description:
        "Generates 4 colors: the base color and three other colors forming a square around the color wheel.",
      recommendedSteps: [4, 5, 6],
    },
    {
      name: "monochromatic",
      description:
        "Typically produces multiple shades and tones of a single color based on variations in intensity, brightness, or saturation.",
      recommendedSteps: [3, 4, 5, 6, 7],
    },
    {
      name: "triadic",
      description:
        "Generates 3 colors: the base color and two other colors evenly spaced around the color wheel.",
      recommendedSteps: [3, 4, 5],
    },
    {
      name: "tetradic",
      description:
        "Produces 4 colors: the base color and three other colors evenly spaced around the color wheel.",
      recommendedSteps: [4, 5, 6],
    },
  ];
  return (
    <div className="doc">
      {colorGenerationAlgorithms.map((algo) => {
        let colorSchem = generateRandomPalette(color, algo.name, 7, false);
        return (
          <div
            className="algo bigShadow"
            style={{ backgroundColor: bgColor }}
            key={algo.color}
          >
            <div>
              <h1>{algo.name}</h1>
              <div className="minSwatch smallShadow">
                {colorSchem.map((c, i) => (
                  <div key={i} style={{ backgroundColor: c }}></div>
                ))}
              </div>
            </div>
            <p>{algo.description}</p>
            <span>
              Recommended steps
              <div className="steps">
                {algo.recommendedSteps.map((s) => (
                  <span>{s}</span>
                ))}
              </div>
            </span>
          </div>
        );
      })}
    </div>
  );
}
