import { Link, useLocation } from "react-router-dom";
import {
  Map,
  ListOrdered,
  CreditCard,
  LogOut,
  User,
  UserCircle,
  ChevronDown,
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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useHomeContext } from "@/pages/Home";

// Account Dropdown component for the Navbar (right-side) with links to pages that can only be accessed when logged in
const AccountDropdown = () => {
  const { user, logout } = useHomeContext();

  // display the dropdown only is user is logged in
  if (user) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="flex gap-4 text-base transition-all ease-in hover:scale-105 hover:text-primary"
          >
            {user?.image?.url ? (
              <Avatar>
                <AvatarImage src={user.image.url} />
                <AvatarFallback>U</AvatarFallback>
              </Avatar>
            ) : (
              <UserCircle />
            )}
            {user.firstName}
            <ChevronDown />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-50">
          <DropdownMenuLabel className="cursor-default">
            Account
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <Link to="/orders">
              <DropdownMenuItem className="flex place-items-center w-full cursor-pointer transition-all ease-in hover:scale-105 hover:text-primary">
                <ListOrdered className="text-primary mr-2 h-4 w-4" />
                <span>Order History</span>
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
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={logout}
            className="flex place-items-center w-full cursor-pointer transition-all ease-in hover:scale-105 hover:text-primary"
          >
            <LogOut className="text-destructive mr-2 h-4 w-4" />
            <span>Log out</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }

  // useLocation hook to save the current URL path that is passed on to Login page. When the user logs in, they are redirected to the page they were on before the login
  const location = useLocation();
  const pathname = location.pathname;
  const search = location.search;

  // if no user is logged in, display a login button
  return (
    <Button asChild>
      <Link to="/login" state={{ from: pathname + search }}>
        Login
      </Link>
    </Button>
  );
};

export default AccountDropdown;
