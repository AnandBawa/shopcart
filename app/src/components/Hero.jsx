import { Link } from "react-router-dom";
import landing from "../assets/images/landing.svg";
import Logo from "./Logo";
import { Button } from "./ui/button";

const Hero = () => {
  return (
    <div className="grid lg:grid-cols-2 gap-16 items-center p-6">
      <div className="grid gap-10 justify-center lg:justify-end text-center">
        <Logo />
        <h1 className="text-base md:text-lg xl:text-3xl font-semibold tracking-tight">
          Your one-stop shop for all PC parts!
        </h1>
        <Button asChild className="place-self-center text-lg">
          <Link to="/products">Products</Link>
        </Button>
      </div>
      <div className="hidden lg:flex justify-start">
        <img src={landing} alt="landing" />
      </div>
    </div>
  );
};

export default Hero;
