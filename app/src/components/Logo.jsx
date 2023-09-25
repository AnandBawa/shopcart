import logo from "../assets/images/logo.svg";

const Logo = ({ width = "auto" }) => {
  return <img src={logo} width={width} alt="ShopCart" />;
};

export default Logo;
