import UserProfileForm from "@/forms/user-profile-form/UserProfileForm.tsx";
import { useGetMyUser, useUpdateMyUser } from "@/api/MyUserApi.ts";
import { useEffect } from "react";

const UserProfilePage = () => {
  useEffect(() => {
    document.title = 'My Profile';
  }, []);

  const { currentUser } = useGetMyUser();
  const { updateUser, isLoading: isUpdatingUser } = useUpdateMyUser();

  if (!currentUser) {
    return <p role="status">Loading...</p>;
  }

  return (
      <section role="main" aria-label="User Profile">
        <UserProfileForm onSave={updateUser} isLoading={isUpdatingUser} currentUser={currentUser}/>
      </section>
  );
};

export default UserProfilePage;
