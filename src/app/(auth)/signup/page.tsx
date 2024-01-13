"use client";

import { CustomInput } from "@/components/form";
import { useRegisterMutation } from "@/redux/api/authSlice.api";
import { RegisterFormInputs, signupSchema } from "@/schemas/auth.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import { twMerge } from "tailwind-merge";

function SignupPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormInputs>({
    resolver: zodResolver(signupSchema),
  });

  const [signUpMutation, { data: signupResponse, error, isError, isLoading }] =
    useRegisterMutation();

  const onSubmit: SubmitHandler<RegisterFormInputs> = async (data) => {
    try {
      console.log(data);
      // Perform login mutation
      await signUpMutation(data);
      // Handle successful login
    } catch (error) {
      // Handle login error
      console.log(error);
    }
  };

  if (isError) {
    console.log(error);
    toast.error((error as any).detail || "");
  }

  return (
    <section className="pt-[var(--navbar-height)] bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Sign up your account
            </h1>
            {/* form begins  */}
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="space-y-4 md:space-y-6"
              action="#"
            >
              {/* full name box */}
              <CustomInput
                name="fullName"
                register={register}
                errors={errors}
                label="Full Name"
                placeholder="Sunil Shah"
              />
              {/* email box */}
              <CustomInput
                name="email"
                register={register}
                errors={errors}
                label="Email/ Phone number"
                placeholder="name@gmail.com"
              />
              {/* password box */}
              <CustomInput
                type="password"
                name="password"
                register={register}
                errors={errors}
                label="Password"
                placeholder="**********"
              />
              {/* re-enter password box  */}
              <CustomInput
                type="password"
                name="cpassword"
                register={register}
                errors={errors}
                label="Re-enter password"
                placeholder="***********"
              />
              {/* submit and other procedure  */}
              <button
                type="submit"
                className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                Sign up
              </button>
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Already have an account ?{" "}
                <a
                  href="/login"
                  className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                >
                  Login
                </a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default SignupPage;
