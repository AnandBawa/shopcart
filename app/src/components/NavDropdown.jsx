import { NavLink, useLoaderData } from "react-router-dom";
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
  const { logout } = useHomeContext();
  const { user } = useLoaderData();

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
          <NavLink to="/">
            <DropdownMenuItem className="flex place-items-center w-full cursor-pointer transition-all ease-in hover:scale-105 hover:text-primary">
              <Home className="mr-2 h-4 w-4" />
              Home
            </DropdownMenuItem>
          </NavLink>
          <NavLink to="/products">
            <DropdownMenuItem className="flex place-items-center w-full cursor-pointer transition-all ease-in hover:scale-105 hover:text-primary">
              <ShoppingBag className="mr-2 h-4 w-4" />
              All Products
            </DropdownMenuItem>
          </NavLink>
        </DropdownMenuGroup>
        {user && (
          <div>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <NavLink to="/orders">
                <DropdownMenuItem className="flex place-items-center w-full cursor-pointer transition-all ease-in hover:scale-105 hover:text-primary">
                  <ListOrdered className="mr-2 h-4 w-4" />
                  Order History
                </DropdownMenuItem>
              </NavLink>
              <NavLink to="/profile">
                <DropdownMenuItem className="flex place-items-center w-full cursor-pointer transition-all ease-in hover:scale-105 hover:text-primary">
                  <User className="mr-2 h-4 w-4" />
                  Profile
                </DropdownMenuItem>
              </NavLink>
              <NavLink to="/payment-methods">
                <DropdownMenuItem className="flex place-items-center w-full cursor-pointer transition-all ease-in hover:scale-105 hover:text-primary">
                  <CreditCard className="mr-2 h-4 w-4" />
                  Payment Methods
                </DropdownMenuItem>
              </NavLink>
              <NavLink to="/address-book">
                <DropdownMenuItem className="flex place-items-center w-full cursor-pointer transition-all ease-in hover:scale-105 hover:text-primary">
                  <Map className="mr-2 h-4 w-4" />
                  Address Book
                </DropdownMenuItem>
              </NavLink>
            </DropdownMenuGroup>
          </div>
        )}
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <NavLink to="/about">
            <DropdownMenuItem className="flex place-items-center w-full cursor-pointer transition-all ease-in hover:scale-105 hover:text-primary">
              <Info className="mr-2 h-4 w-4" />
              About
            </DropdownMenuItem>
          </NavLink>
          {user ? (
            <DropdownMenuItem
              className="flex place-items-center w-full cursor-pointer transition-all ease-in hover:scale-105 hover:text-primary"
              onClick={logout}
            >
              <LogOut className="mr-2 h-4 w-4" />
              <span>Log out</span>
            </DropdownMenuItem>
          ) : (
            <NavLink to="/login">
              <DropdownMenuItem className="flex place-items-center w-full cursor-pointer transition-all ease-in hover:scale-105 hover:text-primary">
                <LogIn className="mr-2 h-4 w-4" />
                Log In
              </DropdownMenuItem>
            </NavLink>
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
