"use client";

import { Button, Stepper } from "@/components/common";
import { useValidateOtpMutation } from "@/redux/api/authSlice.api";
import { setCredentials } from "@/redux/slices/authSlice";
import { useAppSelector } from "@/redux/store";
import { OTPFormInput, otpSchema } from "@/schemas/auth.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { ChangeEvent, KeyboardEvent, useRef, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import { twMerge } from "tailwind-merge";

function OTPVerification() {
  const [otp, setOtp] = useState<string[]>(["", "", "", "", "", ""]);
  const inputRefs = useRef<HTMLInputElement[] | null[]>(
    Array.from({ length: 6 }, () => null)
  );
  const router = useRouter();
  const authCredentials = useAppSelector((state) => state.auth);

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(otpSchema),
    defaultValues: { otp },
  });

  const [validateOTPMutation, { error, isError, isLoading }] =
    useValidateOtpMutation();

  const handleChange = (e: ChangeEvent<HTMLInputElement>, index: number) => {
    const newOtp = [...otp];
    newOtp[index] = e.target.value;

    if (e.target.value.length >= 1 && index < otp.length - 1) {
      inputRefs.current[index + 1]?.focus();
    }

    setOtp(newOtp);
  };

  const handleRemoveInput = (
    e: KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (
      (e.target as HTMLInputElement).value === "" &&
      index > 0 &&
      (e.code === "Backspace" || e.key === "Backspace")
    ) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const onSubmit: SubmitHandler<OTPFormInput> = async (data) => {
    const i_otp = parseInt(data.otp.join(""));
    const inputs = {
      id: "aa50d599-e99f-435d-9a0e-185ed1dc3a18",
      otp: i_otp,
    };

    try {
      const res = await validateOTPMutation(inputs).unwrap();
      setCredentials(res);
      toast.success("OTP is verified");
      router.push("/new-password");
    } catch (error) {
      console.log(error);
    }
  };

  if (isError) {
    toast.error((error as any).data.detail || "");
  }

  return (
    <section className="pt-2 pb-8 bg-gray-50">
      <Stepper current={2} />
      <div className="py-6 flex items-center justify-center ">
        <div className="bg-white p-8 rounded-lg shadow-md w-[450px]">
          <h2 className="text-2xl font-bold mb-4">OTP Verification</h2>
          <p className="text-gray-400 mb-4">
            To continue, please enter the 6-digit code in the email address we
            just sent to ******@gmail.com
          </p>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex justify-between my-7">
              {Array.from({ length: otp.length }, (_, index) => (
                <Controller
                  key={index}
                  control={control}
                  name={`otp.${index}`}
                  defaultValue={otp[index]}
                  render={({ field: { value, onChange } }) => (
                    <input
                      type="text"
                      id={`otp-input-${index}`}
                      ref={(el) => ((inputRefs.current[index] as any) = el)}
                      value={value}
                      onChange={(e) => {
                        onChange(e);
                        handleChange(e, index);
                      }}
                      onKeyDown={(e) => handleRemoveInput(e, index)}
                      maxLength={1}
                      className={twMerge(
                        "w-12 h-12 text-2xl border-2 rounded-md text-center",
                        errors?.otp?.[index]
                          ? "border-red-500"
                          : "border-gray-300"
                      )}
                    />
                  )}
                />
              ))}
            </div>

            <Button variant="form" type="submit" isLoading={isLoading}>
              Continue
            </Button>
          </form>

          <div className="flex justify-between">
            {/* Timer and Resend button */}
          </div>
        </div>
      </div>
    </section>
  );
}

export default OTPVerification;
