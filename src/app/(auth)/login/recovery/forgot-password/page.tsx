"use client";
import React from "react";

import { useLoginMutation } from "@/redux/api/authSlice.api";
import { LoginFormInputs, loginSchema } from "@/schemas/auth.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import { twMerge } from "tailwind-merge";
import Stepper from "@/components/common/Stepper";
import { VERIFY } from "@/constants/routes";

function ForgotPasswordPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>({
    resolver: zodResolver(loginSchema),
  });

  const [login, { data: loginResponse, error, isError, isLoading }] =
    useLoginMutation();

  const onSubmit: SubmitHandler<LoginFormInputs> = async (data) => {
    try {
      console.log(data);
      // Perform login mutation
      await login(data);
      // Handle successful login
    } catch (error) {
      // Handle login error
      console.log(error);
    }
  };

  return (
    <section className="py-10 bg-gray-50">
      <Stepper current={1} />

      <div className=" py-8 dark:bg-gray-900">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto lg:py-0">
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="mb-3 text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Forgot Password?
              </h1>
              <span className="text-[14px] text-gray-400">
                No problem, click on &apos;forgot password&apos; and we&apos;ll
                guide you through the process of resetting it
              </span>
              {/* form begins  */}
              <form
                className="space-y-4 md:space-y-6"
                onSubmit={handleSubmit(onSubmit)}
              >
                {/* email box */}
                <div className="mb-5">
                  <label
                    htmlFor="email"
                    className="block mb-2 font-medium text-gray-900 dark:text-white"
                  >
                    Your email
                  </label>
                  <input
                    required
                    type="text"
                    {...register("email", { required: true })}
                    className={twMerge(
                      "bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600  block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 ",
                      errors.email &&
                        "border-red-500 focus:ring-red-500 focus:border-0"
                    )}
                    placeholder="name@company.com"
                  />
                  {errors.email && (
                    <span className="text-sm  text-red-500">
                      {errors.email.message}
                    </span>
                  )}
                </div>
                {/* Submit  */}
                <Link href={VERIFY}>
                  <button
                    type="submit"
                    className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                  >
                    Help Recover my Account
                  </button>
                </Link>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ForgotPasswordPage;
