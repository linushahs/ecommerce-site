"use client";

import { NEW_PASSWORD } from "@/constants/routes";
import { useAppSelector } from "@/redux/store";
import OTPVerification from "@/views/auth/OTPVerification";

function VerifyPage() {
  const userID = useAppSelector((state) => state.auth.user_id);

  return <OTPVerification next_route={NEW_PASSWORD} userID={userID} />;
}

export default VerifyPage;
