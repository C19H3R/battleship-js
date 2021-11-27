import GameBoardFactory from "../../factories/GameBoardFactory/GameBoardFactory";
import {
  HORIZONTAL,
  VERTICAL,
} from "../../factories/GameBoardFactory/GameBoardFactoryUtil";
import ShipFactory from "../../factories/ShipFactory/ShipFactory";

const PlaceShipsRandomly = (GameBoard = GameBoardFactory()) => {
  const shipsToPlace = [
    ShipFactory(4),
    ShipFactory(4),
    ShipFactory(3),
    ShipFactory(2),
    ShipFactory(1),
  ];

  shipsToPlace.forEach((ship) => {
    const currentShipsPlaced = GameBoard.livesLeft;
    while (GameBoard.livesLeft === currentShipsPlaced) {
      const randomRow = Math.floor(Math.random() * 10);
      const randomCol = Math.floor(Math.random() * 10);
      const randomOrientation =
        Math.floor(Math.random() * 2) === 1 ? HORIZONTAL : VERTICAL;
      GameBoard.placeShip(
        {
          row: randomRow,
          col: randomCol,
          orientation: randomOrientation,
        },
        ship
      );
    }
  });
};

export default PlaceShipsRandomly;
