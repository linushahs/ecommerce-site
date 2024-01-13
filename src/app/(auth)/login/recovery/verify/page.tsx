"use client";

import React, {
  useState,
  useEffect,
  useRef,
  ChangeEvent,
  KeyboardEvent,
} from "react";
import Stepper from "@/components/common/Stepper";

function VerifyPage() {
  const [otp, setOtp] = useState<string[]>(["", "", "", "", "", ""]);
  const [timer, setTimer] = useState<number>(60); // Timer in seconds
  const inputRefs = useRef<HTMLInputElement[] | null[]>(
    Array.from({ length: 6 }, () => null)
  );

  const otpLength = 6;

  const handleChange = (e: ChangeEvent<HTMLInputElement>, index: number) => {
    const newOtp = [...otp];
    newOtp[index] = e.target.value;

    if (e.target.value.length >= 1 && index < otpLength - 1) {
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

  useEffect(() => {
    const countdown = setInterval(() => {
      setTimer((prevTimer) => (prevTimer > 0 ? prevTimer - 1 : 0));
    }, 1000);

    // Clear the interval when the component is unmounted
    return () => clearInterval(countdown);
  }, []);

  return (
    <section className="pt-2 pb-8 bg-gray-50 ">
      <Stepper current={2} />
      <div className="py-6 flex items-center justify-center ">
        <div className="bg-white p-8 rounded-lg shadow-md w-[450px]">
          <h2 className="text-2xl font-bold mb-4">OTP Verification</h2>
          <p className="text-gray-400 mb-4">
            To continue, please enter the 6-digit code in the email address we
            just sent to ******@gmail.com
          </p>

          <div className="flex justify-between my-7">
            {Array.from({ length: otpLength }, (_, index) => (
              <input
                key={index}
                type="text" // Use type="text" to allow numeric characters only
                id={`otp-input-${index}`}
                ref={(el) => ((inputRefs.current[index] as any) = el)}
                value={otp[index]}
                onChange={(e) => handleChange(e, index)}
                onKeyDown={(e) => handleRemoveInput(e, index)}
                maxLength={1}
                className="w-12 h-12 text-3xl border-2 border-gray-300 rounded-md text-center"
              />
            ))}
          </div>

          <button
            onClick={() => console.log("Verify Button Clicked")}
            className="bg-blue-500 w-full text-white py-2 px-4 rounded hover:bg-blue-600"
          >
            Continue
          </button>
          <div className="flex justify-between">
            <div className="text-gray-900 mt-4 text-sm mb-2">
              {timer > 0 ? `Expires in 00:${timer}` : "Expired"}
            </div>

            <div>
              <button
                onClick={() => {
                  setTimer(60); // Reset the timer
                  console.log("Resend Button Clicked");
                }}
                className="text-gray-400 mt-4 text-sm mb-2"
              >
                Re-send Code
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default VerifyPage;
