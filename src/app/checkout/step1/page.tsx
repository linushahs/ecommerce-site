"use client";

import { BasketItem } from "components/basket";
import { CHECKOUT_STEP_2 } from "@/constants/routes";
import {
  ArrowRightIcon,
  BuildingStorefrontIcon,
} from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";
import { FC } from "react";

import withCheckout from "../../../views/checkout/hoc/withCheckout";
import { OrderSummaryProps } from "views/checkout/interface";
import { dummyData } from "@/constants";
import { StepTracker } from "@/views/checkout/components";
import Button from "@/components/common/Button";

const OrderSummary: FC<OrderSummaryProps> = ({ basket, subtotal }) => {
  const router = useRouter();
  const onClickPrevious = () => router.push("/");
  const onClickNext = () => router.push(CHECKOUT_STEP_2);

  return (
    <div className="w-full animation-slideUp mb-8">
      <StepTracker current={1} />
      <div className="w-[50%] m-auto">
        <h3 className="text-3xl font-semibold text-center mb-2">
          Order Summary
        </h3>
        <span className="text-gray-500 font-medium  block text-center">
          Review items in your basket.
        </span>
        <br />
        <div className="flex flex-col gap-4">
          {dummyData.map((product) => (
            <BasketItem key={product.id} product={product} />
          ))}
        </div>
        <br />
        <div className="text-right">
          <p className="font-medium">Subtotal:</p>
          <h2 className="my-2 font-bold">{subtotal || 200}</h2>
        </div>
        <br />
        <div className="flex items-center justify-between">
          <button
            className=" font-bold relative flex items-center py-2.5 px-3 rounded-md justify-center border-2 text-sm border-gray-200 bg-gray-100 text-gray-500"
            onClick={onClickPrevious}
            type="button"
          >
            <BuildingStorefrontIcon className="w-6 h-6" />
            &nbsp; Continue Shopping
          </button>
          <Button variant="default">
            Next Step
            <ArrowRightIcon className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
