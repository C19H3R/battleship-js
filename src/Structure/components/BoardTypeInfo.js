const BoardTypeInfo = (boardName) => {
  const boardInfo = document.createElement("h2");
  boardInfo.innerText = boardName;

  return boardInfo;
};
export default BoardTypeInfo;
