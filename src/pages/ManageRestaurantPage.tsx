import ManageRestaurantForm from "@/forms/manage-restaurant-form/ManageRestaurantForm.tsx";
import { useCreateMyRestaurant, useGetMyRestaurant, useGetMyRestaurantOrders, useUpdateMyRestaurant } from "@/api/MyRestaurantApi.ts";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs.tsx";
import OrderItemCard from "@/components/OrderItemCard.tsx";

const ManageRestaurantPage = () => {
  const { createRestaurant, isLoading: isCreatingRestaurant } = useCreateMyRestaurant();
  const { restaurant } = useGetMyRestaurant();
  const { updateRestaurant, isLoading: isUpdatingRestaurant } = useUpdateMyRestaurant();

  // get my restaurant's orders
  const { myRestaurantOrders } = useGetMyRestaurantOrders();

  // determine if is editing an existing restaurant
  const isEditing = !!restaurant;

  return (
      <Tabs defaultValue='orders'>
        <TabsList>
          <TabsTrigger value='orders'>Orders</TabsTrigger>
          <TabsTrigger value='manage-restaurant'>Manage Restaurant</TabsTrigger>
        </TabsList>
        <TabsContent value="orders" className="space-y-5 bg-gray-50 p-10 rounded-lg">
          <h2 className="text-2xl font-bold">{myRestaurantOrders ? myRestaurantOrders.length : 0} active orders</h2>
          {myRestaurantOrders?.map(order => (
              <OrderItemCard order={order} key={order._id}/>
          ))}
        </TabsContent>
        <TabsContent value='manage-restaurant'>
          <ManageRestaurantForm onSave={isEditing ? updateRestaurant : createRestaurant}
                                isLoading={isCreatingRestaurant || isUpdatingRestaurant}
                                defaultValue={restaurant}/>
        </TabsContent>
      </Tabs>
  );
};

export default ManageRestaurantPage;
