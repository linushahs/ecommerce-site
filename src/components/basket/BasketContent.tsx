"use client";

import { BasketItem } from "@/components/basket";
import { CHECKOUT_STEP_1 } from "@/constants/routes";
import { useGetCartDetailsQuery } from "@/redux/api/cartSlice.api";
import { usePathname, useRouter } from "next/navigation";
import { twMerge } from "tailwind-merge";
import { Button } from "../common";
import { BasketContentProps } from "./interface";

const BasketContent: React.FC<BasketContentProps> = ({ isOpen, onClose }) => {
  const { data: cartDetails, isLoading } = useGetCartDetailsQuery();
  const router = useRouter();
  const params = usePathname();

  const onCheckOut = () => {
    onClose();
    router.push(CHECKOUT_STEP_1);
  };

  // const onSignInClick = () => {
  //   onCloseModal();
  //   document.body.classList.remove('basket-open');
  //   history.push(CHECKOUT_STEP_1);
  // };

  const onClearBasket = () => {
    if (cartDetails?.products.length !== 0) {
      // clear cart
    }
  };

  const products = cartDetails?.products;
  const totalNoOfProducts = products?.length;

  console.log(products, totalNoOfProducts);

  {
    /* <Modal
        isOpen={isOpenModal}
        onRequestClose={onCloseModal}
      >
        <p className="text-center">You must sign in to continue checking out</p>
        <br />
        <div className="d-flex-center">
          <button
            className="button button-border button-border-gray button-small"
            onClick={onCloseModal}
            type="button"
          >
            Continue shopping
          </button>
          &nbsp;
          <button
            className="button button-small"
            onClick={onSignInClick}
            type="button"
          >
            Sign in to checkout
          </button>
        </div>
      </Modal> */
  }

  return (
    <div className={twMerge("basket", isOpen && "is-open")}>
      <div className="basket-list">
        <div className="basket-header mb-6">
          <h3 className="basket-header-title">
            My Basket &nbsp;
            <span className="text-sm font-medium">
              (
              {` ${totalNoOfProducts} ${
                totalNoOfProducts && totalNoOfProducts > 1 ? "items" : "item"
              }`}
              )
            </span>
          </h3>

          <div className="flex border border-gray-300 rounded overflow-hidden  *:rounded-none">
            <Button
              onClick={onClose}
              variant="borderGray"
              className="border-0 border-r"
            >
              Close
            </Button>

            <Button
              variant="borderGray"
              className="border-0"
              disabled={totalNoOfProducts === 0}
              onClick={onClearBasket}
              type="button"
            >
              Clear Basket
            </Button>
          </div>
        </div>
        {totalNoOfProducts && totalNoOfProducts <= 0 && (
          <div className="basket-empty">
            <h5 className="basket-empty-msg">Your basket is empty</h5>
          </div>
        )}
        <div className="flex flex-col gap-3">
          {products?.map((product) => (
            <BasketItem key={product.id} product={product} />
          ))}
        </div>
      </div>
      <div className="basket-checkout">
        <div className="basket-total">
          <p className="basket-total-title">Subtotal Amount:</p>
          <h2 className="basket-total-amount">{cartDetails?.cart_total}</h2>
        </div>
        <Button
          disabled={totalNoOfProducts === 0 || params === "/checkout"}
          onClick={onCheckOut}
          type="button"
        >
          Check Out
        </Button>
      </div>
    </div>
  );
};

export default BasketContent;
