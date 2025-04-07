import { useAuth0 } from "@auth0/auth0-react";
import { useLocation } from "react-router-dom";
import { Button } from "./ui/button";
import LoadingButton from "./LoadingButton";
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from "./ui/dialog";
import UserProfileForm, { UserFormData } from "@/forms/user-profile-form/UserProfileForm";
import { useGetMyUser } from "@/api/MyUserApi";
import * as VisuallyHidden from '@radix-ui/react-visually-hidden';

type Props = {
  onCheckout: (userFormData: UserFormData) => void;
  disabled: boolean;
  isLoading: boolean;
};

const CheckoutButton = ({ onCheckout, disabled, isLoading }: Props) => {
  const { isAuthenticated, isLoading: isAuthLoading, loginWithRedirect } = useAuth0();
  const { pathname } = useLocation();
  const { currentUser, isLoading: isGetUserLoading } = useGetMyUser();

  const onLogin = async () => {
    await loginWithRedirect({
      appState: {
        returnTo: pathname,
      },
    });
  };

  if (!isAuthenticated) {
    return (
        <Button onClick={onLogin} className="bg-[#e5683b] flex-1">
          Log in to check out
        </Button>
    );
  }

  if (isAuthLoading || !currentUser || isLoading) {
    return <LoadingButton/>;
  }

  return (
      <Dialog>
        <VisuallyHidden.Root>
          <DialogTitle id="dialog-title">Confirm Delivery Details</DialogTitle>
          <DialogDescription id="dialog-description">
            Dialog for confirming delivery details
          </DialogDescription>
        </VisuallyHidden.Root>
        <DialogTrigger asChild>
          <Button disabled={disabled} className="bg-[#e5683b] flex-1" aria-haspopup="dialog">
            Go to checkout
          </Button>
        </DialogTrigger>
        <DialogContent
            className="max-w-[425px] md:min-w-[700px] bg-gray-50"
            role="dialog"
            aria-modal="true"
            aria-labelledby="dialog-title"
            aria-describedby="dialog-description"
        >
          <UserProfileForm
              currentUser={currentUser}
              onSave={onCheckout}
              isLoading={isGetUserLoading}
              title="Confirm Delivery Details"
              buttonText="Continue to payment"
          />
        </DialogContent>
      </Dialog>
  );
};

export default CheckoutButton;
