let mappedDirections = {
  N: {
    L: "W",
    R: "E",
  },
  E: {
    L: "N",
    R: "S",
  },
  W: {
    L: "S",
    R: "N",
  },
  S: {
    L: "E",
    R: "W",
  },
};

export const processInputs = (inputs) => {
  const { plateau, landingCoordinates, navigationInstructions } = inputs;

  const plateauConfig = plateau.split(" ");
  const landCoords = landingCoordinates.split(" ");
  const navInstructions = navigationInstructions.split("");

  let currentDirection = landCoords[2];
  return {
    currentDirection,
    plateauConfig,
    navInstructions,
    currentLandingCoords: landCoords.slice(0, -1),
  };
};

export const moveforward = (curCoords, curDirection) => {
  const [x, y] = curCoords;
  switch (curDirection) {
    case "N":
      return [x, Number(y) + 1];
    case "E":
      return [Number(x) + 1, y];
    case "S":
      return [x, Number(y) - 1];
    case "W":
      return [Number(x) - 1, y];
    default:
      return curCoords;
  }
};

export const turnRover = (curDirection, command) => {
  return mappedDirections[curDirection][command];
};
