import * as z from "zod";

// Define the form schema using zod
const loginSchema = z.object({
    email: z.string().min(1, "Email is required").email("Invalid email format"),
    password: z.string().min(1, "Password is required").min(8, "Password must be at least 8 characters"),
});

const signupSchema = z.object({
    full_name: z.string().min(1, "Fullname is required").min(8, "Fullname must be 8 characters long"),
    email: z.string().min(1, "Email is required").email("Invalid email format"),
    password: z.string().min(1, "Password is required").min(8, "Password must be at least 8 characters"),
    cpassword: z.string().min(1, "Re-enter password is required")
}).refine((data: any) => data.password === data.cpassword, {
    message: "Passwords don't match",
    path: ["cpassword"],
});

const forgotPwSchema = z.object({
    email: z.string().min(1, "Email is required").email("Invalid email format"),

})

const otpSchema = z.object({
    otp: z.array(z.string().length(1, "Please enter a digit")),
});

type OTPFormInput = z.infer<typeof otpSchema>;
type LoginFormInputs = z.infer<typeof loginSchema>;
type RegisterFormInputs = z.infer<typeof signupSchema>;
type ForgotPwInput = z.infer<typeof forgotPwSchema>;

export { loginSchema, signupSchema, forgotPwSchema, otpSchema }
export type { LoginFormInputs, OTPFormInput, RegisterFormInputs, ForgotPwInput }