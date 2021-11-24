const GameBoardFactory = () => {
  const gridState = Array(10)
    .fill(0)
    .map(() => Array(10).fill({ type: "empty", isHit: false }));

  const placeShip = 0;
  const receiveAttack = 0;
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

// place ship :  coordinates
// recieve attack  : coordinates
// status of grid

// ships alive Number
// all ships sunk
