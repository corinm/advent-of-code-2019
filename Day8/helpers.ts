export const parseImageIntoLayers = (
  rawImage: string,
  width: number,
  height: number
): number[][] => {
  const pixels = rawImage.split("").map(num => parseInt(num));

  const numberOfLayers = pixels.length / (width * height);

  const layers = [];
  let firstIndex;
  let lastIndex;
  const intervalBetweenLayers = pixels.length / numberOfLayers;

  for (let layer = 0; layer < numberOfLayers; layer++) {
    firstIndex = 0 + intervalBetweenLayers * layer;
    lastIndex = 1 + (intervalBetweenLayers - 1) + intervalBetweenLayers * layer;

    const currentLayer = pixels.slice(firstIndex, lastIndex);
    layers.push(currentLayer);
  }

  if (!validateLayers(layers)) {
    throw new Error("Layers are not all the same length");
  }

  return layers;
};

const validateLayers = (layers: number[][]): boolean => {
  const countsBySizeOfLayer = layers
    .map(layer => layer.length)
    .reduce((acc, cur) => {
      if (acc[cur]) {
        return {
          ...acc,
          [cur]: acc[cur] += 1
        };
      } else {
        return {
          ...acc,
          [cur]: 1
        };
      }
    }, {});

  const numberOfDifferentSizes = Object.keys(countsBySizeOfLayer).length;
  return numberOfDifferentSizes === 1;
};

const fewestZeroesFirst = (a, b) => {
  if (a.zeroes > b.zeroes) {
    return 1;
  } else if (a.zeroes < b.zeroes) {
    return -1;
  } else {
    return 0;
  }
};

export const findLayerWithFewestZeroes = (layers: number[][]): number[] => {
  const data = layers
    .map((layer, i) => ({
      index: i,
      zeroes: layer.filter(num => num === 0).length
    }))
    .sort(fewestZeroesFirst);

  const fewestIndex = data[0].index;
  return layers[fewestIndex];
};

export const countDigits = (layer: number[], digit: number): number => {
  return layer.filter(num => num === digit).length;
};

const colours = {
  0: "BLACK",
  1: "WHITE",
  2: "TRANSPARENT"
};

export const stackPixels = (pixels: number[]): number =>
  pixels.reduce((acc, cur, i) => {
    if (acc === undefined) {
      return cur;
    } else if (acc === 2 && (cur === 0 || cur === 1)) {
      return cur;
    } else {
      return acc;
    }
  });

export const decodeImage = (layers: number[][]): number[] => {
  const image = [];
  const numberOfPixelsInALayer = layers[0].length;
  for (let i = 0; i < numberOfPixelsInALayer; i++) {
    const relevantPixels = layers.map(layer => layer[i]);
    image.push(stackPixels(relevantPixels));
  }
  return image;
};

export const formatImage = (
  layer: number[],
  width: number,
  height: number
): string => {
  const rows = [];
  let firstIndex;
  let lastIndex;

  for (let row = 0; row < height; row++) {
    firstIndex = 0 + row * width;
    lastIndex = width + row * width;
    const currentRow = layer.slice(firstIndex, lastIndex);
    rows.push(currentRow.join(""));
  }
  return rows.join("\n");
};
