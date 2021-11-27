const CELL_MODE = {
  PLAYER_SHIP: "PlayerShip",
  SHIP_HIT: "ShipHit",
  MISS_HIT: "MissHit",
  DEFAULT: "Default",
};
Object.freeze(CELL_MODE);

const CELL_COLOR = {
  HIT: "#a31621",
  MISS: "#41ead4",
  PLAYER_SHIP: "#2a9134",
};

const BoardCell = (cellMode) => {
  const CellDiv = document.createElement("div");

  switch (cellMode) {
    case CELL_MODE.PLAYER_SHIP:
      CellDiv.style.cssText = `box-shadow: 0px 0px 4px #4195fc;
                  background-color: ${CELL_COLOR.PLAYER_SHIP};`;
      break;
    case CELL_MODE.SHIP_HIT:
      CellDiv.style.cssText = `box-shadow: 0px 0px 4px #4195fc;
                  background-color: ${CELL_COLOR.HIT};`;
      break;
    case CELL_MODE.MISS_HIT:
      CellDiv.style.cssText = `box-shadow: 0px 0px 4px #4195fc;
                  background-color: ${CELL_COLOR.MISS};`;
      break;
    default:
      CellDiv.style.cssText = `box-shadow: 0px 0px 4px #4195fc;`;
      break;
  }
  return CellDiv;
};

export { CELL_MODE };
export default BoardCell;
