"use client";

import React, { useState } from "react";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { Stepper } from "@/components/common";

const page = () => {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [showNewPassword, setShowNewPassword] = useState(false);

  const handleTogglePassword = (e) => {
    e.preventDefault();
    setShowPassword(!showPassword);
  };

  const handleToggleNewPassword = (e) => {
    e.preventDefault();
    setShowNewPassword(!showNewPassword);
  };

  return (
    <section>
      <Stepper current={3} />
      <div className="py-4 bg-gray-50 dark:bg-gray-900">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto lg:py-0">
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Almost done!
              </h1>
              <span className="text-gray-400 text-sm">
                Enter a new password to complete account recovery
              </span>

              {/* form begins  */}
              <form className="space-y-4 md:space-y-6" action="#">
                {[
                  {
                    label: "New Password",
                    value: password,
                    onChange: (e) => setPassword(e.target.value),
                    show: showPassword,
                    handleToggle: handleTogglePassword,
                  },
                  {
                    label: "Confirm Password",
                    value: newPassword,
                    onChange: (e) => setNewPassword(e.target.value),
                    show: showNewPassword,
                    handleToggle: handleToggleNewPassword,
                  },
                ].map((input, index) => (
                  <div key={index}>
                    <label
                      htmlFor={`password${index}`}
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      {input.label}
                    </label>
                    <div className="flex justify-between items-center">
                      <input
                        onChange={input.onChange}
                        value={input.value}
                        type={input.show ? "text" : "password"}
                        name={`password${index}`}
                        placeholder="••••••••"
                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        required
                      />
                      <button
                        onClick={input.handleToggle}
                        className="absolute left-[835px] cursor-pointer"
                      >
                        {input.show ? (
                          <EyeSlashIcon
                            toggle={input.show}
                            width={20}
                            height={20}
                          />
                        ) : (
                          <EyeIcon toggle={input.show} width={20} height={20} />
                        )}
                      </button>
                    </div>
                  </div>
                ))}

                {/* sign in and submit */}
                <button
                  type="submit"
                  className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                >
                  Confirm Password Reset
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default page;
