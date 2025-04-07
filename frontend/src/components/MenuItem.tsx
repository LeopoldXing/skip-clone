import { MenuItemType } from "../types";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import React from "react";

type Props = {
  menuItem: MenuItemType;
  addToCart: () => void;
};

const MenuItem = ({ menuItem, addToCart }: Props) => {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      addToCart();
    }
  };

  return (
      <Card
          className="cursor-pointer"
          role="button"
          tabIndex={0}
          onClick={addToCart}
          onKeyDown={handleKeyDown}
          aria-label={`Add ${menuItem.name} to cart, price $${(menuItem.price / 100).toFixed(2)}`}
      >
        <CardHeader>
          <CardTitle>{menuItem.name}</CardTitle>
        </CardHeader>
        <CardContent className="font-bold">
          ${(menuItem.price / 100).toFixed(2)}
        </CardContent>
      </Card>
  );
};

export default MenuItem;
