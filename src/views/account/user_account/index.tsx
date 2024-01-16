import { Spinner } from "@/components/common";
import { lazy, Suspense } from "react";
import UserTab from "../components/UserTab";

const UserAccountTab = lazy(() => import("../components/UserAccountTab"));
const UserWishListTab = lazy(() => import("../components/UserWishListTab"));
const UserOrdersTab = lazy(() => import("../components/UserOrdersTab"));

const Loader = () => (
  <div className="loader" style={{ minHeight: "80vh" }}>
    <Spinner />
    <h6>Loading ... </h6>
  </div>
);

const UserAccount = () => {
  return (
    <UserTab>
      <div data-index={0} data-label="Account">
        <Suspense fallback={<Loader />}>
          <UserAccountTab />
        </Suspense>
      </div>
      <div data-index={1} data-label="My Wish List">
        <Suspense fallback={<Loader />}>
          <UserWishListTab />
        </Suspense>
      </div>
      <div data-index={2} data-label="My Orders">
        <Suspense fallback={<Loader />}>
          <UserOrdersTab />
        </Suspense>
      </div>
    </UserTab>
  );
};

export default UserAccount;
