import { useParams } from "react-router-dom";
import { useSearchRestaurant } from '../api/RestaurantApi.ts'
import SearchResultOverview from "@/components/SearchResultOverview.tsx";

export type Conditions = {
  keyword: string;
  page: number;
  selectedCuisines: string[];
  sortOption: string;
};

const SearchPage = () => {
  const { city } = useParams();
  const { restaurantOverviewList, isLoading } = useSearchRestaurant(city);

  if (isLoading) return '<span>Loading...</span>';

  if (!restaurantOverviewList?.data || !city) return '<span>No restaurants found</span>';

  return (
      <div className="grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-5">
        {/*  cuisine list  */}
        <div id="cuisines-list">
          Insert cuisine here
        </div>
        {/*  main content  */}
        <div id="main-content" className="flex flex-col gap-5">
          <div className="flex justify-between flex-col gap-3 lg:flex-row">
            <SearchResultOverview total={restaurantOverviewList.pagination.total} city={city}/>
          </div>
        </div>
        {/*  search result info  */}
      </div>
  );
};

export default SearchPage;