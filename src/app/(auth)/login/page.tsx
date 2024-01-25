"use client";

import { Button } from "@/components/common";
import { CustomInput } from "@/components/form";
import { LOGIN_SUCESS } from "@/constants";
import { FORGOT_PASSWORD } from "@/constants/routes";
import { useLoginMutation } from "@/redux/api/authSlice.api";
import { setCredentials } from "@/redux/slices/authSlice";
import { useAppDispatch } from "@/redux/store";
import { LoginFormInputs, loginSchema } from "@/schemas/auth.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";

function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "suniltraveler2004@gmail.com",
      password: "sunil123",
    },
  });
  const router = useRouter();
  const dispatch = useAppDispatch();

  const [login, { isLoading }] = useLoginMutation();

  const onSubmit: SubmitHandler<LoginFormInputs> = async (data) => {
    try {
      await login(data);
      router.push("/shop");
    } catch (error) {
      console.log(error);
    }
  };

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
                <CustomInput
                  name="email"
                  register={register}
                  errors={errors}
                  label="Email"
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
                {/* remember me:- checkbox and forgot password  */}
                {/* ------------------------------------- */}

                <div className="flex items-center justify-between">
                  <div className="flex items-start">
                    <label
                      htmlFor="remember"
                      className="text-gray-500 dark:text-gray-300 flex items-center gap-2"
                    >
                      <input
                        id="remember"
                        aria-describedby="remember"
                        type="checkbox"
                        className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-1 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                      />
                      Remember me
                    </label>
                  </div>
                  <Link
                    href={FORGOT_PASSWORD}
                    className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500"
                  >
                    Forgot password?
                  </Link>
                </div>

                {/* sign in and submit ------------------*/}
                {/* ------------------------------------- */}
                <Button type="submit" variant="form" isLoading={isLoading}>
                  Sign in
                </Button>
                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                  Don’t have an account yet?{" "}
                  <a
                    href="/register"
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
