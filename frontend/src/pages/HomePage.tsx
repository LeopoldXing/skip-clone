import landingImage from "../assets/landing.png";
import appDownloadImage from "../assets/appDownload.png";
import SearchBar, { SearchForm } from "@/components/SearchBar.tsx";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const HomePage = () => {
  useEffect(() => {
    document.title = 'Online Delivery | food, Groceries, Alcohol and More!'
  }, []);
  const navigate = useNavigate();

  const handleSearch = (param: SearchForm) => {
    navigate({
      pathname: `/search/${param.keyword}`
    })
  }

  return (
      <section className="flex flex-col gap-12"> {/* Added main landmark for semantic structure */}
        <div className="py-8 md:px-32 px-8 -mt-16 flex flex-col gap-5 text-center bg-white rounded-lg shadow-md">
          <h1 className="text-3xl font-bold tracking-tight text-orange-600">
            Skip to the good part.
          </h1>
          <span className="text-md text-gray-600">What can we bring to your door?</span>
          <SearchBar placeholder='Search by city or town' onSubmit={handleSearch}/>
        </div>
        <div className="grid md:grid-cols-2 gap-5">
          <img src={landingImage} alt="Illustration of online delivery service"/>
          <div className="flex flex-col gap-5 justify-center items-center text-center">
            <span className="font-bold text-3xl tracking-tighter">Order takeaway even faster!</span>
            <span className="text-md text-gray-600">
              Download the App today and get better experience with personalised recommendations
            </span>
            <img src={appDownloadImage} alt="App download preview"/>
          </div>
        </div>
      </section>
  );
};

export default HomePage;
