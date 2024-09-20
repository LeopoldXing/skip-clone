import { useParams } from "react-router-dom";
import { useSearchRestaurant } from '../api/RestaurantApi.ts'
import SearchResultOverview from "@/components/SearchResultOverview.tsx";
import SearchResultCard from "@/components/SearchResultCard.tsx";
import { useState } from "react";
import SearchBar, { SearchForm } from "@/components/SearchBar.tsx";
import PaginationSelector from "@/components/PaginationSelector.tsx";

export type Conditions = {
  keyword: string;
  page: number;
  selectedCuisines: string[];
  sortOption: string;
};

const SearchPage = () => {
  const { city } = useParams();
  const [conditions, setConditions] = useState<Conditions>({
    keyword: '',
    page: 1,
    selectedCuisines: [],
    sortOption: 'bestMatch',
  });
  const { restaurantOverviewList, isLoading } = useSearchRestaurant(conditions, city);

  /**
   * reset the form
   */
  const resetSearchForm = () => {
    setConditions((prevState) => ({
      ...prevState,
      keyword: "",
      page: 1,
    }));
  }

  /**
   * submit the form
   * @param formData
   */
  const handleSubmit = (formData: SearchForm) => {
    setConditions(prevState => ({ ...prevState, keyword: formData.keyword, page: 1 }))
  }

  /**
   * pagination, change page
   */
  const handlePageChange = (number: number) => {
    setConditions(prevState => ({ ...prevState, page: number }))
  }

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
          {/*  search bar  */}
          <SearchBar keyword={conditions.keyword}
                     onSubmit={handleSubmit}
                     placeholder="Search by Cuisine or Restaurant Name"
                     onReset={resetSearchForm}/>
          <div className="flex justify-between flex-col gap-3 lg:flex-row">
            <SearchResultOverview total={restaurantOverviewList.pagination.total} city={city}/>
            Insert sorting dropdown
          </div>
          {/*  search result info  */}
          {restaurantOverviewList?.data.map(restaurant => (<SearchResultCard restaurant={restaurant}/>))}
          {/*  pagination  */}
          <PaginationSelector current={restaurantOverviewList.pagination.page} size={10} total={restaurantOverviewList.pagination.total}
                              onPageChange={handlePageChange}/>
        </div>
      </div>
  );
};

export default SearchPage;