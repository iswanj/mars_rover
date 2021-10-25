export const mappedDirections = {
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

  const roverName = landingCoordinates.split(" ")[0];

  const plateauConfig = plateau.split(":")[1].split(" ").map(Number);
  const landCoords = landingCoordinates.split(":")[1].split(" ");
  const navInstructions = navigationInstructions.split(":")[1].split("");

  let currentDirection = landCoords[2];
  return {
    currentDirection,
    plateauConfig,
    navInstructions,
    currentLandingCoords: landCoords.slice(0, -1),
    roverName,
  };
};

export const moveforward = (curCoords, curDirection) => {
  const [x, y] = curCoords.map(Number);
  switch (curDirection) {
    case "N":
      return [x, y + 1];
    case "E":
      return [x + 1, y];
    case "S":
      return [x, y - 1];
    case "W":
      return [x - 1, y];
    default:
      return curCoords;
  }
};

export const turnRover = (curDirection, command) => {
  return mappedDirections[curDirection][command];
};
