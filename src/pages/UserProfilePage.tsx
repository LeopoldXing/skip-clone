import UserProfileForm from "@/forms/user-profile-form/UserProfileForm.tsx";
import { useGetMyUser, useUpdateMyUser } from "@/api/MyUserApi.ts";

const UserProfilePage = () => {
  const { currentUser, isLoading: isGettingUser } = useGetMyUser();
  const { updateUser, isLoading: isUpdatingUser } = useUpdateMyUser();

  if (isGettingUser) {
    return <span>Loading...</span>
  }

  return (
      <UserProfileForm onSave={updateUser} isLoading={isUpdatingUser}/>
  );
};

export default UserProfilePage;
