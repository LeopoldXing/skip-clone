import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField } from "@/components/ui/form.tsx";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input.tsx";
import { Button } from "@/components/ui/button.tsx";
import { useEffect } from "react";

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
      keyword: keyword
    }
  });

  const handleReset = () => {
    form.reset({ keyword: '' });
    if (onReset) onReset();
  }

  useEffect(() => {
    form.reset({ keyword });
  }, [form, keyword]);

  return (
      <Form {...form}>
        <form
            onSubmit={form.handleSubmit(onSubmit)}
            role="search"
            aria-label="Search form"
            className={`flex items-center justify-center border-2 rounded-full p-2 ${form.formState.errors.keyword && "border-red-500"}`}
        >
          <div className="flex flex-1 justify-start items-center gap-1">
            <Search
                strokeWidth={2.5}
                size={30}
                className="ml-1 text-[#c14e2a] hidden md:block"
                aria-hidden="true"
            />
            <FormField control={form.control} name='keyword' render={({ field }) => (
                <>
                  <label className="sr-only" htmlFor={`input-${field.name}`}>Search</label>
                  <FormControl>
                    <Input
                        {...field}
                        id={`input-${field.name}`}
                        className="w-full border-none shadow-none text-xl focus-visible:ring-0 self-center"
                        placeholder={placeholder}
                        aria-label={placeholder}
                        aria-invalid={form.formState.errors.keyword ? "true" : "false"}
                    />
                  </FormControl>
                </>
            )}/>
          </div>
          <div className="flex items-center justify-end gap-2">
            <Button type="button" onClick={handleReset} variant="outline" className="rounded-full">Clear</Button>
            <Button type="submit" className="rounded-full bg-[#c14e2a] text-white">Search</Button>
          </div>
        </form>
      </Form>
  );
};

export default SearchBar;
