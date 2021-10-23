const directionMap = {
  // [L, R]
  N: ["W", "E"],
  E: ["N", "S"],
  S: ["E", "W"],
  W: ["S", "N"],
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
  const x = Number(curCoords[0]);
  const y = Number(curCoords[1]);
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

export const turnLeft = (curDirection) => {
  const activeDirectionMap = directionMap[curDirection];
  return activeDirectionMap[0];
};

export const turnRight = (curDirection) => {
  const activeDirectionMap = directionMap[curDirection];
  return activeDirectionMap[1];
};
