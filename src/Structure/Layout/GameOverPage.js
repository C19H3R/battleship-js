import BattleShipGame from "../../GameManager/GameManager";
import EditManager from "../EditPageManager";
import WebpageStructureManager from "../StructureManager";

const GameOverPage = () => {
  const resultTxt = BattleShipGame.playerGameResult;
  const mainDiv = document.createElement("main");
  const gameOverDiv = document.createElement("div");
  gameOverDiv.id = "game-over-page";

  const gameOverTitle = document.createElement("span");
  gameOverTitle.classList.add("game-over-title");
  gameOverTitle.innerText = "GAME OVER";

  const gameResult = document.createElement("span");
  gameResult.classList.add("game-result");
  gameResult.classList.add(resultTxt === "Won" ? "won" : "lost");
  const emoji = resultTxt === "Won" ? "🎉" : "⚰️";

  gameResult.textContent = `${emoji} PLAYER ${resultTxt} THE GAME ${emoji}`;

  const btnDiv = document.createElement("div");
  const restartBtn = document.createElement("button");
  restartBtn.classList.add("restart-btn");
  restartBtn.textContent = "RESTART";
  restartBtn.addEventListener("click", () => {
    EditManager.resetEditMode();
    WebpageStructureManager.LoadMenuPage();
  });
  btnDiv.appendChild(restartBtn);

  gameOverDiv.appendChild(gameOverTitle);
  gameOverDiv.appendChild(gameResult);
  gameOverDiv.appendChild(btnDiv);

  mainDiv.appendChild(gameOverDiv);
  return mainDiv;
};

export default GameOverPage;
