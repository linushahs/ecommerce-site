"use client";
import React, { useState, useEffect } from "react";
import Stepper from "../forgot-password/Stepper";

function page() {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [timer, setTimer] = useState(60); // Timer in seconds
  const otpLength = 6;

  const handleChange = (e, index) => {
    const newOtp = [...otp];
    newOtp[index] = e.target.value;

    if (e.target.value !== "" && index < otpLength - 1) {
      document.getElementById(`otp-input-${index + 1}`).focus();
    }

    setOtp(newOtp);
  };

  useEffect(() => {
    const countdown = setInterval(() => {
      setTimer((prevTimer) => (prevTimer > 0 ? prevTimer - 1 : 0));
    }, 1000);

    // Clear the interval when the component is unmounted
    return () => clearInterval(countdown);
  }, []);

  return (
    <section>
      <Stepper current={2} />
      <div className="py-6 flex items-center justify-center bg-gray-50">
        <div className="bg-white p-8 rounded shadow-md w-[450px]">
          <h2 className="text-2xl font-bold mb-4">OTP Verification</h2>
          <p className="text-gray-400 mb-4">
            To continue, please enter the 6-digit code in the email address we
            just sent to ******@gmail.com
          </p>

          <div className="flex justify-between my-7">
            {Array.from({ length: otpLength }, (_, index) => (
              <input
                key={index}
                type="text"
                id={`otp-input-${index}`}
                value={otp[index]}
                onChange={(e) => handleChange(e, index)}
                maxLength="1"
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

            {/* {timer === 0 && ( */}
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
            {/* )} */}
          </div>
        </div>
      </div>
    </section>
  );
}

export default page;
