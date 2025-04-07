import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form.tsx";
import { Input } from "@/components/ui/input.tsx";
import { useFormContext } from "react-hook-form";

const DetailsSection = () => {
  const { control } = useFormContext();

  return (
      <fieldset
          className="space-y-2"
          aria-labelledby="details-legend"
          aria-describedby="details-description"
      >
        <legend id="details-legend" className="text-2xl font-bold">
          Details
        </legend>
        <p id="details-description" className="text-sm text-gray-600">
          Enter the details about your restaurant
        </p>
        <FormField
            control={control}
            name="restaurantName"
            render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input {...field} className="bg-white"/>
                  </FormControl>
                  <FormMessage/>
                </FormItem>
            )}
        />
        <div className="flex gap-4">
          <FormField
              control={control}
              name="city"
              render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>City</FormLabel>
                    <FormControl>
                      <Input {...field} className="bg-white"/>
                    </FormControl>
                    <FormMessage/>
                  </FormItem>
              )}
          />
          <FormField
              control={control}
              name="country"
              render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>Country</FormLabel>
                    <FormControl>
                      <Input {...field} className="bg-white"/>
                    </FormControl>
                    <FormMessage/>
                  </FormItem>
              )}
          />
        </div>
        <FormField
            control={control}
            name="deliveryPrice"
            render={({ field }) => (
                <FormItem className="max-w-[25%]">
                  <FormLabel>Delivery Price ($)</FormLabel>
                  <FormControl>
                    <Input {...field} className="bg-white" placeholder="1.50"/>
                  </FormControl>
                  <FormMessage/>
                </FormItem>
            )}
        />
        <FormField
            control={control}
            name="estimatedDeliveryTime"
            render={({ field }) => (
                <FormItem className="max-w-[25%]">
                  <FormLabel>Estimated Delivery Time (mins)</FormLabel>
                  <FormControl>
                    <Input {...field} className="bg-white" placeholder="30"/>
                  </FormControl>
                  <FormMessage/>
                </FormItem>
            )}
        />
      </fieldset>
  );
};

export default DetailsSection;
