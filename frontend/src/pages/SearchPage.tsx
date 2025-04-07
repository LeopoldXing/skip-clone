import { useParams } from "react-router-dom";
import { useSearchRestaurant } from "../api/RestaurantApi.ts";
import SearchResultOverview from "@/components/SearchResultOverview.tsx";
import SearchResultCard from "@/components/SearchResultCard.tsx";
import { useEffect, useState } from "react";
import SearchBar, { SearchForm } from "@/components/SearchBar.tsx";
import PaginationSelector from "@/components/PaginationSelector.tsx";
import CuisineFilter from "@/components/CuisineFilter.tsx";
import SortOptionDropdown from "@/components/SortOptionDropDown.tsx";

export type Conditions = {
  keyword: string;
  page: number;
  selectedCuisines: string[];
  sortOption: string;
};

const SearchPage = () => {
  useEffect(() => {
    document.title = 'Search Restaurants';
  }, []);

  const { city } = useParams();
  const [conditions, setConditions] = useState<Conditions>({
    keyword: '',
    page: 1,
    selectedCuisines: [],
    sortOption: 'bestMatch',
  });
  const { restaurantOverviewList, isLoading } = useSearchRestaurant(conditions, city);

  const resetSearchForm = () => {
    setConditions((prevState) => ({
      ...prevState,
      keyword: "",
      page: 1,
    }));
  };

  const handleSubmit = (formData: SearchForm) => {
    setConditions(prevState => ({ ...prevState, keyword: formData.keyword, page: 1 }));
  };

  const handlePageChange = (number: number) => {
    setConditions(prevState => ({ ...prevState, page: number }));
  };

  const handleCuisineSelect = (selectedCuisines: string[]) => {
    setConditions((prevState) => ({
      ...prevState,
      selectedCuisines,
      page: 1,
    }));
  };

  const [isExpanded, setIsExpanded] = useState(false);

  if (isLoading) return <p role="status">Loading...</p>;
  if (!restaurantOverviewList?.data || !city) return <p role="status">No restaurants found</p>;

  return (
      <section role="main" aria-label="Search Restaurants">
        <div className="grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-5">
          <section id="cuisines-list" aria-label="Cuisine Filters">
            <CuisineFilter
                onChange={handleCuisineSelect}
                selectedCuisines={conditions.selectedCuisines}
                isExpanded={isExpanded}
                onExpandClick={() => setIsExpanded((prevIsExpanded) => !prevIsExpanded)}
            />
          </section>
          <section id="main-content" aria-label="Search Results" className="flex flex-col gap-5">
            <SearchBar
                keyword={conditions.keyword}
                onSubmit={handleSubmit}
                placeholder="Search by Cuisine or Restaurant Name"
                onReset={resetSearchForm}
            />
            <div className="flex justify-between flex-col gap-3 lg:flex-row">
              <SearchResultOverview total={restaurantOverviewList.pagination.total} city={city}/>
              <SortOptionDropdown
                  sortOption={conditions.sortOption}
                  onChange={value =>
                      setConditions(prevState => ({ ...prevState, sortOption: value }))
                  }
              />
            </div>
            {restaurantOverviewList.data.map(restaurant => (
                <SearchResultCard restaurant={restaurant} key={restaurant._id}/>
            ))}
            <PaginationSelector
                current={restaurantOverviewList.pagination.page}
                size={10}
                total={restaurantOverviewList.pagination.total}
                onPageChange={handlePageChange}
            />
          </section>
        </div>
      </section>
  );
};

export default SearchPage;
