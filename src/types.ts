export type User = {
  _id: string;
  name: string;
  email: string;
  addressLine1: string;
  city: string;
  country: string;
}

export type OrderStatus =
    | "placed"
    | "paid"
    | "inProgress"
    | "outForDelivery"
    | "delivered";

export type Restaurant = {
  _id: string;
  user: string;
  restaurantName: string;
  city: string;
  country: string;
  deliveryPrice: number;
  estimatedDeliveryTime: number;
  cuisines: string[];
  menuItems: MenuItemType[];
  imageUrl: string;
  lastUpdated: string;
};

export type MenuItemType = {
  _id: string;
  name: string;
  price: number;
};

export type RestaurantSearchOverview = {
  data: Restaurant[];
  pagination: {
    total: number;
    page: number;
    pages: number;
  };
};