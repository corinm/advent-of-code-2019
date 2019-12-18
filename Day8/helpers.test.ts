import {
  parseImageIntoLayers,
  findLayerWithFewestZeroes,
  countDigits,
  decodeImage,
  stackPixels,
  formatImage
} from "./helpers";
import image from "./image";

describe("parseImage", () => {
  test("correctly parses example 1", () => {
    const rawImage = "123456789012";
    const width = 3;
    const height = 2;
    expect(parseImageIntoLayers(rawImage, width, height)).toEqual([
      [1, 2, 3, 4, 5, 6],
      [7, 8, 9, 0, 1, 2]
    ]);
  });

  test("correctly parses example 2", () => {
    const rawImage = "0222112222120000";
    const width = 2;
    const height = 2;
    expect(parseImageIntoLayers(rawImage, width, height)).toEqual([
      [0, 2, 2, 2],
      [1, 1, 2, 2],
      [2, 2, 1, 2],
      [0, 0, 0, 0]
    ]);
  });
});

describe("findLayerWithFewestZeroes", () => {
  test("correctly find the layer for example 1", () => {
    const layers = [
      [1, 2, 3, 4, 5, 6],
      [7, 8, 9, 0, 1, 2]
    ];
    expect(findLayerWithFewestZeroes(layers)).toEqual([1, 2, 3, 4, 5, 6]);
  });
});

describe("countDigit", () => {
  test("correctly counts 1s in layer 1 for example 1", () => {
    const layer1 = [1, 2, 3, 4, 5, 6];
    expect(countDigits(layer1, 1)).toEqual(1);
  });

  test("correctly counts 2s in layer 1 for example 1", () => {
    const layer1 = [1, 2, 3, 4, 5, 6];
    expect(countDigits(layer1, 2)).toEqual(1);
  });

  test("correctly counts 3s", () => {
    const layer1 = [3, 3, 3, 4, 5, 6];
    expect(countDigits(layer1, 3)).toEqual(3);
  });
});

describe("stackPixels", () => {
  test("correctly stacks position 0 from example 2", () => {
    const pixels = [0, 1, 2, 0];
    expect(stackPixels(pixels)).toEqual(0);
  });

  test("correctly stacks position 1 from example 2", () => {
    const pixels = [2, 1, 2, 0];
    expect(stackPixels(pixels)).toEqual(1);
  });

  test("correctly stacks position 2 from example 2", () => {
    const pixels = [2, 2, 1, 0];
    expect(stackPixels(pixels)).toEqual(1);
  });

  test("correctly stacks position 3 from example 2", () => {
    const pixels = [2, 2, 2, 0];
    expect(stackPixels(pixels)).toEqual(0);
  });
});

describe("decodeImage", () => {
  test("should correctly decode example 2", () => {
    const layers = [
      [0, 2, 2, 2],
      [1, 1, 2, 2],
      [2, 2, 1, 2],
      [0, 0, 0, 0]
    ];

    expect(decodeImage(layers)).toEqual([0, 1, 1, 0]);
  });

  test("should correctly decode something with 0s, 1s and 2s", () => {
    const layers = [
      [0, 0, 1, 2],
      [0, 0, 1, 2],
      [0, 0, 1, 2],
      [0, 0, 1, 2]
    ];
    expect(decodeImage(layers)).toEqual([0, 0, 1, 2]);
  });

  test("should have right length for real data", () => {
    const layers = parseImageIntoLayers(image, 25, 6);
    const decoded = decodeImage(layers);
    expect(decoded.length).toEqual(150);
  });
});

describe("formatImage", () => {
  test("should correctly format example 2's output", () => {
    const input = [0, 1, 1, 0];
    const width = 2;
    const height = 2;
    expect(formatImage(input, width, height)).toEqual("01\n10");
  });

  test("should correctly format an odd shape", () => {
    const input = [
      0,
      1,
      2,
      1,
      0,
      1,
      2,
      1,
      0,
      1,
      2,
      1,
      0,
      1,
      2,
      1,
      0,
      1,
      2,
      1,
      0,
      1,
      2,
      1,
      0,
      1,
      2,
      1
    ];
    const width = 4;
    const height = 6;
    expect(formatImage(input, width, height)).toEqual(
      "0121\n0121\n0121\n0121\n0121\n0121"
    );
  });
});
