import { useMutation } from "react-query";
import { useAuth0 } from "@auth0/auth0-react";
import { toast } from "sonner";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

type CreateUserRequest = {
  auth0Id: string;
  email: string;
}

const useCreateMyUser = () => {
  const { getAccessTokenSilently } = useAuth0();

  const createUserRequest = async (user: CreateUserRequest) => {
    const accessToken = await getAccessTokenSilently();
    const response = await fetch(`${BASE_URL}/api/my/user`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`
      },
      body: JSON.stringify(user)
    });
    if (!response.ok) {
      throw new Error("Failed to create user");
    }
  }

  const { mutateAsync: createUser, isLoading, isError, isSuccess } = useMutation(createUserRequest);
  return { createUser, isLoading, isError, isSuccess };
}

type UpdateMyUserRequest = {
  name: string;
  addressLine1: string;
  city: string;
  country: string;
}
const useUpdateMyUser = () => {
  const { getAccessTokenSilently } = useAuth0();

  const updateMyUserRequest = async (formData: UpdateMyUserRequest) => {
    const accessToken = await getAccessTokenSilently();

    const response = await fetch(`${BASE_URL}/api/my/user`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`
      },
      body: JSON.stringify(formData)
    });

    if (!response.ok) {
      throw new Error("Failed to update user");
    } else {
      return await response.json();
    }
  }

  const { mutateAsync: updateUser, isLoading, error, isError, isSuccess, reset } = useMutation(updateMyUserRequest);

  if (isSuccess) {
    toast.success("User profile updated!");
  } else if (isError) {
    toast.error(`Failed to update: ${error.toString()}`);
    reset();
  }

  return { updateUser, isLoading, isError, isSuccess };
}

export { useCreateMyUser, useUpdateMyUser };
