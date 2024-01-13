import { CustomInput } from "@/components/form";
import { CPaymentProps } from "@/components/form/interface";
import { ChangeEvent, FC, useEffect, useRef, useState } from "react";
import { twMerge } from "tailwind-merge";

const CreditPayment: FC<CPaymentProps> = ({ register, errors }) => {
  const [values, setValues] = useState({ type: "credit" });
  const collapseContainerRef = useRef<HTMLDivElement>(null);
  const cardInputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const checkboxContainerRef = useRef<HTMLInputElement>(null);

  const toggleCollapse = () => {
    const cn = containerRef.current;
    const cb = checkboxContainerRef.current;
    const cl = collapseContainerRef.current;
    const ci = cardInputRef.current;

    if (cb && cn && cl && ci) {
      if (values.type === "credit") {
        ci.focus();
        cn.style.height = `${cb.offsetHeight + cl.offsetHeight}px`;
      } else {
        ci.blur();
        cn.style.height = `${cb.offsetHeight}px`;
      }
    }
  };

  useEffect(() => {
    toggleCollapse();
  }, []);

  const onCreditModeChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setValues({ ...values, type: "credit" });
      toggleCollapse();
    }
  };

  // const handleOnlyNumberInput = (e: KeyboardEventHandler<HTMLInputElement>) => {
  //   const { key } = e.nativeEvent;
  //   if (/\D/.test(key) && key !== "Backspace") {
  //     e.preventDefault();
  //   }
  // };

  return (
    <>
      <h3 className="checkout-step-title">Payment</h3>
      <br />
      <span className="block p-2 text-lg font-medium">Payment Option</span>
      <div
        ref={containerRef}
        className={twMerge(
          "checkout-fieldset-collapse",
          values.type === "credit" ? "is-selected-payment" : ""
        )}
      >
        {/* ---- CHECKBOX TOGGLER ------ */}
        <div className="checkout-field m-0 ">
          <div
            className="checkout-checkbox-field p-4 rounded-t-md"
            ref={checkboxContainerRef}
          >
            <input
              checked={values.type === "credit"}
              id="modeCredit"
              name="type" // the field name in formik I used is type
              onChange={onCreditModeChange}
              type="radio"
            />
            <label className="flex w-full" htmlFor="modeCredit">
              <div className="flex-1 ml-4">
                <h4 className="m-0 font-semibold">Credit Card</h4>
                <span className="text-gray-600 block mt-1 text-sm">
                  Pay with Visa, Master Card and other debit or credit card
                </span>
              </div>
              <div className="flex">
                <div className="payment-img payment-img-visa" />
                &nbsp;
                <div className="payment-img payment-img-mastercard" />
              </div>
            </label>
          </div>
        </div>
        <div className="checkout-collapse-sub" ref={collapseContainerRef}>
          <span className="block p-2 text-center">Accepted Cards</span>
          <div className="checkout-cards-accepted flex justify-center">
            <div className="payment-img payment-img-visa" title="Visa" />
            <div
              className="payment-img payment-img-express"
              title="American Express"
            />
            <div
              className="payment-img payment-img-mastercard"
              title="Master Card"
            />
            <div className="payment-img payment-img-maestro" title="Maestro" />
            <div
              className="payment-img payment-img-discover"
              title="Discover"
            />
          </div>
          <br />
          <div className="checkout-field m-0 px-4">
            <div className="checkout-fieldset">
              <div className="checkout-field">
                <CustomInput
                  name="name"
                  type="text"
                  label="Name on Card*"
                  placeholder="Jane Doe"
                  ref={cardInputRef}
                  register={register}
                  errors={errors}
                />
              </div>
              <div className="checkout-field">
                <CustomInput
                  name="cardnumber"
                  type="text"
                  maxLength={19}
                  label="Card Number*"
                  register={register}
                  placeholder="Enter your card number"
                  errors={errors}
                />
              </div>
            </div>
            <div className="checkout-fieldset">
              <div className="checkout-field">
                <CustomInput
                  name="expiry"
                  type="date"
                  label="Expiry Date*"
                  register={register}
                  placeholder="Enter your expiry date"
                  errors={errors}
                />
              </div>
              <div className="checkout-field">
                <CustomInput
                  name="ccv"
                  type="text"
                  register={register}
                  maxLength={4}
                  label="CCV*"
                  placeholder="****"
                  errors={errors}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreditPayment;
