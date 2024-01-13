"use client";

import { Button } from "@/components/common";
import { CustomInput } from "@/components/form";
import { useRegisterMutation } from "@/redux/api/authSlice.api";
import { setCredentials } from "@/redux/slices/authSlice";
import { RegisterFormInputs, signupSchema } from "@/schemas/auth.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";

function SignupPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormInputs>({
    resolver: zodResolver(signupSchema),
  });
  const router = useRouter();

  const [signUpMutation, { error, isError, isLoading }] = useRegisterMutation();

  const onSubmit: SubmitHandler<RegisterFormInputs> = async (data) => {
    try {
      const res = await signUpMutation(data).unwrap();
      setCredentials(res);
      toast.success("Email is registered successfully.");
      router.push("/register/verify");
    } catch (error) {
      console.log(error);
    }
  };

  if (isError) {
    toast.error((error as any).data.detail || "");
  }

  return (
    <section className="pt-8 bg-gray-50 dark:bg-gray-900">
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
                name="full_name"
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
              <Button variant="form" type="submit" isLoading={isLoading}>
                Sign up
              </Button>
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
