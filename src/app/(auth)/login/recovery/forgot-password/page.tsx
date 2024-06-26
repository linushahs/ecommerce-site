"use client";

import { Button } from "@/components/common";
import Stepper from "@/components/common/Stepper";
import { CustomInput } from "@/components/form";
import { FORGOTPW_SUCCESS } from "@/constants";
import { FORGOTPW_VERIFY } from "@/constants/routes";
import { useRequestPwResetMutation } from "@/redux/api/authSlice.api";
import { setCredentials } from "@/redux/slices/authSlice";
import { useAppDispatch } from "@/redux/store";
import { ForgotPwInput, forgotPwSchema } from "@/schemas/auth.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";

function ForgotPasswordPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPwInput>({
    resolver: zodResolver(forgotPwSchema),
    defaultValues: {
      email: "suniltraveler2004@gmail.com",
    },
  });
  const router = useRouter();
  const dispatch = useAppDispatch();

  const [reqPwResetMutation, { error, isError, isLoading }] =
    useRequestPwResetMutation();

  const onSubmit: SubmitHandler<ForgotPwInput> = async (data) => {
    try {
      const res = await reqPwResetMutation(data).unwrap();
      console.log(res);
      //store user_id in credentials
      dispatch(setCredentials(res));
      // Handle successful login
      toast.success(FORGOTPW_SUCCESS);
      router.push(FORGOTPW_VERIFY);
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
                <Button variant="form" type="submit" isLoading={isLoading}>
                  Help Recover my Account
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ForgotPasswordPage;
