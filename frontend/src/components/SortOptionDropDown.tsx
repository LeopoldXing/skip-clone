import { Button } from "./ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, } from "./ui/dropdown-menu";

type Props = {
  onChange: (value: string) => void;
  sortOption: string;
};

const SORT_OPTIONS = [
  {
    label: "Best match",
    value: "bestMatch",
  },
  {
    label: "Delivery price",
    value: "deliveryPrice",
  },
  {
    label: "Estimated delivery time",
    value: "estimatedDeliveryTime",
  },
];

const SortOptionDropdown = ({ onChange, sortOption }: Props) => {
  const selectedSortLabel =
      SORT_OPTIONS.find((option) => option.value === sortOption)?.label ||
      SORT_OPTIONS[0].label;

  return (
      <DropdownMenu>
        <DropdownMenuTrigger className="cursor-pointer" aria-haspopup="menu">
          <Button variant="outline" className="w-full">
            Sort by: {selectedSortLabel}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent role="menu">
          {SORT_OPTIONS.map((option) => (
              <DropdownMenuItem
                  role="menuitemradio"
                  aria-checked={option.value === sortOption}
                  onClick={() => onChange(option.value)}
                  key={option.value}
                  className="cursor-pointer"
              >
                {option.label}
              </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
  );
};

export default SortOptionDropdown;
