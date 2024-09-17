import { useParams } from "react-router-dom";
import { useSearchRestaurant } from '../api/RestaurantApi.ts'

export type Conditions = {
  keyword: string;
  page: number;
  selectedCuisines: string[];
  sortOption: string;
};

const SearchPage = () => {
  const { city } = useParams();
  const { restaurantOverviewList } = useSearchRestaurant(city);
  console.log("restaurantOverviewList");
  console.log(restaurantOverviewList)

  return (
      <div>
        <h1>Search Page</h1>
        <span>city: {city}</span>
      </div>
  );
};

export default SearchPage;