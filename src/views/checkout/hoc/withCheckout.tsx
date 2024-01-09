import { SIGNIN } from "@/constants/routes";
import { useAppSelector } from "@/redux/store";
import React from "react";

const withCheckout = (Component: React.ReactElement) => (props) => {
  const state = useAppSelector((store) => ({
    // isAuth: !!store.auth.id && !!store.auth.role,
    basket: store.basket,
    // shipping: store.checkout.shipping,
    // payment: store.checkout.payment,
    // profile: store.profile,
  }));

  // const shippingFee = state.shipping.isInternational ? 50 : 0;
  const subtotal = state.basket.reduce(
    (initial, product) => initial + product.price * product.quantity,
    0
  );
  if (!state.isAuth) {
    return <Redirect to={SIGNIN} />;
  } else if (state.basket.length === 0) {
    return <Redirect to="/" />;
  } else {
    return (
      <Component
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...props}
        basket={state.basket}
        payment={state.payment}
        profile={state.profile}
        shipping={state.shipping}
        subtotal={Number(subtotal + shippingFee)}
      />
    );
  }
};

export default withCheckout;
