import ShipFactory from "../factories/ShipFactory/ShipFactory";
import {
  HORIZONTAL,
  VERTICAL,
} from "../factories/GameBoardFactory/GameBoardFactoryUtil";
import GameBoardFactory from "../factories/GameBoardFactory/GameBoardFactory";
import BattleShipGame from "../GameManager/GameManager";
import WebpageStructureManager from "./StructureManager";

const EditPageManager = () => {
  let shipsData = [
    {
      ship: ShipFactory(4),
      orientation: HORIZONTAL,
      shipId: 0,
    },
    {
      ship: ShipFactory(4),
      orientation: VERTICAL,
      shipId: 1,
    },
    {
      ship: ShipFactory(3),
      orientation: VERTICAL,
      shipId: 2,
    },
    {
      ship: ShipFactory(2),
      orientation: VERTICAL,
      shipId: 3,
    },
    {
      ship: ShipFactory(1),
      orientation: VERTICAL,
      shipId: 4,
    },
  ];
  let CurrShip = {};

  const setCurrShip = (id) => {
    CurrShip = shipsData.find((data) => data.shipId === id);
  };
  const editableGameBoard = GameBoardFactory();
  const useGameBoardInManager = () => {
    BattleShipGame.useGivenBoard(editableGameBoard);
  };
  const placeShipOnGameBoard = (row, col, shipId) => {
    const noOfShipsOnBoard = editableGameBoard.livesLeft;
    const currShip = shipsData.find((shipData) => shipData.shipId === shipId);
    editableGameBoard.placeShip(
      {
        row,
        col,
        orientation: currShip.orientation,
      },
      currShip.ship
    );
    if (editableGameBoard.livesLeft > noOfShipsOnBoard) {
      shipsData = shipsData.filter((shipData) => shipData.shipId !== shipId);
      WebpageStructureManager.StartWithEditMode();
    }
  };
  const getShipDataWithId = (id) =>
    shipsData.find((data) => data.shipId === id);
  const resetEditMode = () => {
    shipsData = [
      {
        ship: ShipFactory(4),
        orientation: VERTICAL,
        shipId: 0,
      },
      {
        ship: ShipFactory(4),
        orientation: VERTICAL,
        shipId: 1,
      },
      {
        ship: ShipFactory(3),
        orientation: VERTICAL,
        shipId: 2,
      },
      {
        ship: ShipFactory(2),
        orientation: VERTICAL,
        shipId: 3,
      },
      {
        ship: ShipFactory(1),
        orientation: VERTICAL,
        shipId: 4,
      },
    ];
    editableGameBoard.resetBoard();
  };
  const rotateShip = (id) => {
    const currShip = shipsData.find((data) => data.shipId === id);
    currShip.orientation =
      currShip.orientation === VERTICAL ? HORIZONTAL : VERTICAL;
    console.log(currShip);
  };
  return {
    rotateShip,
    resetEditMode,
    getShipDataWithId,
    placeShipOnGameBoard,
    setCurrShip,
    useGameBoardInManager,
    get allShipsPlaced() {
      return shipsData.length === 0;
    },
    get EditGameBoard() {
      return editableGameBoard.gridStatus;
    },
    get CurrShipId() {
      return CurrShip.shipId;
    },
    get ShipDataArray() {
      return shipsData;
    },
  };
};

const EditManager = EditPageManager();

export default EditManager;
