import { Restaurant } from "@/types";
import { Link } from "react-router-dom";
import { AspectRatio } from "@/components/ui/aspect-ratio.tsx";
import { Banknote, Clock, Dot } from "lucide-react";

type Props = {
  restaurant: Restaurant;
};

const SearchResultCard = ({ restaurant }: Props) => {
  return (
      <Link
          to={`/detail/${restaurant._id}`}
          className="grid lg:grid-cols-[2fr_3fr] gap-5 group"
          aria-label={`View details for ${restaurant.restaurantName}`}
      >
        <AspectRatio ratio={16 / 6}>
          <img
              src={restaurant.imageUrl}
              className="rounded-md w-full h-full object-cover"
              alt={`${restaurant.restaurantName} image`}
          />
        </AspectRatio>
        <div>
          <h3 className="text-2xl font-bold tracking-tight mb-2 group-hover:underline">
            {restaurant.restaurantName}
          </h3>
          <div className="grid md:grid-cols-2 gap-2">
            <div className="flex flex-row flex-wrap" role="list" aria-label="Cuisines">
              {restaurant.cuisines.map((item, index) => (
                  <span className="flex items-center" key={item + index.toString()} role="listitem">
                <span>{item}</span>
                    {index < restaurant.cuisines.length - 1 && <Dot aria-hidden="true"/>}
              </span>
              ))}
            </div>
            <div className="flex gap-2 flex-col">
              <div className="flex items-center gap-1 text-green-600">
                <Clock className="text-green-600" aria-hidden="true"/>
                {restaurant.estimatedDeliveryTime} mins
              </div>
              <div className="flex items-center gap-1">
                <Banknote aria-hidden="true"/>
                Delivery from ${(restaurant.deliveryPrice / 100).toFixed(2)}
              </div>
            </div>
          </div>
        </div>
      </Link>
  );
};

export default SearchResultCard;
