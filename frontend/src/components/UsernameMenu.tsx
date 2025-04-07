import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu.tsx";
import { CircleUserRound } from "lucide-react";
import { useAuth0 } from "@auth0/auth0-react";
import { Link } from "react-router-dom";
import { Separator } from "@/components/ui/separator.tsx";
import { Button } from "@/components/ui/button.tsx";

const UsernameMenu = () => {
  const { user, logout } = useAuth0();

  return (
      <DropdownMenu>
        <DropdownMenuTrigger
            className="px-3 flex items-center font-bold hover:text-[#c14e2a] gap-2"
            aria-haspopup="menu"
        >
          <CircleUserRound className="text-[#c14e2a]" aria-hidden="true"/>
          {user?.email}
        </DropdownMenuTrigger>
        <DropdownMenuContent role="menu" aria-label="User menu">
          <DropdownMenuItem role="menuitem">
            <Link to="/manage-restaurant" className="font-bold hover:text-[#c14e2a]">
              Manage Restaurant
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem role="menuitem">
            <Link to="/user-profile" className="font-bold hover:text-[#c14e2a]">
              User Profile
            </Link>
          </DropdownMenuItem>
          <Separator role="separator"/>
          <DropdownMenuItem role="menuitem">
            <Button type="button" className="flex flex-1 font-bold bg-[#c14e2a]" onClick={() => logout()}>
              Log Out
            </Button>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
  );
};

export default UsernameMenu;
