import ManageRestaurantForm from "@/forms/manage-restaurant-form/ManageRestaurantForm.tsx";
import { useCreateMyRestaurant, useGetMyRestaurant, useUpdateMyRestaurant } from "@/api/MyRestaurantApi.ts";

const ManageRestaurantPage = () => {
  const { createRestaurant, isLoading: isCreatingRestaurant } = useCreateMyRestaurant();
  const { restaurant } = useGetMyRestaurant();
  const { updateRestaurant, isLoading: isUpdatingRestaurant } = useUpdateMyRestaurant();

  // determine if is editing an existing restaurant
  const isEditing = !!restaurant;

  return (
      <ManageRestaurantForm onSave={isEditing ? updateRestaurant : createRestaurant}
                            isLoading={isCreatingRestaurant || isUpdatingRestaurant}
                            defaultValue={restaurant}/>
  );
};

export default ManageRestaurantPage;
