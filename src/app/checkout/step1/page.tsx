"use client";

import { CHECKOUT_STEP_2 } from "@/constants/routes";
import {
  ArrowRightIcon,
  BuildingStorefrontIcon,
} from "@heroicons/react/24/outline";
import { BasketItem } from "components/basket";
import { useRouter } from "next/navigation";

import Button from "@/components/common/Button";
import { useAppSelector } from "@/redux/store";
import { StepTracker } from "@/views/checkout/components";
import withAuth from "@/components/hoc/withAuth";
import { useGetCartDetailsQuery } from "@/redux/api/cartSlice.api";

const OrderSummaryPage = () => {
  const router = useRouter();
  const onClickPrevious = () => router.push("/");
  const onClickNext = () => router.push(CHECKOUT_STEP_2);

  const { data: cartDetails } = useGetCartDetailsQuery();

  return (
    <div className="w-full animation-slideUp mb-8">
      <StepTracker current={1} />
      <div className="w-[50%] m-auto">
        <h3 className="checkout-step-title">Order Summary</h3>
        <span className="text-gray-500 font-medium  block text-center">
          Review items in your basket.
        </span>
        <br />
        <div className="flex flex-col gap-4">
          {cartDetails?.products.map((product) => (
            <BasketItem key={product.product_details.id} product={product} />
          ))}
        </div>
        <br />
        <div className="text-right">
          <p className="font-medium">Subtotal:</p>
          <h2 className="my-2 font-bold">{cartDetails?.cart_total}</h2>
        </div>
        <br />
        <div className="flex items-center justify-between">
          <Button variant="muted" onClick={onClickPrevious} type="button">
            <BuildingStorefrontIcon className="w-6 h-6" />
            Continue Shopping
          </Button>
          <Button variant="default" onClick={onClickNext}>
            Next Step
            <ArrowRightIcon className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default withAuth(OrderSummaryPage);
