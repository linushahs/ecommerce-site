"use client";

import Profile from "@/components/body/profile/Profile";
import store from "@/redux/store";
import { Provider } from "react-redux";

export default function Home() {
  return (
      <Provider store={store}>
        <main className="h-full">
            {/* <Login /> */}
            {/* <Dashboard /> */}
            <Profile />
        </main>
      </Provider>
  );
}
