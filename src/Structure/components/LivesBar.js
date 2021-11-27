import lifeImg from "../../assets/images/ship-wheel.png";

const LivesBar = (noOfLives) => {
  console.log(noOfLives);
  const LivesBarDiv = document.createElement("div");
  LivesBarDiv.classList.add("lives-container");
  console.log(lifeImg);

  for (let i = 0; i < 5; i += 1) {
    const lifeImgTag = document.createElement("img");
    lifeImgTag.src = lifeImg;
    if (i > noOfLives - 1) {
      lifeImgTag.classList.add("live-over");
    }
    LivesBarDiv.appendChild(lifeImgTag);
  }
  return LivesBarDiv;
};

export default LivesBar;
