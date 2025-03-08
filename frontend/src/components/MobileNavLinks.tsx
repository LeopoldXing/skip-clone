import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button.tsx";
import { useAuth0 } from "@auth0/auth0-react";

const MobileNavLinks = () => {
  const { logout } = useAuth0();

  return (
      <>
        <Link to='/order-status' className='flex items-center font-bold bg-white hover:text-orange-500'>Order Status</Link>
        <Link to='/manage-restaurant' className='flex items-center font-bold bg-white hover:text-orange-500'>My Restaurant</Link>
        <Link to="/user-profile" className="flex items-center font-bold bg-white hover:text-orange-500">User Profile</Link>
        <Button className="px-3 flex items-center font-bold hover:bg-gray-500" onClick={() => logout()}>
          Log Out
        </Button>
      </>
  );
};

export default MobileNavLinks;
