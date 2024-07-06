import { Link } from "react-router-dom";
import MobileNav from "@/components/MobileNav.tsx";

const Header = () => {
  return (
      <div className="border-b-2 border-b-orange-500 py-6">
        <div className="container max-auto flex justify-between items-center">
          <Link className="text-3xl font-bold tracking-tight text-orange-500" to="/">
            QUICKBITE
          </Link>
          <div className="block md:hidden">
            <MobileNav/>
          </div>
        </div>
      </div>
  );
};

export default Header;
