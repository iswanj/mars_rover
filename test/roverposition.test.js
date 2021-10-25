import { expect } from "@jest/globals";
import {
  mappedDirections,
  processInputs,
  moveforward,
  turnRover,
} from "../RoverPosition";

test("mappedDirections variable", async () => {
  expect(mappedDirections).toStrictEqual({
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
  });
});

test("process input should return correct data objects", async () => {
  const inputs = {
    plateau: "Plateau:5 5",
    landingCoordinates: "Rover1 Landing:3 3 E",
    navigationInstructions: "Rover1 Instructions:MMRMMRMRRM",
  };

  const expectedResult = {
    currentDirection: "E",
    plateauConfig: [5, 5],
    navInstructions: ["M", "M", "R", "M", "M", "R", "M", "R", "R", "M"],
    currentLandingCoords: ["3", "3"],
    roverName: "Rover1",
  };
  expect(processInputs(inputs)).toStrictEqual(expectedResult);
});

test("turn rover should give correct direction based on current direction", async () => {
  /// current direction N and turn L
  expect(turnRover("N", "L")).toStrictEqual("W");
  /// current direction N and turn R
  expect(turnRover("N", "R")).toStrictEqual("E");
  /// current direction E and turn L
  expect(turnRover("E", "L")).toStrictEqual("N");
  /// current direction E and turn R
  expect(turnRover("E", "R")).toStrictEqual("S");
  /// current direction W and turn L
  expect(turnRover("W", "L")).toStrictEqual("S");
  /// current direction W and turn R
  expect(turnRover("W", "R")).toStrictEqual("N");
  /// current direction S and turn L
  expect(turnRover("S", "L")).toStrictEqual("E");
  /// current direction S and turn R
  expect(turnRover("S", "R")).toStrictEqual("W");
});

test("move forward should return correct coordination", async () => {
  const currentLandingCoords = ["3", "3"];
  expect(moveforward(currentLandingCoords, "N")).toStrictEqual([3, 4]);
  expect(moveforward(currentLandingCoords, "E")).toStrictEqual([4, 3]);
  expect(moveforward(currentLandingCoords, "S")).toStrictEqual([3, 2]);
  expect(moveforward(currentLandingCoords, "W")).toStrictEqual([2, 3]);
});
