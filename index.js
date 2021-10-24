import prompt from "prompt";
import { moveforward, turnRover, processInputs } from "./RoverPosition.js";

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
// Get two properties from the user: plateau config, rover landing coordinates and navigation instruction
//
prompt.get(schema, function (err, result) {
  if (err) {
    return onErr(err);
  }

  const processedInputs = processInputs(result);

  let { currentDirection, currentLandingCoords } = processedInputs;
  const { plateauConfig: [px, py], navInstructions } = processedInputs;

  // perform navigation instuction to move the rover on plateau
  navInstructions.forEach((command) => {
    if (command === "M") {
      currentLandingCoords = moveforward(
        currentLandingCoords,
        currentDirection
      );
      const [cx, cy] = currentLandingCoords;
      if (cx > px || cy > py) {
        console.log("Invalid rover movement commands");
        break;
      }
    } else {
      currentDirection = turnRover(currentDirection, command);
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
