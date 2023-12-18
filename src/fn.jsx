import chroma from "chroma-js";

export default function generateRandomPalette(
  baseColor,
  algorithm,
  numColors,
  isFix
) {
  let colorPalette = [];

  // Assuming baseColor is a Chroma object, we can directly use its methods such as .luminance(), .get(), etc.
  switch (algorithm) {
    case "complementary":
      // Generate a complementary scale (opposite on the color wheel)
      colorPalette = [
        baseColor.hex(),
        baseColor.set("hsl.h", (baseColor.get("hsl.h") + 180) % 360).hex(),
      ];
      break;
    case "analogous":
      // Generate an analogous color scheme (+/- 30 degrees from the base color)
      colorPalette = [
        baseColor.set("hsl.h", (baseColor.get("hsl.h") - 30) % 360).hex(),
        baseColor.hex(),
        baseColor.set("hsl.h", (baseColor.get("hsl.h") + 30) % 360).hex(),
      ];
      break;
    case "triadic":
      // Generate a triadic color scheme (three colors evenly spaced on the color wheel)
      colorPalette = [
        baseColor.hex(),
        baseColor.set("hsl.h", (baseColor.get("hsl.h") + 120) % 360).hex(),
        baseColor.set("hsl.h", (baseColor.get("hsl.h") + 240) % 360).hex(),
      ];
      break;
    case "tetradic":
      // Generate a tetradic color scheme (four colors evenly spaced on the color wheel)
      colorPalette = [
        baseColor.hex(),
        baseColor.set("hsl.h", (baseColor.get("hsl.h") + 90) % 360).hex(),
        baseColor.set("hsl.h", (baseColor.get("hsl.h") + 180) % 360).hex(),
        baseColor.set("hsl.h", (baseColor.get("hsl.h") + 270) % 360).hex(),
      ];
      break;
    case "split Complementary":
      // Generate a split-complementary color scheme (base color + two colors adjacent to its complement)
      colorPalette = [
        baseColor.hex(),
        baseColor.set("hsl.h", (baseColor.get("hsl.h") + 150) % 360).hex(),
        baseColor.set("hsl.h", (baseColor.get("hsl.h") + 210) % 360).hex(),
      ];
      break;
    case "monochromatic":
      // Generate a monochromatic color scheme (variations of the base color)
      colorPalette = chroma
        .scale([baseColor.darken(), baseColor, baseColor.brighten()])
        .mode("lch")
        .colors(numColors);
      break;
    case "square":
      colorPalette = [
        baseColor.hex(),
        baseColor.set("hsl.h", (baseColor.get("hsl.h") + 90) % 360).hex(),
        baseColor.set("hsl.h", (baseColor.get("hsl.h") + 180) % 360).hex(),
        baseColor.set("hsl.h", (baseColor.get("hsl.h") + 270) % 360).hex(),
      ];
      break;
    default:
      throw new Error(`Unexpected algorithm: ${algorithm}`);
  }

  if (isFix) {
    // If fewer colors are required than provided by the scale, pick colors evenly from the palette
    if (colorPalette.length > numColors) {
      let sampledPalette = [];
      let step = colorPalette.length / numColors;
      for (let i = 0; i < numColors; i++) {
        sampledPalette.push(colorPalette[Math.floor(i * step)]);
      }
      colorPalette = sampledPalette;
    } else if (colorPalette.length < numColors) {
      // If more colors are required, use Chroma.js to generate intermediate colors
      colorPalette = chroma.bezier(colorPalette).scale().colors(numColors);
    }
  }

  return colorPalette;
}
