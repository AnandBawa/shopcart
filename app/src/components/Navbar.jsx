import { NavLink, Link, useLoaderData } from "react-router-dom";
import { ShoppingCart } from "lucide-react";
import { Button } from "./ui/button";
import { Logo } from ".";
import AccountDropdown from "./AccountDropdown";
import NavDropdown from "./NavDropdown";
import ThemeToggle from "./ThemeToggle";
import { useHomeContext } from "@/pages/Home";

const Navbar = () => {
  const { user } = useLoaderData();
  const { cart } = useHomeContext();

  const { totalQuantity } = cart;

  return (
    <header className="sticky top-0 z-50 w-full border bg-secondary">
      <div className="flex mx-auto w-full md:max-w-[80vw] h-16 items-center md:justify-between">
        <div className="flex gap-4 items-center justify-start sm:w-[20%] md:w-[10%] lg:w-[50%]">
          <div className="flex lg:hidden">
            <NavDropdown />
          </div>
          <div className="hidden lg:flex">
            <Button
              variant="ghost"
              asChild
              className="text-base transition-all ease-in hover:scale-105 hover:text-primary"
            >
              <NavLink to="/">Home</NavLink>
            </Button>
            <Button
              variant="ghost"
              asChild
              className="text-base transition-all ease-in hover:scale-105 hover:text-primary"
            >
              <NavLink to="/products">Products</NavLink>
            </Button>
            <Button
              variant="ghost"
              asChild
              className="text-base transition-all ease-in hover:scale-105 hover:text-primary"
            >
              <NavLink to="/about">About</NavLink>
            </Button>
          </div>
        </div>
        <Link to="/" className="gap-4 items-center">
          <Logo width="200px" />
        </Link>
        <div className="flex gap-1 md:gap-4 items-center justify-end w-[50%]">
          {user && (
            <div className="hidden flex-shrink-0 xl:flex">
              <Button
                variant="ghost"
                asChild
                className="text-base transition-all ease-in hover:scale-105 hover:text-primary"
              >
                <NavLink to="/orders">Orders</NavLink>
              </Button>
            </div>
          )}
          <NavLink to="/cart">
            <Button
              variant="ghost"
              className="px-1 transition-all ease-in hover:scale-105 hover:text-primary relative"
            >
              <ShoppingCart />
              {totalQuantity > 0 && (
                <h1 className="absolute top-0 right-0 text-sm bg-background font-semibold tracking-wide text-primary px-[2px] rounded-lg">
                  {totalQuantity}
                </h1>
              )}
            </Button>
          </NavLink>
          <ThemeToggle />
          <div className="hidden md:flex">
            <AccountDropdown />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
