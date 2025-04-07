import ManageRestaurantForm from "@/forms/manage-restaurant-form/ManageRestaurantForm.tsx";
import { useCreateMyRestaurant, useGetMyRestaurant, useGetMyRestaurantOrders, useUpdateMyRestaurant } from "@/api/MyRestaurantApi.ts";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs.tsx";
import OrderItemCard from "@/components/OrderItemCard.tsx";
import { useEffect } from "react";

const ManageRestaurantPage = () => {
  useEffect(() => {
    document.title = 'Restaurant Management';
  }, []);

  const { createRestaurant, isLoading: isCreatingRestaurant } = useCreateMyRestaurant();
  const { restaurant } = useGetMyRestaurant();
  const { updateRestaurant, isLoading: isUpdatingRestaurant } = useUpdateMyRestaurant();
  const { myRestaurantOrders } = useGetMyRestaurantOrders();
  const isEditing = !!restaurant;

  return (
      <section role="main" aria-label="Restaurant Management">
        <Tabs defaultValue="orders">
          <TabsList aria-label="Restaurant management tabs">
            <TabsTrigger value="orders" id="orders-tab">
              Orders
            </TabsTrigger>
            <TabsTrigger value="manage-restaurant" id="manage-restaurant-tab">
              Manage Restaurant
            </TabsTrigger>
          </TabsList>
          <TabsContent
              value="orders"
              role="tabpanel"
              aria-labelledby="orders-tab"
              className="space-y-5 bg-gray-50 p-10 rounded-lg"
          >
            <h2 className="text-2xl font-bold">
              {myRestaurantOrders ? myRestaurantOrders.length : 0} active orders
            </h2>
            {myRestaurantOrders?.map(order => (
                <OrderItemCard order={order} key={order._id}/>
            ))}
          </TabsContent>
          <TabsContent
              value="manage-restaurant"
              role="tabpanel"
              aria-labelledby="manage-restaurant-tab"
          >
            <ManageRestaurantForm
                onSave={isEditing ? updateRestaurant : createRestaurant}
                isLoading={isCreatingRestaurant || isUpdatingRestaurant}
                defaultValue={restaurant}
            />
          </TabsContent>
        </Tabs>
      </section>
  );
};

export default ManageRestaurantPage;
