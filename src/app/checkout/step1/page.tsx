"use client";

import { BasketItem } from 'components/basket';
import { CHECKOUT_STEP_2 } from '@/constants/routes';
import { BuildingStorefrontIcon } from '@heroicons/react/20/solid';
import { ArrowRightIcon } from '@heroicons/react/24/outline';
import { useRouter } from "next/navigation";
import { FC } from 'react';
import { StepTracker } from '../../../views/checkout/components';
import withCheckout from '../../../views/checkout/hoc/withCheckout';
import { OrderSummaryProps } from '../../../views/checkout/interface';

const OrderSummary: FC<OrderSummaryProps> = ({ basket, subtotal }) => {
  const router = useRouter();
  const onClickPrevious = () => router.push('/');
  const onClickNext = () => router.push(CHECKOUT_STEP_2);

  return (
    <div className="checkout">
      <StepTracker current={1} />
      <div className="checkout-step-1">
        <h3 className="text-center">Order Summary</h3>
        <span className="d-block text-center">Review items in your basket.</span>
        <br />
        <div className="checkout-items">
          {basket.map((product) => (
            <BasketItem
              key={product.id}
              product={product}
            />
          ))}
        </div>
        <br />
        <div className="basket-total text-right">
          <p className="basket-total-title">Subtotal:</p>
          <h2 className="basket-total-amount">{subtotal}</h2>
        </div>
        <br />
        <div className="checkout-shipping-action">
          <button
            className="button button-muted"
            onClick={onClickPrevious}
            type="button"
          >
            <BuildingStorefrontIcon className='w-7 h-7' />
            &nbsp;
            Continue Shopping
          </button>
          <button
            className="button"
            onClick={onClickNext}
            type="submit"
          >
            Next Step
            &nbsp;
            <ArrowRightIcon  className='w-7 h-7' />
          </button>
        </div>
      </div>
    </div>
  );
};


export default withCheckout(OrderSummary);
