import { Restaurant } from "@/types";
import { CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Separator } from "./ui/separator";
import { Trash } from "lucide-react";
import { CartItem } from "@/pages/RestaurantDetailPage.tsx";

type Props = {
  restaurant: Restaurant;
  cartItems: CartItem[];
  removeFromCart: (cartItem: CartItem) => void;
};

const OrderSummary = ({ restaurant, cartItems, removeFromCart }: Props) => {
  const getTotalCost = () => {
    const totalInPence = cartItems.reduce(
        (total, cartItem) => total + cartItem.price * cartItem.quantity,
        0
    );
    const totalWithDelivery = totalInPence + restaurant.deliveryPrice;
    return (totalWithDelivery / 100).toFixed(2);
  };

  return (
      <>
        <CardHeader>
          <CardTitle className="text-2xl font-bold tracking-tight flex justify-between">
            <span>Your Order</span>
            <span>${getTotalCost()}</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-5">
          <ul className="space-y-4">
            {cartItems.map((item) => (
                <li className="flex justify-between" key={item._id}>
              <span className="flex items-center">
                <Badge variant="outline" className="mr-2" aria-hidden="true">
                  {item.quantity}
                </Badge>
                {item.name}
              </span>
                  <span className="flex items-center gap-1">
                <button
                    onClick={() => removeFromCart(item)}
                    aria-label={`Remove ${item.name} from order`}
                    className="cursor-pointer focus:outline-none"
                >
                  <Trash color="red" size={20}/>
                </button>
                <span>${((item.price * item.quantity) / 100).toFixed(2)}</span>
              </span>
                </li>
            ))}
          </ul>
          <Separator/>
          <div className="flex justify-between">
            <span>Delivery</span>
            <span>${(restaurant.deliveryPrice / 100).toFixed(2)}</span>
          </div>
          <Separator/>
        </CardContent>
      </>
  );
};

export default OrderSummary;
