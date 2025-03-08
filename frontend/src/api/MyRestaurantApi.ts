import { useAuth0 } from "@auth0/auth0-react";
import { useMutation, useQuery } from "react-query";
import { toast } from "sonner";
import { Order, Restaurant } from "@/types.ts";

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

/**
 * get all my restaurant's orders
 */
const useGetMyRestaurantOrders = () => {
  const { getAccessTokenSilently } = useAuth0();

  const getMyRestaurantOrdersRequest = async (): Promise<Order[]> => {
    const accessToken = await getAccessTokenSilently();
    const response = await fetch(`${BASE_URL}/api/my/restaurant/orders`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`
      }
    });
    if (!response.ok) {
      throw new Error('Failed to retrieve restaurant\'s orders');
    }
    return response.json();
  }

  const { data: myRestaurantOrders, isLoading } = useQuery('fetchMyRestaurantOrders', getMyRestaurantOrdersRequest);

  return { myRestaurantOrders, isLoading };
}

/**
 * update order status
 */
type updateOrderStatusProps = {
  orderId: string,
  status: string
}
const useUpdateMyRestaurantOrder = () => {
  const { getAccessTokenSilently } = useAuth0();

  const updateMyRestaurantOrderRequest = async ({ orderId, status }: updateOrderStatusProps): Promise<Restaurant> => {
    const accessToken = await getAccessTokenSilently();
    const response = await fetch(`${BASE_URL}/api/my/restaurant/order/${orderId}/status`, {
      method: 'put',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ status })
    })
    if (!response.ok) {
      throw new Error("Failed to update restaurant order");
    }
    return response.json();
  }

  const { mutateAsync: updateOrderStatus, isLoading, isError, isSuccess, reset } = useMutation(updateMyRestaurantOrderRequest);

  if (isError) {
    toast.error("Failed to update order");
    reset();
  }
  if (isSuccess) {
    toast.success("Order status updated successfully!");
  }

  return { updateOrderStatus, isLoading };
}

export { useCreateMyRestaurant, useGetMyRestaurant, useUpdateMyRestaurant, useGetMyRestaurantOrders, useUpdateMyRestaurantOrder };
