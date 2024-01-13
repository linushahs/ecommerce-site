"use client";

import Stepper from "@/components/common/Stepper";
import { CustomInput } from "@/components/form";
import { useRequestPwResetMutation } from "@/redux/api/authSlice.api";
import { ForgotPwInput, forgotPwSchema } from "@/schemas/auth.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";

function ForgotPasswordPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPwInput>({
    resolver: zodResolver(forgotPwSchema),
  });

  const [reqPwResetMutation, { data, error, isError, isLoading }] =
    useRequestPwResetMutation();

  const onSubmit: SubmitHandler<ForgotPwInput> = async (data) => {
    try {
      console.log(data);
      // Perform login mutation
      await reqPwResetMutation(data);
      // Handle successful login
    } catch (error) {
      // Handle login error
      console.log(error);
    }
  };

  if (isError) {
    toast.error((error as any).data.detail || "");
  }

  return (
    <section className="pt-2 pb-8 bg-gray-50">
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
                <CustomInput
                  name="email"
                  register={register}
                  errors={errors}
                  label="Email"
                  placeholder="name@gmail.com"
                />
                {/* Submit  */}
                <button
                  type="submit"
                  className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                >
                  Help Recover my Account
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ForgotPasswordPage;
