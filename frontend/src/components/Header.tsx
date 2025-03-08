import { Link } from "react-router-dom";
import MobileNav from "@/components/MobileNav.tsx";
import MainNav from "@/components/MainNav.tsx";
import Logo from "@/assets/logo.svg";

const Header = () => {
  return (
      <div className="border-b-2 border-b-orange-500 py-6">
        <div className="container max-auto flex justify-between items-center">
          <Link className="text-3xl font-bold tracking-tight text-orange-500" to="/">
            <img src={Logo} alt="logo" className="h-6"/>
          </Link>
          <div className="block md:hidden">
            <MobileNav/>
          </div>
          <div className="hidden md:block">
            <MainNav/>
          </div>
        </div>
      </div>
  );
};

export default Header;
