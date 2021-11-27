import Board, { BOARD_MODE } from "../components/Board";
import DragableShip from "../components/DragableShip";
import EditManager from "../EditPageManager";
import WebpageStructureManager from "../StructureManager";

const EditPage = () => {
  const mainDiv = document.createElement("main");
  const placeShipDiv = document.createElement("div");
  placeShipDiv.id = "place-ships-page";

  const BoardContainerDiv = document.createElement("div");
  BoardContainerDiv.classList.add("board-container");

  const editBoard = Board(BOARD_MODE.EDIT_MODE);

  const editMenuDiv = document.createElement("div");
  editMenuDiv.classList.add("edit-menu");

  const ShipContainer = document.createElement("div");
  ShipContainer.classList.add("ships-container");

  EditManager.ShipDataArray.forEach((item) => {
    const currDragableShip = DragableShip(item.shipId);
    ShipContainer.appendChild(currDragableShip);
  });

  const instructionDivTmp = document.createElement("div");
  instructionDivTmp.innerHTML = `
              <span class="edit-mode-instructions">Place Ships on Board : Drag and Drop</span>
              <!-- <button id="start-edit-game-btn">Start</button> -->
            `;
  const startGameButton = document.createElement("button");
  startGameButton.id = "start-edit-game-btn";
  startGameButton.innerText = "Start";
  startGameButton.addEventListener("click", () => {
    EditManager.useGameBoardInManager();
    WebpageStructureManager.ReloadGamePage();
  });
  BoardContainerDiv.appendChild(editBoard);

  editMenuDiv.appendChild(ShipContainer);
  if (EditManager.allShipsPlaced) {
    editMenuDiv.appendChild(startGameButton);
  } else editMenuDiv.appendChild(instructionDivTmp);
  placeShipDiv.appendChild(BoardContainerDiv);
  placeShipDiv.appendChild(editMenuDiv);

  mainDiv.appendChild(placeShipDiv);
  return mainDiv;
};
export default EditPage;
