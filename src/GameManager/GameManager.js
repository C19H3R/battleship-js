import PlayerFactory from "../factories/PlayerFactory/PlayerFactory";
import GameBoardFactory from "../factories/GameBoardFactory/GameBoardFactory";
import PlaceShipsRandomly from "./Util/PlaceRandomShips";
import WebpageStructureManager from "../Structure/StructureManager";

const delay = (ms) =>
  new Promise((resolve) => {
    setTimeout(() => resolve(1), ms);
  });
const GameManager = () => {
  let HumanPlayer = PlayerFactory();
  let CpuPlayer = PlayerFactory();
  let canSetBoard = true;
  let PlayerGameBoard = GameBoardFactory();
  let CpuGameBoard = GameBoardFactory();
  let isPlayerTurn = true;

  PlaceShipsRandomly(PlayerGameBoard);
  PlaceShipsRandomly(CpuGameBoard);
  const resetGame = () => {
    HumanPlayer = PlayerFactory();
    CpuPlayer = PlayerFactory();
    CpuGameBoard = GameBoardFactory();
    PlayerGameBoard = GameBoardFactory();
    canSetBoard = true;
    PlaceShipsRandomly(PlayerGameBoard);
    PlaceShipsRandomly(CpuGameBoard);
    isPlayerTurn = true;
  };
  const isGameOver = () =>
    PlayerGameBoard.livesLeft === 0 || CpuGameBoard.livesLeft === 0;

  const CpuTurn = async () => {
    CpuPlayer.setTurn();
    // await delay(2000);
    while (!CpuPlayer.isTurnComplete) {
      const randomRow = parseInt(Math.random() * 10, 10);
      const randomCol = parseInt(Math.random() * 10, 10);
      CpuPlayer.attackOpponentBoard(
        { row: randomRow, col: randomCol },
        PlayerGameBoard
      );
    }
    isPlayerTurn = true;
    if (isGameOver()) {
      WebpageStructureManager.LoadGameOverPage();
    } else {
      WebpageStructureManager.ReloadGamePage();
    }
  };
  const PlayerTurn = ({ row, col }) => {
    console.log({ row, col }, isPlayerTurn);
    if (isPlayerTurn) {
      HumanPlayer.setTurn();
      HumanPlayer.attackOpponentBoard({ row, col }, CpuGameBoard);
      if (HumanPlayer.isTurnComplete) {
        isPlayerTurn = false;
        if (isGameOver()) {
          WebpageStructureManager.LoadGameOverPage();
        } else {
          WebpageStructureManager.ReloadGamePage();
          CpuTurn();
        }
      }
    }
  };
  const useGivenBoard = (Board) => {
    if (canSetBoard) {
      PlayerGameBoard = Board;
      canSetBoard = false;
    }
  };

  return {
    useGivenBoard,
    PlayerTurn,
    resetGame,
    get PlayerGameBoard() {
      return PlayerGameBoard.gridStatus;
    },
    get CpuGameBoard() {
      return CpuGameBoard.gridStatus;
    },
    get PlayerLivesLeft() {
      return PlayerGameBoard.livesLeft;
    },
    get CpuLivesLeft() {
      return CpuGameBoard.livesLeft;
    },
    get playerGameResult() {
      if (isGameOver()) {
        const result = PlayerGameBoard.livesLeft === 0 ? "Lost" : "Won";
        resetGame();
        return result;
      }
      return "Result awaited";
    },
  };
};
const BattleShipGame = GameManager();
export default BattleShipGame;
