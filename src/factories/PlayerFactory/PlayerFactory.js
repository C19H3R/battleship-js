const PlayerFactory = () => {
  const opponentBoardStatus = [];
  const isTurn = false;
  return {
    attackBoard: 0,
    setTurn: 0,
    get isTurnComplete() {
      return !isTurn;
    },
  };
};
