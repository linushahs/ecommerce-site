"use client";

import { useLoginMutation } from "@/redux/api/authSlice.api";
import { LoginFormInputs, loginSchema } from "@/schemas/auth.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import { twMerge } from "tailwind-merge";

function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>({
    resolver: zodResolver(loginSchema),
  });

  const [login, { data, error, isError, isLoading }] = useLoginMutation();

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

  if (isError) {
    toast.error(error?.detail || "");
  }

  return (
    <div>
      <section className="bg-gray-50 dark:bg-gray-900">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Sign in to your account
              </h1>
              {/* form begins  */}
              <form
                className="space-y-4 md:space-y-6"
                onSubmit={handleSubmit(onSubmit)}
              >
                {/* email box */}
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 font-medium text-gray-900 dark:text-white"
                  >
                    Your email
                  </label>
                  <input
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
                {/* password box */}
                <div>
                  <label
                    htmlFor="password"
                    className="block mb-2 font-medium text-gray-900 dark:text-white"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    {...register("password", { required: true })}
                    placeholder="••••••••"
                    className={twMerge(
                      "bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600  block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-0 ",
                      errors.password &&
                        "border-red-500 focus:ring-red-500 focus:border-0"
                    )}
                  />
                  {errors.password && (
                    <span className="text-sm  text-red-500">
                      {errors.password.message}
                    </span>
                  )}
                </div>
                {/* remember me:- checkbox and forgot password  */}
                {/* ------------------------------------- */}

                <div className="flex items-center justify-between">
                  <div className="flex items-start">
                    <label
                      htmlFor="remember"
                      className="text-gray-500 dark:text-gray-300"
                    >
                      <input
                        id="remember"
                        aria-describedby="remember"
                        type="checkbox"
                        className="w-4 h-4 mr-2 border border-gray-300 rounded bg-gray-50 focus:ring-1 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                      />
                      Remember me
                    </label>
                  </div>
                  <a
                    href="#"
                    className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500"
                  >
                    Forgot password?
                  </a>
                </div>

                {/* sign in and submit ------------------*/}
                {/* ------------------------------------- */}
                <button
                  type="submit"
                  className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                >
                  Sign in
                </button>
                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                  Don’t have an account yet?{" "}
                  <a
                    href="/signup"
                    className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                  >
                    Sign up
                  </a>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default LoginPage;
