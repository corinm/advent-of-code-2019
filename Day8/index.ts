import {
  parseImageIntoLayers,
  findLayerWithFewestZeroes,
  countDigits,
  decodeImage,
  formatImage
} from "./helpers";
import image from "./image";

const solvePart1 = (): void => {
  const width = 25;
  const height = 6;
  const layers = parseImageIntoLayers(image, width, height);
  const layerWithfewestZeroes = findLayerWithFewestZeroes(layers);
  const ones = countDigits(layerWithfewestZeroes, 1);
  const twos = countDigits(layerWithfewestZeroes, 2);
  const result = ones * twos;
  console.log(result);
};

const solvePart2 = (): void => {
  const width = 25;
  const height = 6;
  const layers = parseImageIntoLayers(image, width, height);
  const decoded = decodeImage(layers);
  const message = formatImage(decoded, width, height);
  console.log(message.replace(/1/g, " ").replace(/0/g, "█"));
};

// solvePart1();
solvePart2();
