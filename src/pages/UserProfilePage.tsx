import UserProfileForm from "@/forms/user-profile-form/UserProfileForm.tsx";
import { useGetMyUser, useUpdateMyUser } from "@/api/MyUserApi.ts";
import { useEffect } from "react";

const UserProfilePage = () => {
  useEffect(() => {
    document.title = 'My Profile'
  }, []);

  const { currentUser } = useGetMyUser();
  const { updateUser, isLoading: isUpdatingUser } = useUpdateMyUser();

  if (!currentUser) {
    return <span>Loading...</span>
  }

  return (
      <UserProfileForm onSave={updateUser} isLoading={isUpdatingUser} currentUser={currentUser}/>
  );
};

export default UserProfilePage;
