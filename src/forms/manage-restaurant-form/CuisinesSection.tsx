import { FormDescription, FormField, FormItem, FormMessage } from "@/components/ui/form.tsx";
import { useFormContext } from "react-hook-form";
import { cuisineOptions } from "@/config/restaurant-options-config.ts";
import CuisineCheckBox from "@/forms/manage-restaurant-form/CuisineCheckBox.tsx";

const CuisinesSection = () => {
  const { control } = useFormContext();

  return (
      <div className="space-y-2">
        <div>
          <h2 className="text-2xl font-bold">Cuisines</h2>
        </div>
        <FormDescription>
          Select the cuisines that your restaurant serves
        </FormDescription>
        <FormField name="cuisines" control={control} render={({field}) => (
            <FormItem>
              <div className="grid md:grid-cols-5 gap-1">
                {cuisineOptions.map(cuisine=>(
                    <CuisineCheckBox cuisine={cuisine} field={field} key={cuisine}/>
                ))}
              </div>
              <FormMessage/>
            </FormItem>
        )}/>
      </div>
  );
};

export default CuisinesSection;
