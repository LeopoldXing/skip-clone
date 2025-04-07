import { ControllerRenderProps, FieldValues } from "react-hook-form";
import { FormControl, FormItem, FormLabel } from "@/components/ui/form.tsx";
import { Checkbox } from "@/components/ui/checkbox.tsx";

type CuisineCheckBoxProps = {
  cuisine: string;
  field: ControllerRenderProps<FieldValues, "cuisines">;
};

const CuisineCheckBox = ({ cuisine, field }: CuisineCheckBoxProps) => {
  const checkboxId = `cuisine-checkbox-${cuisine.replace(/\s+/g, "-")}`;

  return (
      <FormItem className="mt-2 flex flex-row items-center space-x-1 space-y-0">
        <FormControl>
          <Checkbox
              id={checkboxId}
              className="bg-white"
              checked={field.value.includes(cuisine)}
              onCheckedChange={checked => {
                if (checked) {
                  field.onChange([...field.value, cuisine]);
                } else {
                  field.onChange(field.value.filter((value: string) => value !== cuisine));
                }
              }}
          />
        </FormControl>
        <FormLabel htmlFor={checkboxId} className="text-sm font-normal">
          {cuisine}
        </FormLabel>
      </FormItem>
  );
};

export default CuisineCheckBox;
