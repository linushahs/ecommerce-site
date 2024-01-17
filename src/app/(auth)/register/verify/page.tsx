"use client";

import { useValidateOtpMutation } from "@/redux/api/authSlice.api";
import { useAppSelector } from "@/redux/store";
import OTPVerification from "@/views/auth/OTPVerification";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

function VerifyPage() {
  const userID = useAppSelector((state) => state.auth.id);
  const [validateOTPMutation, { error, isError, isLoading }] =
    useValidateOtpMutation();
  const router = useRouter();

  //Redirect back to previous page if there is no user id
  useEffect(() => {
    if (!userID) {
      router.back();
    }
  }, [userID]);

  return (
    <section className="pt-2 pb-8 bg-gray-50">
      <OTPVerification />
    </section>
  );
}

export default VerifyPage;
