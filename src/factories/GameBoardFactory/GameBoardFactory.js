import ShipFactory from "../ShipFactory/ShipFactory";
import {
  EMPTY_CELL,
  FILLED_CELL,
  HORIZONTAL,
  VERTICAL,
} from "./GameBoardFactoryUtil";

const GameBoardFactory = () => {
  const gridState = [...Array(10)].map(() =>
    Array(10).fill({ type: EMPTY_CELL, isHit: false })
  );
  const shipsManager = [];

  const isGivenRangeValid = ({ start, end }) => {
    const iscoordInRange = (value) => value >= 0 && value < 10;
    if (
      !iscoordInRange(start.col) ||
      !iscoordInRange(start.row) ||
      !iscoordInRange(end.col) ||
      !iscoordInRange(end.row)
    ) {
      return false;
    }
    const isVertical = start.col === end.col;
    if (isVertical) {
      const currCol = start.col;
      for (let i = start.row; i <= end.row; i += 1) {
        if (gridState[i][currCol].type === FILLED_CELL) {
          return false;
        }
      }
    } else {
      const currRow = start.row;
      for (let i = start.col; i <= end.col; i += 1) {
        if (gridState[currRow][i].type === FILLED_CELL) {
          return false;
        }
      }
    }
    return true;
  };

  const placeShip = ({ row, col, orientation }, shipObj = ShipFactory(4)) => {
    const currShip = shipObj;
    const currLength = currShip.length;
    const start = { row, col };
    let end = { row, col };
    if (orientation === VERTICAL) {
      end = { row: row + currLength - 1, col };
    } else {
      end = { row, col: col + currLength - 1 };
    }
    if (isGivenRangeValid({ start, end })) {
      shipsManager.push({
        currShip,
        start,
        end,
        shipId: shipsManager.length,
        orientation,
      });
      if (orientation === VERTICAL) {
        const currCol = start.col;
        for (let i = start.row; i <= end.row; i += 1) {
          gridState[i][currCol] = { type: FILLED_CELL, isHit: false };
        }
      } else if (orientation === HORIZONTAL) {
        const currRow = start.row;
        for (let i = start.col; i <= end.col; i += 1) {
          gridState[currRow][i] = { type: FILLED_CELL, isHit: false };
        }
      }
    }
  };

  const receiveAttack = ({ row, col }) => {
    const cellUnderAttack = Object.create(gridState[row][col]);
    cellUnderAttack.isHit = true;
    gridState[row][col] = cellUnderAttack;
  };

  return {
    placeShip,
    receiveAttack,
    get gridStatus() {
      return gridState;
    },
    get livesLeft() {
      return 0;
    },
    get gameOver() {
      return false;
    },
  };
};

export default GameBoardFactory;
