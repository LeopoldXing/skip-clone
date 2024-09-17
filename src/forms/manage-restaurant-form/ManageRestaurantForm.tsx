import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form.tsx";
import DetailsSection from "@/forms/manage-restaurant-form/DetailsSection.tsx";
import { Separator } from "@/components/ui/separator.tsx";
import CuisinesSection from "@/forms/manage-restaurant-form/CuisinesSection.tsx";
import MenuSection from "@/forms/manage-restaurant-form/MenuSection.tsx";
import ImageSection from "@/forms/manage-restaurant-form/ImageSection.tsx";
import LoadingButton from "@/components/ui/LoadingButton.tsx";
import { Button } from "@/components/ui/button.tsx";
import { Restaurant } from "@/types.ts";
import { useEffect } from "react";

const formSchema = z.object({
  restaurantName: z.string({
    required_error: "Restaurant name is required"
  }),
  city: z.string({
    required_error: "City is required"
  }),
  country: z.string({
    required_error: "Country is required"
  }),
  deliveryPrice: z.coerce.number({
    required_error: "DeliveryPrice is required",
    invalid_type_error: "must be a valid number"
  }),
  estimatedDeliveryTime: z.coerce.number({
    required_error: "Estimated delivery time is required",
    invalid_type_error: "must be a valid number"
  }),
  cuisines: z.array(z.string()).nonempty({
    message: "Please select at least one item"
  }),
  menuItems: z.array(z.object({
    name: z.string().min(1, "name is required"),
    price: z.coerce.number().min(1, "price is required")
  })),
  imageUrl: z.string().optional(),
  imageFile: z.instanceof(File, { message: "image is required" }).optional()
});

type RestaurantFormData = z.infer<typeof formSchema>;

type ManageRestaurantFormProps = {
  onSave: (restaurantFormData: FormData) => void;
  isLoading: boolean;
  defaultValue?: Restaurant
}
const ManageRestaurantForm = ({ onSave, isLoading = false, defaultValue: defaultRestaurant }: ManageRestaurantFormProps) => {
  const form = useForm<RestaurantFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      cuisines: [],
      menuItems: [{ name: "", price: 0 }]
    }
  })

  useEffect(() => {
    if (defaultRestaurant) {
      const deliveryPriceFormatted = parseFloat((defaultRestaurant.deliveryPrice / 100).toFixed(2));
      const menuItemFormatted = defaultRestaurant.menuItems.map(item => ({
        ...item,
        price: parseFloat((item.price / 100).toFixed(2))
      }));

      const updatedRestaurant = {
        ...defaultRestaurant,
        deliveryPrice: deliveryPriceFormatted,
        menuItems: menuItemFormatted
      }

      form.reset(updatedRestaurant);
    }
  }, []);

  const onSubmit = (formDataJson: RestaurantFormData) => {
    const formData = new FormData();

    formData.append("restaurantName", formDataJson.restaurantName);
    formData.append("city", formDataJson.city);
    formData.append("country", formDataJson.country);
    formData.append("deliveryPrice", (formDataJson.deliveryPrice * 100).toString());
    formData.append("estimatedDeliveryTime", formDataJson.estimatedDeliveryTime.toString());
    formDataJson.cuisines.forEach((cuisine, index) => {
      formData.append(`cuisines[${index}]`, cuisine);
    });
    formDataJson.menuItems.forEach((menuItem, index) => {
      formData.append(`menuItems[${index}][name]`, menuItem.name);
      formData.append(`menuItems[${index}][price]`, (menuItem.price * 100).toString());
    });
    if (formDataJson.imageFile) {
      formData.append('imageFile', formDataJson.imageFile);
    }

    onSave(formData);
  }

  return (
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 p-10 bg-gray-50 rounded-lg">
          <DetailsSection/>
          <Separator/>
          <CuisinesSection/>
          <Separator/>
          <MenuSection/>
          <Separator/>
          <ImageSection/>

          {isLoading ? <LoadingButton/> : <Button type="submit">Submit</Button>}
        </form>
      </Form>
  );
};

export default ManageRestaurantForm;
