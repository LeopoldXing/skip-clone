import ManageRestaurantForm from "@/forms/manage-restaurant-form/ManageRestaurantForm.tsx";
import { useCreateMyRestaurant, useGetMyRestaurant } from "@/api/MyRestaurantApi.ts";

const ManageRestaurantPage = () => {
  const { createRestaurant, isLoading } = useCreateMyRestaurant();
  const { restaurant } = useGetMyRestaurant();

  return (
      <ManageRestaurantForm onSave={createRestaurant} isLoading={isLoading} defaultValue={restaurant}/>
  );
};

export default ManageRestaurantPage;
