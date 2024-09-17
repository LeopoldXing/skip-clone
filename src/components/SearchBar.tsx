import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form.tsx";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input.tsx";
import { Button } from "@/components/ui/button.tsx";

const SearchFormSchema = z.object({
  keyword: z.string()
})

export type SearchForm = z.infer<typeof SearchFormSchema>

type Props = {
  onSubmit: (formData: SearchForm) => void;
  placeholder: string;
  onReset?: () => void;
  keyword?: string;
}

const SearchBar = ({ onSubmit, placeholder, onReset, keyword }: Props) => {
  const form = useForm<SearchForm>({
    resolver: zodResolver(SearchFormSchema),
    defaultValues: {
      keyword: keyword || ''
    }
  });

  const handleReset = () => {
    form.reset({ keyword: '' });
    if (onReset) onReset();
  }

  return (
      <div className="px-4 flex items-center justify-center">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}
                className={`w-full md:max-w-[77%] flex items-center gap-3 justify-between flex-row border-2 rounded-full p-3 ${form.formState.errors.keyword && "border-red-500"}`}>
            <div className="flex justify-start items-center gap-1">
              <Search strokeWidth={2.5} size={30} className="ml-1 text-orange-500 hidden md:block"/>
              <FormField control={form.control} name='keyword' render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input {...field} className="w-full border-none shadow-none text-xl focus-visible:ring-0" placeholder={placeholder}/>
                    </FormControl>
                  </FormItem>
              )}/>
            </div>
            <div className="flex items-center justify-end gap-2">
              {form.formState.isDirty && (
                  <Button type="button" onClick={handleReset} variant="outline" className="rounded-full">Clear</Button>
              )}
              <Button type="submit" className="rounded-full bg-orange-500">Search</Button>
            </div>
          </form>
        </Form>
      </div>
  );
};

export default SearchBar;