import { useParams } from "react-router-dom";

const SearchPage = () => {
  const { city } = useParams();

  return (
      <div>
        <h1>Search Page</h1>
        <span>city: {city}</span>
      </div>
  );
};

export default SearchPage;