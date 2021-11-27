import ShipFactory from "../ShipFactory/ShipFactory";
import {
  EMPTY_CELL,
  FILLED_CELL,
  HORIZONTAL,
  VERTICAL,
} from "./GameBoardFactoryUtil";

const GameBoardFactory = () => {
  let gridState = [...Array(10)].map(() =>
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
  const getHitCellNumber = ({ start, orientation, row, col }) => {
    if (orientation === HORIZONTAL) {
      return col - start.col;
    }

    return row - start.row;
  };
  const getShipDataWithId = (id) =>
    shipsManager.find((item) => item.shipId === id);
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
      const shipId = shipsManager.length + 1;
      shipsManager.push({
        currShip,
        start,
        end,
        shipId,
        orientation,
      });
      if (orientation === VERTICAL) {
        const currCol = start.col;
        for (let i = start.row; i <= end.row; i += 1) {
          gridState[i][currCol] = { type: FILLED_CELL, isHit: false, shipId };
        }
      } else if (orientation === HORIZONTAL) {
        const currRow = start.row;
        for (let i = start.col; i <= end.col; i += 1) {
          gridState[currRow][i] = { type: FILLED_CELL, isHit: false, shipId };
        }
      }
    }
  };

  const receiveAttack = ({ row, col }) => {
    const cellUnderAttack = { ...gridState[row][col] };
    cellUnderAttack.isHit = true;
    gridState[row][col] = cellUnderAttack;

    if (cellUnderAttack.type === FILLED_CELL) {
      const currShipId = cellUnderAttack.shipId;
      const { currShip, start, orientation } = getShipDataWithId(currShipId);
      currShip.hit(getHitCellNumber({ start, orientation, row, col }));
    }
  };
  const resetBoard = () => {
    gridState = [...Array(10)].map(() =>
      Array(10).fill({ type: EMPTY_CELL, isHit: false })
    );
  };
  return {
    resetBoard,
    placeShip,
    receiveAttack,
    get gridStatus() {
      return gridState;
    },
    get livesLeft() {
      let livesLeft = 0;
      shipsManager.forEach(({ currShip }) => {
        if (!currShip.isSunk) {
          livesLeft += 1;
        }
      });
      return livesLeft;
    },
    get gameOver() {
      let livesLeft = 0;
      shipsManager.forEach(({ currShip }) => {
        if (!currShip.isSunk) {
          livesLeft += 1;
        }
      });
      return livesLeft === 0;
    },
  };
};

export default GameBoardFactory;
