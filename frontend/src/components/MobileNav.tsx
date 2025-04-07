import { Sheet, SheetContent, SheetDescription, SheetTitle, SheetTrigger } from "@/components/ui/sheet.tsx";
import { CircleUserRound, Menu } from "lucide-react";
import { Separator } from "@/components/ui/separator.tsx";
import { Button } from "@/components/ui/button.tsx";
import { useAuth0 } from "@auth0/auth0-react";
import MobileNavLinks from "@/components/MobileNavLinks.tsx";

const MobileNav = () => {
  const { isAuthenticated, loginWithRedirect, user } = useAuth0();

  return (
      <Sheet>
        <SheetTrigger aria-label="Open mobile navigation">
          <Menu className="text-[c14e2a]" aria-hidden="true"/>
        </SheetTrigger>
        <SheetContent
            className="space-y-3"
            role="dialog"
            aria-modal="true"
            aria-labelledby="sheet-title"
            aria-describedby="sheet-description"
        >
          <SheetTitle id="sheet-title">
            {isAuthenticated ? (
                <span className="flex items-center font-bold gap-2">
              <CircleUserRound className="text-[c14e2a]" aria-hidden="true"/>
                  {user?.email}
            </span>
            ) : (
                <span>Welcome to Logoipsum</span>
            )}
          </SheetTitle>
          <Separator/>
          <SheetDescription id="sheet-description" className="flex flex-col gap-4">
            {isAuthenticated ? (
                <MobileNavLinks/>
            ) : (
                <Button className="flex-1 font-bold bg-[#c14e2a]" onClick={() => loginWithRedirect()}>
                  Log In
                </Button>
            )}
          </SheetDescription>
        </SheetContent>
      </Sheet>
  );
};

export default MobileNav;
