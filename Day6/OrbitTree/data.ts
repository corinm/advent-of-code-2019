export const fullTree = {
  COM: {
    children: ["B"]
  },
  B: {
    parent: "COM",
    children: ["C", "G"]
  },
  C: {
    parent: "B",
    children: ["D"]
  },
  D: {
    parent: "C",
    children: ["E", "I"]
  },
  E: {
    parent: "D",
    children: ["F", "J"]
  },
  F: {
    parent: "E",
    children: []
  },
  G: {
    parent: "B",
    children: ["H"]
  },
  H: {
    parent: "G",
    children: []
  },
  I: {
    parent: "D",
    children: []
  },
  J: {
    parent: "E",
    children: ["K"]
  },
  K: {
    parent: "J",
    children: ["L"]
  },
  L: {
    parent: "K",
    children: []
  }
};

export const fullTreeWithSanta = {
  COM: {
    children: ["B"]
  },
  B: {
    parent: "COM",
    children: ["C", "G"]
  },
  C: {
    parent: "B",
    children: ["D"]
  },
  D: {
    parent: "C",
    children: ["E", "I"]
  },
  E: {
    parent: "D",
    children: ["F", "J"]
  },
  F: {
    parent: "E",
    children: []
  },
  G: {
    parent: "B",
    children: ["H"]
  },
  H: {
    parent: "G",
    children: []
  },
  I: {
    parent: "D",
    children: ["SAN"]
  },
  J: {
    parent: "E",
    children: ["K"]
  },
  K: {
    parent: "J",
    children: ["YOU"]
  },
  SAN: {
    parent: "I",
    children: []
  },
  YOU: {
    parent: "K",
    children: []
  }
};
