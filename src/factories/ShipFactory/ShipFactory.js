const ShipFactory = (shipSize) => {
  const status = Array(shipSize).fill(0);

  const hit = (hitPos) => {
    if (hitPos > 0 && hitPos <= status.length) {
      status[hitPos - 1] = 1;
    }
  };
  return {
    length: status.length,
    get isSunk() {
      return status.every((item) => item === 1);
    },
    get status() {
      return status;
    },
    hit,
  };
};

export default ShipFactory;
