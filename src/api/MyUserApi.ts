import { useMutation } from "react-query";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

type CreateUserRequest = {
  auth0Id: string;
  email: string;
}

const useCreateMyUser = () => {
  const createUserRequest = async (user: CreateUserRequest) => {
    const response = await fetch(`${BASE_URL}/api/my/user`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
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

export { useCreateMyUser };
