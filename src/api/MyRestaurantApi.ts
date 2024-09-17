import { useAuth0 } from "@auth0/auth0-react";
import { useMutation, useQuery } from "react-query";
import { toast } from "sonner";
import { Restaurant } from "@/types.ts";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

/**
 * get my restaurant hook
 */
const useGetMyRestaurant = () => {
  const { getAccessTokenSilently } = useAuth0();

  const getMyRestaurantRequest = async (): Promise<Restaurant> => {
    const accessToken = await getAccessTokenSilently();

    const response = await fetch(`${BASE_URL}/api/my/restaurant`, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    });
    if (!response.ok) {
      throw new Error("Failed to get restaurant info");
    }
    return response.json();
  }

  const { data: restaurant, isLoading } = useQuery("fetchMyRestaurant", getMyRestaurantRequest);
  return { restaurant, isLoading };
}

/**
 * create my restaurant hook
 */
const useCreateMyRestaurant = () => {
  const { getAccessTokenSilently } = useAuth0();

  const createMyRestaurantRequest = async (restaurantFormData: FormData): Promise<Restaurant> => {
    const accessToken = await getAccessTokenSilently();

    const response = await fetch(`${BASE_URL}/api/my/restaurant`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`
      },
      body: restaurantFormData
    });
    if (!response.ok) {
      throw new Error("Failed to create restaurant");
    }
    return response.json();
  }

  const { mutateAsync: createRestaurant, isLoading, isSuccess, isError } = useMutation(createMyRestaurantRequest);
  if (isError) {
    toast.error("Failed to create restaurant");
  }
  if (isSuccess) {
    toast.success("Restaurant created successfully!");
  }

  return { createRestaurant, isLoading: isLoading };
}

/**
 * update my restaurant api
 */
const useUpdateMyRestaurant = () => {
  const { getAccessTokenSilently } = useAuth0();

  const updateMyRestaurantRequest = async (restaurantFormData: FormData): Promise<Restaurant> => {
    const accessToken = await getAccessTokenSilently();
    const response = await fetch(`${BASE_URL}/api/my/restaurant`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${accessToken}`
      },
      body: restaurantFormData
    })
    if (!response.ok) {
      throw new Error("Failed to update restaurant");
    }
    return response.json();
  }

  const { mutateAsync: updateMyRestaurant, isLoading, isError, isSuccess, reset } = useMutation(updateMyRestaurantRequest);
  if (isError) {
    toast.error("Failed to update restaurant");
  }
  if (isSuccess) {
    toast.success("Restaurant updated successfully!");
  }
  return { updateRestaurant: updateMyRestaurant, isLoading, isError, reset, isSuccess };
}

export { useCreateMyRestaurant, useGetMyRestaurant, useUpdateMyRestaurant };
