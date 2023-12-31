"use client";

import Profile from "@/components/body/profile/Profile";
import store from "@/redux/store";
import { Provider } from "react-redux";

export default function Home() {
  return (
    <main className="">
      <Provider store={store}>
        {/* <Login /> */}
        {/* <Dashboard /> */}
        <Profile />
      </Provider>
    </main>
  );
}
