import "./style.css";

import GameBoardFactory from "./factories/GameBoardFactory/GameBoardFactory";
import { HORIZONTAL } from "./factories/GameBoardFactory/GameBoardFactoryUtil";
import ShipFactory from "./factories/ShipFactory/ShipFactory";

const testFn = () => "ASDF";
export default testFn;

const tmpGameBoard = GameBoardFactory();

const tmpShip = ShipFactory(4);

tmpGameBoard.placeShip({ row: 0, col: 0, orientation: HORIZONTAL }, tmpShip);

tmpGameBoard.receiveAttack({ row: 0, col: 0 });
tmpGameBoard.receiveAttack({ row: 0, col: 1 });
tmpGameBoard.receiveAttack({ row: 0, col: 2 });
tmpGameBoard.receiveAttack({ row: 0, col: 3 });

console.log(tmpGameBoard.gridStatus);

console.log(tmpGameBoard.livesLeft);

console.log(tmpGameBoard.gameOver);
