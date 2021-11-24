/* eslint-disable max-len */
import { expect, test } from "@jest/globals";
import ShipFactory from "./ShipFactory";

// Begin your app by creating the Ship factory function.
//
//
//
// Your ‘ships’ will be objects that include their length, where they’ve been hit and whether or not they’ve been sunk.

// REMEMBER you only have to test your object’s public interface. Only methods or properties that are used outside of
// your ‘ship’ object need unit tests.

// Ships should have a hit() function that takes a number and then marks that position as ‘hit’.

// isSunk() should be a function that calculates it based on their length and whether all of their positions are ‘hit’.

test("length of ship on creation ", () => {
  const testLength = 5;
  const tmpShip = ShipFactory(testLength);

  expect(tmpShip.length).toBe(testLength);
});

test("status of ship on creation", () => {
  const testLength = 5;
  const testStatus = [0, 0, 0, 0, 0];
  const tmpShip = ShipFactory(testLength);
  expect(tmpShip.status).toMatchObject(testStatus);
});

test("status of ship on hit", () => {
  const testLength = 5;
  const tmpShip = ShipFactory(testLength);
  // fn to test
  tmpShip.hit(4);
  expect(tmpShip.status).toMatchObject([0, 0, 0, 0, 1]);
});

test("is ship sunk : false", () => {
  const testLength = 5;
  const tmpShip = ShipFactory(testLength);
  // fn to test
  tmpShip.hit(4);
  expect(tmpShip.isSunk).toBe(false);
});

test("is ship sunk : true", () => {
  const testLength = 5;
  const tmpShip = ShipFactory(testLength);
  // fn to test
  tmpShip.hit(0);
  tmpShip.hit(1);
  tmpShip.hit(2);
  tmpShip.hit(3);
  tmpShip.hit(4);
  expect(tmpShip.isSunk).toBe(true);
});
