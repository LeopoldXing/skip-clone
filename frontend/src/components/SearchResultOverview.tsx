import { Link } from "react-router-dom";

type Props = {
  total: number;
  city: string;
};

const SearchResultOverview = ({ total, city }: Props) => {
  return (
      <section
          role="region"
          aria-label="Search results overview"
          className="text-xl font-bold flex flex-col gap-3 justify-between lg:items-center lg:flex-row"
      >
        <p>
          {total} restaurants found in {city}{" "}
          <Link
              to="/"
              className="ml-1 text-sm font-semibold underline cursor-pointer text-blue-500"
          >
            Change Location
          </Link>
        </p>
      </section>
  );
};

export default SearchResultOverview;
