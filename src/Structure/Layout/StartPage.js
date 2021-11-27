import Board, { BOARD_MODE } from "../components/Board";
import WebpageStructureManager from "../StructureManager";

const StartPage = () => {
  let isAutoplace = false;

  const mainDiv = document.createElement("main");

  const StartPageDiv = document.createElement("div");
  StartPageDiv.id = "start-page";

  const boardMenu = Board(BOARD_MODE.MENU_DISPLAY);
  const startMenu = document.createElement("div");
  startMenu.classList.add("start-menu");
  const checkBoxcontainer = document.createElement("div");
  checkBoxcontainer.id = "autoplace-container";
  const checkBoxInput = document.createElement("input");
  checkBoxInput.type = "checkbox";
  checkBoxInput.checked = isAutoplace;
  checkBoxInput.addEventListener("change", () => {
    isAutoplace = checkBoxInput.checked;
  });
  const inputLabel = document.createElement("label");
  inputLabel.textContent = "AutoPlace";
  checkBoxcontainer.appendChild(checkBoxInput);
  checkBoxcontainer.appendChild(inputLabel);

  const startButton = document.createElement("button");
  startButton.textContent = "START GAME";
  startButton.id = "start-btn";

  startButton.addEventListener("click", () => {
    if (isAutoplace) {
      WebpageStructureManager.StartWithAutoPlace();
    } else {
      WebpageStructureManager.StartWithEditMode();
    }
  });
  startMenu.appendChild(checkBoxcontainer);
  startMenu.appendChild(startButton);

  StartPageDiv.appendChild(boardMenu);
  StartPageDiv.appendChild(startMenu);
  mainDiv.appendChild(StartPageDiv);

  return mainDiv;
};
export default StartPage;
