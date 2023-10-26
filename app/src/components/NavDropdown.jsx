import { Link, useLocation } from "react-router-dom";
import {
  Menu,
  Map,
  ListOrdered,
  CreditCard,
  LogOut,
  LogIn,
  User,
  ShoppingBag,
  Info,
  Home,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useHomeContext } from "@/pages/Home";

const NavDropdown = () => {
  const location = useLocation();
  const pathname = location.pathname;
  const search = location.search;
  const { user, logout } = useHomeContext();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="px-2">
          <Menu />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-50">
        <DropdownMenuLabel>
          Hello, {user?.firstName || "User"}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <Link to="/">
            <DropdownMenuItem className="flex place-items-center w-full cursor-pointer transition-all ease-in hover:scale-105 hover:text-primary">
              <Home className="text-primary mr-2 h-4 w-4" />
              Home
            </DropdownMenuItem>
          </Link>
          <Link to="/products">
            <DropdownMenuItem className="flex place-items-center w-full cursor-pointer transition-all ease-in hover:scale-105 hover:text-primary">
              <ShoppingBag className="text-primary mr-2 h-4 w-4" />
              All Products
            </DropdownMenuItem>
          </Link>
        </DropdownMenuGroup>
        {user && (
          <div>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <Link to="/orders">
                <DropdownMenuItem className="flex place-items-center w-full cursor-pointer transition-all ease-in hover:scale-105 hover:text-primary">
                  <ListOrdered className="text-primary mr-2 h-4 w-4" />
                  Order History
                </DropdownMenuItem>
              </Link>
              <Link to="/profile">
                <DropdownMenuItem className="flex place-items-center w-full cursor-pointer transition-all ease-in hover:scale-105 hover:text-primary">
                  <User className="text-primary mr-2 h-4 w-4" />
                  Profile
                </DropdownMenuItem>
              </Link>
              <Link to="/payment-methods">
                <DropdownMenuItem className="flex place-items-center w-full cursor-pointer transition-all ease-in hover:scale-105 hover:text-primary">
                  <CreditCard className="text-primary mr-2 h-4 w-4" />
                  Payment Methods
                </DropdownMenuItem>
              </Link>
              <Link to="/address-book">
                <DropdownMenuItem className="flex place-items-center w-full cursor-pointer transition-all ease-in hover:scale-105 hover:text-primary">
                  <Map className="text-primary mr-2 h-4 w-4" />
                  Address Book
                </DropdownMenuItem>
              </Link>
            </DropdownMenuGroup>
          </div>
        )}
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <Link to="/about">
            <DropdownMenuItem className="flex place-items-center w-full cursor-pointer transition-all ease-in hover:scale-105 hover:text-primary">
              <Info className="text-primary mr-2 h-4 w-4" />
              About
            </DropdownMenuItem>
          </Link>
          {user ? (
            <DropdownMenuItem
              className="flex place-items-center w-full cursor-pointer transition-all ease-in hover:scale-105 hover:text-primary"
              onClick={logout}
            >
              <LogOut className="text-destructive mr-2 h-4 w-4" />
              <span>Log out</span>
            </DropdownMenuItem>
          ) : (
            <Link to="/login" state={{ from: pathname + search }}>
              <DropdownMenuItem className="flex place-items-center w-full cursor-pointer transition-all ease-in hover:scale-105 hover:text-primary">
                <LogIn className="text-primary mr-2 h-4 w-4" />
                Log In
              </DropdownMenuItem>
            </Link>
          )}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default NavDropdown;

{
  /* <Button variant="ghost">
  <Menu />
</Button>; */
}
