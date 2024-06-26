"use client";

import Button from "@/components/common/Button";
import { CHECKOUT_STEP_1 } from "@/constants/routes";
import { shipmentFormSchema } from "@/schemas/formSchema";
import { StepTracker } from "@/views/checkout/components";
import { ShippingDetailsProps } from "@/views/checkout/interface";
import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/outline";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import ShippingForm from "../../../views/checkout/components/ShippingForm";
import ShippingTotal from "../../../views/checkout/components/ShippingTotal";

// const initialShippingFormValues = { defaultValues: {
//       fullname: shipping.fullname || profile.fullname || '',
//       email: shipping.email || profile.email || '',
//       address: shipping.address || profile.address || '',
//       mobile: shipping.mobile || profile.mobile || {},
//       isInternational: shipping.isInternational || false,
//       isDone: shipping.isDone || false,
//     }};

const ShippingDetails = () => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ShippingDetailsProps>({
    resolver: zodResolver(shipmentFormSchema),
  });

  const onSubmitForm: SubmitHandler<FieldValues> = (formData) => {
    // Handle form submission logic here
    console.log(formData);
  };

  return (
    <div className="animation-slideUp mb-8">
      <StepTracker current={2} />
      <div className="w-1/2 mx-auto">
        <h3 className="checkout-step-title">Shipping Details</h3>
        <form onSubmit={handleSubmit(onSubmitForm)}>
          <ShippingForm />
          <br />
          {/*  ---- TOTAL --------- */}
          <ShippingTotal subtotal={300} />
          <br />
          {/*  ----- NEXT/PREV BUTTONS --------- */}
          <div className="flex items-center justify-between">
            <Button
              variant="muted"
              onClick={() => router.push(CHECKOUT_STEP_1)}
              type="button"
            >
              <ArrowLeftIcon className="w-5 h-5" />
              Go Back
            </Button>
            <Button variant="default" type="submit">
              Next Step
              <ArrowRightIcon className="w-5 h-5" />
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ShippingDetails;
