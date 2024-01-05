import React from "react";
import { BasketItemProps } from "./interface";
import { MinusIcon, PlusIcon } from "@heroicons/react/24/outline";

const BasketItemControl: React.FC<BasketItemProps> = ({ product }) => {
  // const dispatch = useDispatch();

  // const onAddQty = () => {
  //   if (product.quantity < product.maxQuantity) {
  //     dispatch(addQtyItem(product.id));
  //   }
  // };

  // const onMinusQty = () => {
  //   if (product.maxQuantity >= product.quantity && product.quantity !== 0) {
  //     dispatch(minusQtyItem(product.id));
  //   }
  // };

  return (
    <div className="flex flex-col items-center min-h-full w-12 divide-y divide-gray-200 border-r border-gray-200">
      <button
        className="flex-1 w-full flex justify-center items-center  hover:bg-gray-100"
        // disabled={product.maxQuantity === product.quantity}
        // onClick={onAddQty}
        type="button"
      >
        <PlusIcon className="w-5 h-5 " />
      </button>
      <button
        className="flex-1  hover:bg-gray-100 w-full flex justify-center items-center "
        // disabled={product.quantity === 1}
        // onClick={onMinusQty}
        type="button"
      >
        <MinusIcon className="w-5 h-5 " />
      </button>
    </div>
  );
};

export default BasketItemControl;
