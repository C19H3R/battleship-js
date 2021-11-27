import GameBoardFactory from "../../factories/GameBoardFactory/GameBoardFactory";
import { FILLED_CELL } from "../../factories/GameBoardFactory/GameBoardFactoryUtil";
import BattleShipGame from "../../GameManager/GameManager";
import PlaceShipsRandomly from "../../GameManager/Util/PlaceRandomShips";
import EditManager from "../EditPageManager";
import WebpageStructureManager from "../StructureManager";
import BoardCell, { CELL_MODE } from "./BoardCell";

const BOARD_MODE = {
  PLAYER: "Player",
  ENEMY: "Enemy",
  MENU_DISPLAY: "menuDisplay",
  EDIT_MODE: "editMode",
};
Object.freeze(BOARD_MODE);

const getCellMode = (cellObj, isPlayerBoard = false) => {
  const { isHit } = cellObj;
  const isFilled = cellObj.type === FILLED_CELL;
  if (isHit) {
    if (isFilled) {
      return CELL_MODE.SHIP_HIT;
    }
    return CELL_MODE.MISS_HIT;
  }
  if (isFilled && isPlayerBoard) {
    return CELL_MODE.PLAYER_SHIP;
  }
  return CELL_MODE.DEFAULT;
};

const Board = (mode) => {
  const BoardDiv = document.createElement("div");
  BoardDiv.classList.add("board");
  switch (mode) {
    case BOARD_MODE.PLAYER: {
      // get PLAYER BOARD STATUS
      const playerBoard = BattleShipGame.PlayerGameBoard;

      playerBoard.forEach((arr) => [
        arr.forEach((item) => {
          const CellState = getCellMode(item, true);
          BoardDiv.appendChild(BoardCell(CellState));
        }),
      ]);
      break;
    }
    case BOARD_MODE.ENEMY: {
      // TODO: get OPPONENT BOARD STATUS
      const enemyBoard = BattleShipGame.CpuGameBoard;
      console.log(enemyBoard);
      enemyBoard.forEach((arr, row) => [
        arr.forEach((item, col) => {
          const CellState = getCellMode(item, false);
          const cellDiv = BoardCell(CellState);
          cellDiv.addEventListener("click", () => {
            BattleShipGame.PlayerTurn({ row, col });
          });
          BoardDiv.appendChild(cellDiv);
        }),
      ]);
      break;
    }
    case BOARD_MODE.MENU_DISPLAY: {
      const menuBoard = GameBoardFactory();
      PlaceShipsRandomly(menuBoard);
      menuBoard.gridStatus.forEach((arr) => [
        arr.forEach((item) => {
          const CellState = getCellMode(item, true);
          BoardDiv.appendChild(BoardCell(CellState));
        }),
      ]);
      break;
    }
    case BOARD_MODE.EDIT_MODE: {
      const editBoard = EditManager.EditGameBoard;
      editBoard.forEach((arr, row) => [
        arr.forEach((item, col) => {
          const CellState = getCellMode(item, true);
          const cellDiv = BoardCell(CellState);
          cellDiv.addEventListener("dragover", (E) => {
            E.preventDefault();
          });
          cellDiv.addEventListener("drop", () => {
            const shipId = EditManager.CurrShipId;
            EditManager.placeShipOnGameBoard(row, col, shipId);
          });
          BoardDiv.appendChild(cellDiv);
        }),
      ]);
      break;
    }
    default:
      break;
  }
  return BoardDiv;
};
export { BOARD_MODE };
export default Board;
