import { cuisineOptions } from "../config/restaurant-options-config";
import { Label } from "./ui/label";
import { Check, ChevronDown, ChevronUp } from "lucide-react";
import { ChangeEvent } from "react";
import { Button } from "./ui/button";

type Props = {
  onChange: (cuisines: string[]) => void;
  selectedCuisines: string[];
  isExpanded: boolean;
  onExpandClick: () => void;
};

const CuisineFilter = ({ onChange, selectedCuisines, isExpanded, onExpandClick }: Props) => {
  const handleCuisinesChange = (event: ChangeEvent<HTMLInputElement>) => {
    const clickedCuisine = event.target.value;
    const isChecked = event.target.checked;
    const newCuisinesList = isChecked
        ? [...selectedCuisines, clickedCuisine]
        : selectedCuisines.filter((cuisine) => cuisine !== clickedCuisine);
    onChange(newCuisinesList);
  };

  const handleCuisinesReset = () => onChange([]);

  return (
      <fieldset className="px-2">
        <legend className="text-md font-semibold mb-2">Filter By Cuisine</legend>
        <button
            type="button"
            onClick={handleCuisinesReset}
            className="text-sm font-semibold mb-2 underline cursor-pointer text-blue-500"
        >
          Reset Filters
        </button>
        <div className="space-y-2 flex flex-col">
          {cuisineOptions
              .slice(0, isExpanded ? cuisineOptions.length : 7)
              .map((cuisine) => {
                const isSelected = selectedCuisines.includes(cuisine);
                return (
                    <div className="flex" key={cuisine}>
                      <input
                          id={`cuisine_${cuisine}`}
                          type="checkbox"
                          className="sr-only"
                          value={cuisine}
                          checked={isSelected}
                          onChange={handleCuisinesChange}
                      />
                      <Label
                          htmlFor={`cuisine_${cuisine}`}
                          className={`flex flex-1 items-center cursor-pointer text-sm rounded-full px-4 py-2 font-semibold ${
                              isSelected ? "border border-green-600 text-green-600" : "border border-slate-300"
                          }`}
                      >
                        {isSelected && <Check size={20} strokeWidth={3}/>}
                        {cuisine}
                      </Label>
                    </div>
                );
              })}
          <Button onClick={onExpandClick} variant="link" className="mt-4 flex-1" aria-expanded={isExpanded}>
            {isExpanded ? (
                <span className="flex flex-row items-center">
              View Less <ChevronUp/>
            </span>
            ) : (
                <span className="flex flex-row items-center">
              View More <ChevronDown/>
            </span>
            )}
          </Button>
        </div>
      </fieldset>
  );
};

export default CuisineFilter;
