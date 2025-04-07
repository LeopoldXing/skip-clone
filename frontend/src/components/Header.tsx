import { Link } from "react-router-dom";
import MobileNav from "@/components/MobileNav.tsx";
import MainNav from "@/components/MainNav.tsx";
import Logo from "@/assets/logo.svg";

const Header = () => {
  return (
      <header className="border-b-2 border-b-[#c14e2a] py-6">
        <div className="container mx-auto flex justify-between items-center">
          <Link to="/" aria-label="Go to homepage">
            <img src={Logo} alt="Logoipsum logo" className="h-6"/>
          </Link>
          <div className="block md:hidden">
            <MobileNav/>
          </div>
          <div className="hidden md:block">
            <MainNav/>
          </div>
        </div>
      </header>
  );
};

export default Header;
