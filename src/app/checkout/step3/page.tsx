"use client";

import { Button } from "@/components/common";
import { handleEsewaPayment } from "@/lib/paymentUtils";
import { CreditPayment, StepTracker, Total } from "@/views/checkout/components";
import Image from "next/image";

const Payment = () => {
  // Redirect back if shipping information is not completed
  // if (!shipping || !shipping.isDone) {
  //   router.back();
  // }

  return (
    <div className="checkout mb-8">
      <StepTracker current={3} />
      <form className=" checkout-step-3">
        {/* <CreditPayment register={register} errors={errors} /> */}
        {/* <PayPalPayment /> */}

        <div className="w-full flex justify-center items-center gap-4 py-12">
          {/* Esewa payment ---------- */}
          <button
            type="button"
            onClick={() => handleEsewaPayment({ amt: 100, txAmt: 10 })}
          >
            <Image
              src="/esewa.png"
              alt="esewa wallet"
              width={150}
              height={200}
            />
          </button>

          <button type="button">
            <Image
              src="/khalti.png"
              alt="esewa wallet"
              width={140}
              height={150}
            />
          </button>
        </div>

        <Total isInternational={false} subtotal={2000} />
      </form>
    </div>
  );
};

export default Payment;
