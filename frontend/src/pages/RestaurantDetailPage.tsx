import { useParams } from "react-router-dom";
import { useGetRestaurant } from "@/api/RestaurantApi.ts";
import { UserFormData } from "@/forms/user-profile-form/UserProfileForm.tsx";
import { AspectRatio } from "@/components/ui/aspect-ratio.tsx";
import { Card, CardFooter } from "@/components/ui/card.tsx";
import RestaurantInfoCard from "@/components/RestaurantInfoCard.tsx";
import { useEffect, useState } from "react";
import { MenuItemType } from "@/types.ts";
import MenuItem from "@/components/MenuItem.tsx";
import OrderSummary from "@/components/OrderSummary.tsx";
import CheckoutButton from "@/components/CheckoutButton.tsx";
import { useCreateCheckoutSession } from "@/api/OrderApi.ts";

export type CartItem = {
  _id: string;
  name: string;
  price: number;
  quantity: number;
};

const RestaurantDetailPage = () => {
  useEffect(() => {
    document.title = 'Restaurant Details';
  }, []);

  const { restaurantId } = useParams();
  const { restaurant, isLoading } = useGetRestaurant(restaurantId);
  const { createCheckoutSession, isLoading: isCreatingCheckoutSession } = useCreateCheckoutSession();

  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    const storedCartItems = sessionStorage.getItem(`cartItems-${restaurantId}`);
    return storedCartItems ? JSON.parse(storedCartItems) : [];
  });

  const addToCart = (menuItem: MenuItemType) => {
    setCartItems((prevCartItems) => {
      const existingCartItem = prevCartItems.find((cartItem) => cartItem._id === menuItem._id);
      let updatedCartItems;
      if (existingCartItem) {
        updatedCartItems = prevCartItems.map((cartItem) =>
            cartItem._id === menuItem._id
                ? { ...cartItem, quantity: cartItem.quantity + 1 }
                : cartItem
        );
      } else {
        updatedCartItems = [
          ...prevCartItems,
          {
            _id: menuItem._id,
            name: menuItem.name,
            price: menuItem.price,
            quantity: 1,
          },
        ];
      }
      sessionStorage.setItem(`cartItems-${restaurantId}`, JSON.stringify(updatedCartItems));
      return updatedCartItems;
    });
  };

  const removeFromCart = (cartItem: CartItem) => {
    setCartItems((prevCartItems) => {
      const updatedCartItems = prevCartItems.filter((item) => cartItem._id !== item._id);
      sessionStorage.setItem(`cartItems-${restaurantId}`, JSON.stringify(updatedCartItems));
      return updatedCartItems;
    });
  };

  const onCheckout = async (userFormData: UserFormData) => {
    if (!restaurant) return;

    const checkoutData = {
      cartItems: cartItems.map(cartItem => ({
        menuItemId: cartItem._id,
        name: cartItem.name,
        quantity: cartItem.quantity.toString(),
      })),
      restaurantId: restaurant._id,
      deliveryDetails: {
        name: userFormData.name,
        addressLine1: userFormData.addressLine1,
        city: userFormData.city,
        country: userFormData.country,
        email: userFormData.email as string,
      },
    };

    const data = await createCheckoutSession(checkoutData);
    window.location.href = data.sessionUrl;
  };

  if (isLoading || !restaurant) {
    return <p role="status">Loading...</p>;
  }

  return (
      <section role="main" aria-label="Restaurant Detail Page">
        <div className="flex flex-col gap-10">
          <AspectRatio ratio={16 / 5}>
            <img
                src={restaurant.imageUrl}
                className="rounded-md object-cover h-full w-full"
                alt={`${restaurant.restaurantName} image`}
            />
          </AspectRatio>
          <div className="grid md:grid-cols-[4fr_2fr] gap-5 md:px-32">
            <section aria-labelledby="restaurant-info-heading">
              <h2 id="restaurant-info-heading" className="sr-only">
                Restaurant Information
              </h2>
              <RestaurantInfoCard restaurant={restaurant}/>
              <h3 id="menu-heading" className="text-2xl font-bold tracking-tight">
                Menu
              </h3>
              <ul role="list" aria-labelledby="menu-heading" className="space-y-4">
                {restaurant.menuItems.map(menuItem => (
                    <li key={menuItem._id}>
                      <MenuItem menuItem={menuItem} addToCart={() => addToCart(menuItem)}/>
                    </li>
                ))}
              </ul>
            </section>
            <aside aria-labelledby="order-summary-heading">
              <h2 id="order-summary-heading" className="sr-only">
                Order Summary
              </h2>
              <Card>
                <OrderSummary restaurant={restaurant} cartItems={cartItems} removeFromCart={removeFromCart}/>
                <CardFooter>
                  <CheckoutButton
                      disabled={cartItems.length === 0}
                      onCheckout={onCheckout}
                      isLoading={isCreatingCheckoutSession}
                  />
                </CardFooter>
              </Card>
            </aside>
          </div>
        </div>
      </section>
  );
};

export default RestaurantDetailPage;
