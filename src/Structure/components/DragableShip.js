import { VERTICAL } from "../../factories/GameBoardFactory/GameBoardFactoryUtil";
import ShipFactory from "../../factories/ShipFactory/ShipFactory";
import EditManager from "../EditPageManager";
import WebpageStructureManager from "../StructureManager";

const DragableShip = (id) => {
  const currShipData = EditManager.getShipDataWithId(id);
  const shipDiv = document.createElement("div");
  shipDiv.draggable = true;
  shipDiv.classList.add(
    "ship",
    `ship-${currShipData.orientation === VERTICAL ? "ver" : "hor"}`
  );
  shipDiv.addEventListener("drag", () => {
    EditManager.setCurrShip(id);
  });
  shipDiv.addEventListener("click", () => {
    EditManager.rotateShip(id);
    WebpageStructureManager.StartWithEditMode();
  });

  for (let i = 0; i < currShipData.ship.length; i += 1) {
    const shipCell = document.createElement("div");
    shipCell.style.cssText = `
                    width: 40px;
                    height: 40px;
                    background-color: #2a9134;
                    box-shadow: 0px 0px 4px #4195fc;
                  `;
    shipDiv.appendChild(shipCell);
  }
  return shipDiv;
};

export default DragableShip;
