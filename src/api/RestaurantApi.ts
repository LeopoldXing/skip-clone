import { RestaurantSearchOverview } from "@/types.ts";
import { useQuery } from "react-query";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

/**
 * search restaurant hook
 * @param city
 */
const useSearchRestaurant = (city?: string) => {
  const searchRestaurantRequest = async (): Promise<RestaurantSearchOverview> => {
    const params = new URLSearchParams();

    const response = await fetch(`${BASE_URL}/api/restaurant/search/${city}?${params.toString()}`, { method: 'GET' })

    if (!response.ok) {
      throw new Error('Error fetching search result');
    }

    return response.json();
  }

  const { data: restaurantOverviewList, isLoading } = useQuery(
      ['searchRestaurantRequest'],
      searchRestaurantRequest,
      { enabled: !!city }
  )

  return { restaurantOverviewList, isLoading };
}

export { useSearchRestaurant };