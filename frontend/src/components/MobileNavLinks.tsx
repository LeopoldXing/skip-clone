import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button.tsx";
import { useAuth0 } from "@auth0/auth0-react";

const MobileNavLinks = () => {
  const { logout } = useAuth0();

  return (
      <ul className="space-y-2">
        <li>
          <Link
              to="/order-status"
              className="flex items-center font-bold bg-white hover:text-[#c14e2a]"
          >
            Order Status
          </Link>
        </li>
        <li>
          <Link
              to="/manage-restaurant"
              className="flex items-center font-bold bg-white hover:text-[#c14e2a]"
          >
            My Restaurant
          </Link>
        </li>
        <li>
          <Link
              to="/user-profile"
              className="flex items-center font-bold bg-white hover:text-[#c14e2a]"
          >
            User Profile
          </Link>
        </li>
        <li>
          <Button
              type="button"
              className="px-3 flex items-center font-bold hover:bg-gray-500"
              onClick={() => logout()}
          >
            Log Out
          </Button>
        </li>
      </ul>
  );
};

export default MobileNavLinks;
