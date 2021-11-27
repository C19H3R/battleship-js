const Header = () => {
  const HeaderTag = document.createElement("header");
  HeaderTag.innerHTML = `<span id="project-title">BATTLESHIP</span>`;
  return HeaderTag;
};

export default Header;
