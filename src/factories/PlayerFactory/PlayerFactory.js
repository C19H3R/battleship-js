const PlayerFactory = () => {
  const opponentBoardLog = [...Array(10)].map(() => Array(10).fill(0));
  let isTurn = false;
  const attackOpponentBoard = ({ row, col }, gameBoard) => {
    if (opponentBoardLog[row][col] === 0) {
      opponentBoardLog[row][col] = 1;
      isTurn = false;
      gameBoard.receiveAttack({ row, col });
    }
  };
  return {
    attackOpponentBoard,
    get attackBoardLog() {
      return opponentBoardLog;
    },
    setTurn: () => {
      isTurn = true;
    },
    get isTurnComplete() {
      return !isTurn;
    },
  };
};

export default PlayerFactory;
