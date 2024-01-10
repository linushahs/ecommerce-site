"use client";

import { BasketItem } from "@/components/basket";
import { CHECKOUT_STEP_1 } from "@/constants/routes";
import { clearBasket } from "@/redux/slices/basketSlice";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { useRouter } from "next/navigation";
import { twMerge } from "tailwind-merge";
import { Button } from "../common";
import { BasketContentProps } from "./interface";

const BasketContent: React.FC<BasketContentProps> = ({ isOpen, onClose }) => {
  // const { isOpenModal, onOpenModal, onCloseModal } = useModal();
  // const { basket, user } = useSelector((state) => ({
  //   basket: state.basket,
  //   user: state.auth
  // }));
  const products = useAppSelector((state) => state.basket);
  const dispatch = useAppDispatch();
  const router = useRouter();
  // const { pathname } = useLocation();
  // const dispatch = useDispatch();
  // const didMount = useDidMount();

  const onCheckOut = () => {
    // if ((basket.length !== 0 && user)) {
    // document.body.classList.remove('is-basket-open');
    onClose(); //close the basket
    router.push(CHECKOUT_STEP_1);
    // } else {
    //   onOpenModal();
    // }
  };

  // const onSignInClick = () => {
  //   onCloseModal();
  //   document.body.classList.remove('basket-open');
  //   history.push(CHECKOUT_STEP_1);
  // };

  const onClearBasket = () => {
    if (products.length !== 0) {
      dispatch(clearBasket());
    }
  };

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
              ({` ${products.length} ${products.length > 1 ? "items" : "item"}`}
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
              disabled={products.length === 0}
              onClick={onClearBasket}
              type="button"
            >
              Clear Basket
            </Button>
          </div>
        </div>
        {products.length <= 0 && (
          <div className="basket-empty">
            <h5 className="basket-empty-msg">Your basket is empty</h5>
          </div>
        )}
        <div className="flex flex-col gap-3">
          {products.map((product) => (
            <BasketItem key={product.id} product={product} />
          ))}
        </div>
      </div>
      <div className="basket-checkout">
        <div className="basket-total">
          <p className="basket-total-title">Subtotal Amount:</p>
          <h2 className="basket-total-amount">
            {/* {calculateTotal(
              basket.map((product) => product.price * product.quantity)
            )} */}
            500
          </h2>
        </div>
        <Button
          // disabled={basket.length === 0 || pathname === "/checkout"}
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
