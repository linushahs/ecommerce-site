"use client";

import { paymentFormSchema } from "@/schemas/formSchema";
import {
  CreditPayment,
  PayPalPayment,
  StepTracker,
  Total,
} from "@/views/checkout/components";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
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

const Payment = () => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
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
        <CreditPayment register={register} errors={errors} />
        <PayPalPayment />

        <Total isInternational={false} subtotal={2000} />
      </form>
    </div>
  );
};

export default Payment;
