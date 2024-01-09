import React from "react";
import { BasketItemProps } from "./interface";
import { MinusIcon, PlusIcon } from "@heroicons/react/24/outline";
import { useAppDispatch } from "@/redux/store";
import { addQtyItem, minusQtyItem } from "@/redux/slices/basketSlice";
import { Button } from "../common";

const BasketItemControl: React.FC<BasketItemProps> = ({ product }) => {
  const dispatch = useAppDispatch();

  const onAddQty = () => {
    if (product.quantity < product.maxQuantity) {
      dispatch(addQtyItem(product.id));
    }
  };

  const onMinusQty = () => {
    if (product.maxQuantity >= product.quantity && product.quantity !== 0) {
      dispatch(minusQtyItem(product.id));
    }
  };

  return (
    <div className="flex flex-col items-center min-h-full w-10 divide-y divide-gray-300  border-r border-gray-300">
      <Button
        type="button"
        variant="borderNone"
        disabled={product.maxQuantity === product.quantity}
        onClick={onAddQty}
        className="flex-1 "
      >
        <PlusIcon className="w-5 h-5 " />
      </Button>
      <Button
        type="button"
        variant="borderNone"
        disabled={product.quantity === 1}
        onClick={onMinusQty}
        className="flex-1"
      >
        <MinusIcon className="w-5 h-5 " />
      </Button>
    </div>
  );
};

export default BasketItemControl;
