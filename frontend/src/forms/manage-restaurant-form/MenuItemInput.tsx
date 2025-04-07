import { useFormContext } from "react-hook-form";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form.tsx";
import { Input } from "@/components/ui/input.tsx";
import { Button } from "@/components/ui/button.tsx";

type MenuItemInputProps = {
  index: number;
  removeMenuItem: () => void;
};

const MenuItemInput = ({ index, removeMenuItem }: MenuItemInputProps) => {
  const { control } = useFormContext();

  const nameInputId = `menu-item-${index}-name`;
  const priceInputId = `menu-item-${index}-price`;

  return (
      <div className="flex flex-row items-end gap-2">
        <FormField
            control={control}
            name={`menuItems.${index}.name`}
            render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor={nameInputId} className="flex items-center gap-1">
                    Name
                  </FormLabel>
                  <FormControl>
                    <Input {...field} id={nameInputId} placeholder="Cheese Pizza" className="bg-white"/>
                  </FormControl>
                  <FormMessage/>
                </FormItem>
            )}
        />
        <FormField
            control={control}
            name={`menuItems.${index}.price`}
            render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor={priceInputId} className="flex items-center gap-1">
                    Price ($)
                  </FormLabel>
                  <FormControl>
                    <Input {...field} id={priceInputId} placeholder="8.99" className="bg-white"/>
                  </FormControl>
                  <FormMessage/>
                </FormItem>
            )}
        />
        <Button
            type="button"
            onClick={removeMenuItem}
            className="bg-red-500 max-h-fit"
            aria-label="Remove menu item"
        >
          Remove
        </Button>
      </div>
  );
};

export default MenuItemInput;
