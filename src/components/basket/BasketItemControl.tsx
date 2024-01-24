import React from "react";
import { BasketItemProps } from "./interface";
import { MinusIcon, PlusIcon } from "@heroicons/react/24/outline";
import { Button } from "../common";
import { useUpdateCartMutation } from "@/redux/api/cartSlice.api";

const BasketItemControl: React.FC<BasketItemProps> = ({ product }) => {
  const { id, available_quantity } = product.product_details;
  const { quantity } = product;

  // Update cart
  const [updateCartMn] = useUpdateCartMutation();

  const onAddQty = () => {
    if (quantity < available_quantity) {
      updateCartMn({ product_id: id, quantity: quantity + 1 });
    }
  };

  const onMinusQty = () => {
    if (available_quantity >= quantity && quantity !== 0) {
      updateCartMn({ product_id: id, quantity: quantity - 1 });
    }
  };

  return (
    <div className="flex flex-col items-center min-h-full w-10 divide-y divide-gray-300  border-r border-gray-300">
      <Button
        type="button"
        variant="borderNone"
        disabled={available_quantity <= quantity}
        onClick={onAddQty}
        className="flex-1 "
      >
        <PlusIcon className="w-5 h-5 " />
      </Button>
      <Button
        type="button"
        variant="borderNone"
        disabled={quantity === 1}
        onClick={onMinusQty}
        className="flex-1"
      >
        <MinusIcon className="w-5 h-5 " />
      </Button>
    </div>
  );
};

export default BasketItemControl;
