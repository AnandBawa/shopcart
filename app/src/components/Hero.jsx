import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import landing from "../assets/images/landing.svg";
import Logo from "@/components/Logo";

// Hero component for landing page
const Hero = () => {
  return (
    <div className="grid lg:grid-cols-2 gap-8 lg:gap-0 items-center p-6">
      <div className=" place-self-center">
        <img src={landing} alt="landing" />
      </div>
      <div className="grid gap-10 place-self-center text-center">
        <div className="hidden lg:flex justify-center">
          <Logo />
        </div>
        <div className="grid text-center gap-4 xl:gap-8">
          <h1 className="text-base sm:text-lg md:text-xl xl:text-3xl font-semibold tracking-tighter">
            Your one-stop shop for all your PC needs!
          </h1>
          <Button
            asChild
            className="place-self-center text-base transition-all ease-in hover:scale-110"
          >
            <Link to="/products">Products</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Hero;
