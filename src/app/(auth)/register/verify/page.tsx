"use client";

import { LOGIN } from "@/constants/routes";
import { useAppSelector } from "@/redux/store";
import OTPVerification from "@/views/auth/OTPVerification";

function VerifyPage() {
  const userID = useAppSelector((state) => state.auth.id);

  return <OTPVerification next_route={LOGIN} userID={userID} />;
}

export default VerifyPage;
