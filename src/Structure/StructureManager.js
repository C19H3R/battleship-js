import Footer from "./components/Footer";
import Header from "./components/Header";
import EditPage from "./Layout/EditPage";
import GameOverPage from "./Layout/GameOverPage";
import PlayPage from "./Layout/PlayPage";
import StartPage from "./Layout/StartPage";

const PAGE_STATE = {
  START_AUTOPLACE: "AutoPlace",
  START_EDITMODE: "EditMode",
  INGAME: "ingame",
  MENU_MODE: "Menu",
  GAMEOVER: "GameOver",
};

const StructureManager = () => {
  let currMode = PAGE_STATE.MENU_MODE;
  const ReloadPage = () => {
    const mainDiv = document.getElementById("content");
    let child = mainDiv.lastElementChild;
    while (child) {
      mainDiv.removeChild(child);
      child = mainDiv.lastElementChild;
    }
    mainDiv.appendChild(Header());

    switch (currMode) {
      case PAGE_STATE.START_AUTOPLACE: {
        mainDiv.appendChild(PlayPage());
        break;
      }
      case PAGE_STATE.START_EDITMODE: {
        mainDiv.appendChild(EditPage());
        break;
      }
      case PAGE_STATE.MENU_MODE: {
        mainDiv.appendChild(StartPage());
        break;
      }
      case PAGE_STATE.INGAME: {
        mainDiv.appendChild(PlayPage());
        break;
      }
      case PAGE_STATE.GAMEOVER: {
        mainDiv.appendChild(GameOverPage());
        break;
      }
      default:
        break;
    }
    mainDiv.appendChild(Footer());
  };
  const StartWithAutoPlace = () => {
    currMode = PAGE_STATE.START_AUTOPLACE;
    ReloadPage();
  };
  const StartWithEditMode = () => {
    currMode = PAGE_STATE.START_EDITMODE;
    ReloadPage();
  };
  const LoadGameOverPage = () => {
    currMode = PAGE_STATE.GAMEOVER;
    ReloadPage();
  };
  const ReloadGamePage = () => {
    currMode = PAGE_STATE.INGAME;
    ReloadPage();
  };
  const LoadMenuPage = () => {
    currMode = PAGE_STATE.MENU_MODE;
    ReloadPage();
  };
  return {
    LoadMenuPage,
    StartWithAutoPlace,
    StartWithEditMode,
    LoadGameOverPage,
    ReloadGamePage,
  };
};
const WebpageStructureManager = StructureManager();

export default WebpageStructureManager;
