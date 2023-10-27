import logo from "../assets/images/logo.svg";

// Logo component
const Logo = ({ width = "auto" }) => {
  return (
    <img
      src={logo}
      width={width}
      alt="ShopCart"
      className="transition-all ease-in hover:scale-105"
    />
  );
};

export default Logo;
