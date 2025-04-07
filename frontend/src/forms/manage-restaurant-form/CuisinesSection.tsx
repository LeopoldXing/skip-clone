import { FormDescription, FormField, FormItem, FormMessage } from "@/components/ui/form.tsx";
import { useFormContext } from "react-hook-form";
import { cuisineOptions } from "@/config/restaurant-options-config.ts";
import CuisineCheckBox from "@/forms/manage-restaurant-form/CuisineCheckBox.tsx";

const CuisinesSection = () => {
  const { control } = useFormContext();

  return (
      <fieldset className="space-y-2" aria-labelledby="cuisines-heading">
        <legend id="cuisines-heading" className="text-2xl font-bold">
          Cuisines
        </legend>
        <FormDescription>
          Select the cuisines that your restaurant serves
        </FormDescription>
        <FormField
            name="cuisines"
            control={control}
            render={({ field }) => (
                <FormItem>
                  <div className="grid md:grid-cols-5 gap-1">
                    {cuisineOptions.map(cuisine => (
                        <CuisineCheckBox cuisine={cuisine} field={field} key={cuisine}/>
                    ))}
                  </div>
                  <FormMessage/>
                </FormItem>
            )}
        />
      </fieldset>
  );
};

export default CuisinesSection;
