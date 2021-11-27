import Board, { BOARD_MODE } from "../components/Board";
import BoardTitle from "../components/BoardTypeInfo";
import LivesBar from "../components/LivesBar";
import BattleShipGame from "../../GameManager/GameManager";

const PlayPage = () => {
  const mainDiv = document.createElement("main");
  const playPageDiv = document.createElement("div");
  playPageDiv.id = "play-page";

  const getBoardContainer = (type) => {
    const containerDiv = document.createElement("div");
    containerDiv.classList.add("board-container");
    containerDiv.appendChild(Board(type));
    const statsDiv = document.createElement("div");
    statsDiv.classList.add("stats");
    statsDiv.appendChild(
      BoardTitle(`${type === BOARD_MODE.PLAYER ? "Your" : "Enemy"} Board`)
    );
    statsDiv.appendChild(
      LivesBar(
        type === BOARD_MODE.PLAYER
          ? BattleShipGame.PlayerLivesLeft
          : BattleShipGame.CpuLivesLeft
      )
    );
    containerDiv.appendChild(statsDiv);
    return containerDiv;
  };
  const divider = document.createElement("div");
  divider.classList.add("divider");

  playPageDiv.appendChild(getBoardContainer(BOARD_MODE.PLAYER));
  playPageDiv.appendChild(divider);
  playPageDiv.appendChild(getBoardContainer(BOARD_MODE.ENEMY));
  mainDiv.appendChild(playPageDiv);
  return mainDiv;
};

export default PlayPage;
