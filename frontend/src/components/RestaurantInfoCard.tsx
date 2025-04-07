import { Restaurant } from "@/types";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Dot } from "lucide-react";

type Props = {
  restaurant: Restaurant;
};

const RestaurantInfoCard = ({ restaurant }: Props) => {
  return (
      <Card role="region" aria-label="Restaurant Information">
        <CardHeader>
          <CardTitle className="text-3xl font-bold tracking-tight">
            {restaurant.restaurantName}
          </CardTitle>
          <CardDescription>
            {restaurant.city}, {restaurant.country}
          </CardDescription>
        </CardHeader>
        <CardContent className="flex items-center">
          <span className="sr-only">Cuisines:</span>
          {restaurant.cuisines.map((item, index) => (
              <span className="flex items-center" key={item + index.toString()}>
            <span>{item}</span>
                {index < restaurant.cuisines.length - 1 && <Dot aria-hidden="true"/>}
          </span>
          ))}
        </CardContent>
      </Card>
  );
};

export default RestaurantInfoCard;
