"use client";

import { Button, Stepper } from "@/components/common";
import { CustomInput } from "@/components/form";
import { NEWPW_SUCCESS } from "@/constants";
import { LOGIN } from "@/constants/routes";
import { useResetPasswordMutation } from "@/redux/api/authSlice.api";
import { setCredentials } from "@/redux/slices/authSlice";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { NewPwInputs, newPwSchema } from "@/schemas/auth.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";

const NewPasswordPage = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const otpId = useAppSelector((state) => state.auth.otp_id);

  //If otp_id is not in the state
  // Take user back to the previous page
  useEffect(() => {
    if (!otpId) {
      router.back();
    }
  }, [otpId]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<NewPwInputs>({
    resolver: zodResolver(newPwSchema),
  });

  const [resetPwMutation, { error, isError, isLoading }] =
    useResetPasswordMutation();

  const onSubmit: SubmitHandler<NewPwInputs> = async (data) => {
    if (!otpId) {
      return;
    }

    let inputs = {
      password: data.password,
      otp_id: otpId,
    };

    console.log(inputs);

    try {
      const res = await resetPwMutation(inputs).unwrap();
      dispatch(setCredentials(res));
      toast.success(NEWPW_SUCCESS);
      router.push(LOGIN);
    } catch (error) {
      console.log(error);
    }
  };

  if (isError) {
    toast.error((error as any).data.detail || "");
  }

  return (
    <section className="bg-gray-50 pt-2 pb-8">
      <Stepper current={3} />
      <div className="py-8">
        <div className="flex flex-col items-center justify-center px-6 mx-auto">
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Almost done!
              </h1>
              <span className="text-gray-400 text-sm">
                Enter a new password to complete account recovery
              </span>

              {/* form begins  */}
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="space-y-4 md:space-y-6"
                action="#"
              >
                {/*  password box  */}
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

                {/* sign in and submit */}
                <Button type="submit" variant="form" isLoading={isLoading}>
                  Confirm Password Reset
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewPasswordPage;
