import logo from "../assets/images/logo.svg";

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
