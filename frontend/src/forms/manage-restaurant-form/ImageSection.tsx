import { useFormContext } from "react-hook-form";
import { FormControl, FormDescription, FormField, FormItem, FormMessage } from "@/components/ui/form.tsx";
import { Input } from "@/components/ui/input.tsx";
import { AspectRatio } from "@/components/ui/aspect-ratio.tsx";

const ImageSection = () => {
  const { control, watch } = useFormContext();
  const existingImageUrl = watch("imageUrl");

  return (
      <fieldset className="space-y-2" aria-labelledby="image-section-heading">
        <legend id="image-section-heading" className="text-2xl font-bold">Image</legend>
        <FormDescription>
          Add an image that will be displayed on your restaurant listing in the search results. Adding a new image will overwrite the
          existing one.
        </FormDescription>
        <div className="flex flex-col gap-8 md:w-[50%]">
          {existingImageUrl && (
              <AspectRatio ratio={16 / 9}>
                <img
                    src={existingImageUrl}
                    alt="Current restaurant image"
                    className="w-full h-full rounded-md object-cover"
                />
              </AspectRatio>
          )}
          <FormField
              control={control}
              name="imageFile"
              render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                          className="bg-white"
                          type="file"
                          accept=".jpeg, .jpg, .png"
                          aria-label="Upload restaurant image"
                          onChange={event =>
                              field.onChange(event.target.files ? event.target.files[0] : null)
                          }
                      />
                    </FormControl>
                    <FormMessage/>
                  </FormItem>
              )}
          />
        </div>
      </fieldset>
  );
};

export default ImageSection;
