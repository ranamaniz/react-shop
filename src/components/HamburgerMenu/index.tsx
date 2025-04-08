import "./style.scss";

const HamburgerMenu = ({
  onClick,
  className = "",
}: {
  onClick: () => void;
  className: string;
}) => {
  return (
    <div className={`hamburger-menu__container ${className}`}>
      <button className={`hamburger-menu `} onClick={onClick}>
        <span></span>
        <span></span>
        <span></span>
      </button>
    </div>
  );
};

export default HamburgerMenu;
