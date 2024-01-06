"use client";

import { paymentFormSchema } from "@/schemas/formSchema";
import {
  CreditPayment,
  PayPalPayment,
  StepTracker,
  Total,
} from "@/views/checkout/components";
import { PaymentProps } from "@/views/checkout/interface";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { FC } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

// const initPaymentValues = {
//   defaultValues: {
//     name: payment.name || "",
//     cardnumber: payment.cardnumber || "",
//     expiry: payment.expiry || "",
//     ccv: payment.ccv || "",
//     type: payment.type || "paypal",
//   },
// };

const Payment: FC<PaymentProps> = ({ shipping, payment, subtotal }) => {
  const router = useRouter();

  const { register, handleSubmit, watch } = useForm({
    resolver: zodResolver(paymentFormSchema),
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    // Handle form submission here
    // displayActionMessage("Feature not ready yet :)", "info");
    console.log("submitted");
  };

  const selectedPaymentType = watch("type");

  // If payment type is PayPal, display a message (replace this with actual logic)
  // if (selectedPaymentType === "paypal") {
  //   displayActionMessage("Feature not ready yet :)", "info");
  // }

  // Redirect back if shipping information is not completed
  // if (!shipping || !shipping.isDone) {
  //   router.back();
  // }

  return (
    <div className="checkout mb-8">
      <StepTracker current={3} />
      <form className="checkout-step-3" onSubmit={handleSubmit(onSubmit)}>
        <CreditPayment register={register} />
        <PayPalPayment />

        <Total isInternational={false} subtotal={2000} />
      </form>
    </div>
  );
};

export default Payment;
