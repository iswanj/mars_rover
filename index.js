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

  const BreakException = {};

  // process inputs for all the calculations
  const processedInputs = processInputs(result);

  let { currentDirection, currentLandingCoords } = processedInputs;
  const {
    plateauConfig: [px, py], //plateau upper right corner x and y
    navInstructions, // navigation instuctions converted to an array
    roverName,
  } = processedInputs;

  // perform navigation instuction to move the rover on plateau
  navInstructions.forEach((command) => {
    if (command === "M") {
      //if command is Move
      // get next rover coordinates
      currentLandingCoords = moveforward(
        currentLandingCoords,
        currentDirection
      );
      const [cx, cy] = currentLandingCoords; // next coordinates's x and y
      if (cx > px || cy > py) {
        // if next x axis greater than plateau max x
        // or if next y axis greater than plateau max y
        // will throw a error
        console.log("Invalid movement commands for rover on plateau");
        throw BreakException;
      }
    } else {
      // if command L or R
      // get next rover facing direction
      currentDirection = turnRover(currentDirection, command);
    }
  });

  console.log("Current position");
  console.log(
    `${roverName}:`,
    currentLandingCoords.join(" ") + " " + currentDirection
  );
});

function onErr(err) {
  console.log(err);
  return 1;
}
