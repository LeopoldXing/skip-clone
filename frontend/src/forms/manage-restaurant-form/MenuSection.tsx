import { useFieldArray, useFormContext } from "react-hook-form";
import { FormDescription, FormField, FormItem } from "@/components/ui/form.tsx";
import { Button } from "@/components/ui/button.tsx";
import MenuItemInput from "@/forms/manage-restaurant-form/MenuItemInput.tsx";

const MenuSection = () => {
  const { control } = useFormContext();
  const { fields, append, remove } = useFieldArray({ control, name: "menuItems" });

  return (
      <div className="space-y-2">
        <div>
          <h2 className="text-2xl font-bold">Menu</h2>
          <FormDescription>
            Create your menu and give each item a name and a price
          </FormDescription>
        </div>
        <FormField
            control={control}
            name="menuItems"
            render={() => (
                <FormItem className="flex flex-col gap-2">
                  <div role="list" className="flex flex-col gap-2">
                    {fields.map((field, index) => (
                        <div role="listitem" key={field.id}>
                          <MenuItemInput index={index} removeMenuItem={() => remove(index)}/>
                        </div>
                    ))}
                  </div>
                </FormItem>
            )}
        />
        <Button
            type="button"
            onClick={() => append({ name: "", price: "" })}
            aria-label="Add menu item"
        >
          Add Menu Item
        </Button>
      </div>
  );
};

export default MenuSection;
