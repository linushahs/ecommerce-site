"use client";

import ProductListing from "@/components/ProductListing";
import store from "@/redux/store";
import Login from "components/body/auth/Login";
import { Provider } from "react-redux";

export default function Home() {
  return (
    <main className="">
      <Provider store={store}>
        <Login />
        <ProductListing />
      </Provider>
    </main>
  );
}
