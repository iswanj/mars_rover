import prompt from "prompt";
import {
  moveforward,
  turnLeft,
  turnRight,
  processInputs,
} from "./RoverPosition.js";

const schema = {
  properties: {
    plateau: {
      description: "Enter upper-right coordinates of the plateau",
      required: true,
    },
    landingCoordinates: {
      description: "Landing co-ordinates of Rover",
      required: true,
    },
    navigationInstructions: {
      description: "Navigation instruction for Rover",
      required: true,
    },
  },
};

//
// Start the prompt
//
prompt.start();

//
// Get two properties from the user: email, password
//
prompt.get(schema, function (err, result) {
  if (err) {
    return onErr(err);
  }

  const processedInputs = processInputs(result);

  let { currentDirection, currentLandingCoords } = processedInputs;
  const { navInstructions } = processedInputs;

  navInstructions.forEach((command) => {
    switch (command) {
      case "L":
        currentDirection = turnLeft(currentDirection);
        break;
      case "R":
        currentDirection = turnRight(currentDirection);
        break;
      case "M":
        currentLandingCoords = moveforward(
          currentLandingCoords,
          currentDirection
        );
        break;
    }
  });

  console.log(
    "Rover Current Position: ",
    currentLandingCoords.join(" ") + " " + currentDirection
  );
});

function onErr(err) {
  console.log(err);
  return 1;
}