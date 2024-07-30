import { useFormContext } from "react-hook-form";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form.tsx";
import { Input } from "@/components/ui/input.tsx";
import { Button } from "@/components/ui/button.tsx";

type MenuItemInputProps = {
  index: number;
  removeMenuItem: () => void;
}
const MenuItemInput = ({ index, removeMenuItem }: MenuItemInputProps) => {
  const { control } = useFormContext();

  return (
      <div className="flex flex-row items-end gap-2">
        <FormField control={control} name={`menuItems.${index}.name`} render={({ field }) => (
            <FormItem>
              <FormLabel className="flex items-center gap-1">Name</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Cheese Pizza" className="bg-white"/>
              </FormControl>
              <FormMessage/>
            </FormItem>
        )}/>
        <FormField control={control} name={`menuItems.${index}.price`} render={({ field }) => (
            <FormItem>
              <FormLabel className="flex items-center gap-1">Price ($)</FormLabel>
              <FormControl>
                <Input {...field} placeholder="8.99" className="bg-white"/>
              </FormControl>
              <FormMessage/>
            </FormItem>
        )}/>
        <Button type="button" onClick={removeMenuItem} className="bg-red-500 max-h-fit">Remove</Button>
      </div>
  );
};

export default MenuItemInput;
