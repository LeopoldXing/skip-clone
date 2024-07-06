import landingImage from "../assets/landing.png";
import appDownloadImage from "../assets/appDownload.png";

const HomePage = () => {
  return (
      <div className="flex flex-col gap-12">
        <div className="py-8 -mt-16 flex flex-col gap-5 text-center bg-white rounded-lg shadow-md">
          <h1 className="text-5xl font-bold tracking-tight text-orange-600">
            Tuck into a takeaway today
          </h1>
          <span className="text-xl">Food is just a click away!</span>
        </div>
        <div className="grid md:grid-cols-2 gap-5">
          <img src={landingImage} alt="Landing Image"/>
          <div className="flex flex-col gap-5 justify-center items-center text-center">
            <span className="font-bold text-3xl tracking-tighter">Order takeaway even faster!</span>
            <span className="text-md text-gray-600">Download the Quick Bite App today and get better experience with personalised recommendations</span>
            <img src={appDownloadImage} alt="appDownloadImage"/>
          </div>
        </div>
      </div>
  );
};

export default HomePage;
