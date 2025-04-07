import { Button } from "@/components/ui/button.tsx";
import { useAuth0 } from "@auth0/auth0-react";
import UsernameMenu from "@/components/UsernameMenu.tsx";
import { Link } from "react-router-dom";

const MainNav = () => {
  const { loginWithRedirect, isAuthenticated } = useAuth0();

  return (
      <nav aria-label="Main Navigation">
        <div className="flex space-x-2 items-center">
          {isAuthenticated ? (
              <>
                <Link to='/order-status' className="font-bold hover:text-[#c14e2a]">
                  Order Status
                </Link>
                <UsernameMenu/>
              </>
          ) : (
              <Button
                  variant="ghost"
                  className="font-bold hover:text-[#c14e2a] hover:bg-white"
                  onClick={async () => await loginWithRedirect()}
              >
                Log In
              </Button>
          )}
        </div>
      </nav>
  );
};

export default MainNav;
