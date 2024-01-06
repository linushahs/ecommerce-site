import { useState } from "react";

const PayPalPayment = () => {
  const [values, setValues] = useState({ type: "paypal" });

  return (
    <div
      className={`checkout-fieldset-collapse ${
        values.type === "paypal" ? "is-selected-payment" : ""
      }`}
    >
      <div className="checkout-field m-0">
        <div className="checkout-checkbox-field p-4 rounded-b-md">
          <input
            checked={values.type === "paypal"}
            id="modePayPal"
            name="type"
            onChange={(e) => {
              if (e.target.checked) {
                setValues({ ...values, type: "paypal" });
              }
            }}
            type="radio"
          />
          <label className="flex w-full" htmlFor="modePayPal">
            <div className="flex-1 ml-4">
              <h4 className="m-0 font-semibold">PayPal</h4>
              <span className="text-sm text-gray-600 block mt-1">
                Pay easily, fast and secure with PayPal.
              </span>
            </div>
            <div className="payment-img payment-img-paypal" />
          </label>
        </div>
      </div>
    </div>
  );
};

export default PayPalPayment;
