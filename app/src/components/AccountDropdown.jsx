import { Link } from "react-router-dom";
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
import { useHomeContext } from "@/pages/Home";

const AccountDropdown = () => {
  const { user, logoutUser } = useHomeContext();

  if (user) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="flex gap-4 text-base">
            <UserCircle />
            {user.name}
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
              <DropdownMenuItem className="flex place-items-center w-full cursor-pointer">
                <ListOrdered className="mr-2 h-4 w-4" />
                <span>Order History</span>
              </DropdownMenuItem>
            </Link>
            <Link to="/profile">
              <DropdownMenuItem className="flex place-items-center w-full cursor-pointer">
                <User className="mr-2 h-4 w-4" />
                Profile
              </DropdownMenuItem>
            </Link>
            <Link to="/payment-methods">
              <DropdownMenuItem className="flex place-items-center w-full cursor-pointer">
                <CreditCard className="mr-2 h-4 w-4" />
                Payment Methods
              </DropdownMenuItem>
            </Link>
            <Link to="/address-book">
              <DropdownMenuItem className="flex place-items-center w-full cursor-pointer">
                <Map className="mr-2 h-4 w-4" />
                Address Book
              </DropdownMenuItem>
            </Link>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={logoutUser}
            className="flex place-items-center w-full cursor-pointer"
          >
            <LogOut className="mr-2 h-4 w-4" />
            <span>Log out</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }

  return (
    <Button asChild>
      <Link to="/login">Login</Link>
    </Button>
  );
};

export default AccountDropdown;
