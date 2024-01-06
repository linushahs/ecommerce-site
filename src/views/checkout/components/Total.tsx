import { CHECKOUT_STEP_2 } from "@/constants/routes";
import React from "react";
import Button from "@/components/common/Button";
import { CTotalProps } from "@/components/form/interface";
import { ArrowLeftIcon, CheckIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";

const Total: React.FC<CTotalProps> = ({ isInternational, subtotal }) => {
  const router = useRouter();
  // const dispatch = useDispatch();

  const onClickBack = () => {
    // destructure to only select left fields omitting cardnumber and ccv
    // const { cardnumber, ccv, ...rest } = values;

    // dispatch(setPaymentDetails({ ...rest })); // save payment details
    router.push(CHECKOUT_STEP_2);
  };

  return (
    <>
      <div className="basket-total text-right pb-1">
        <p className="basket-total-title">Total:</p>
        <h2 className="basket-total-amount">
          {subtotal + (isInternational ? 50 : 0)}
        </h2>
      </div>
      <div className="checkout-shipping-action">
        <Button variant="muted" onClick={onClickBack} type="button">
          <ArrowLeftIcon className="w-5 h-5" />
          Go Back
        </Button>
        <Button disabled={false} type="button">
          <CheckIcon className="w-5 h-5" />
          Confirm
        </Button>
      </div>
    </>
  );
};

export default Total;
