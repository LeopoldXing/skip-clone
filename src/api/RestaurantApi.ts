import { Restaurant, RestaurantSearchOverview } from "@/types.ts";
import { useQuery } from "react-query";
import { Conditions } from "@/pages/SearchPage.tsx";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

/**
 * get restaurant details
 * @param restaurantId
 */
const useGetRestaurant = (restaurantId?: string) => {
  const getRestaurantByIdRequest = async (): Promise<Restaurant> => {
    const response = await fetch(
        `${BASE_URL}/api/restaurant/${restaurantId}`
    );

    if (!response.ok) {
      throw new Error("Failed to get restaurant");
    }

    return response.json();
  };

  const { data: restaurant, isLoading } = useQuery(
      "fetchRestaurant",
      getRestaurantByIdRequest,
      {
        enabled: !!restaurantId,
      }
  );

  return { restaurant, isLoading };
};

/**
 * search restaurant hook
 * @param city
 * @param conditions
 */
const useSearchRestaurant = (conditions: Conditions, city?: string) => {
  const searchRestaurantRequest = async (): Promise<RestaurantSearchOverview> => {
    const params = new URLSearchParams();

    params.set("keyword", conditions.keyword);
    params.set("page", conditions.page.toString());
    params.set("selectedCuisines", conditions.selectedCuisines.join(','));
    params.set("sortOption", conditions.sortOption);

    const response = await fetch(`${BASE_URL}/api/restaurant/search/${city}?${params.toString()}`, { method: 'GET' })

    if (!response.ok) {
      throw new Error('Error fetching search result');
    }

    return response.json();
  }

  const { data: restaurantOverviewList, isLoading } = useQuery(
      ['searchRestaurantRequest', conditions],
      searchRestaurantRequest,
      { enabled: !!city }
  )

  return { restaurantOverviewList, isLoading };
}

export { useSearchRestaurant, useGetRestaurant };