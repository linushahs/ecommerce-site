import * as z from "zod";

const loginSchema = z.object({
    email: z.string().min(1, "Email is required").email("Invalid email format"),
    password: z.string().min(1, "Password is required").min(8, "Password must be at least 8 characters"),
});

const signupSchema = z.object({
    full_name: z.string().min(1, "Fullname is required").min(8, "Fullname must be 8 characters long"),
    email: z.string().min(1, "Email is required").email("Invalid email format"),
    password: z.string().min(1, "Password is required").min(8, "Password must be at least 8 characters"),
    cpassword: z.string().min(1, "Re-enter password is required")
})

signupSchema.refine((data: any) => data.password === data.cpassword, {
    message: "Passwords don't match",
    path: ["cpassword"],
});

const forgotPwSchema = z.object({
    email: z.string().min(1, "Email is required").email("Invalid email format"),
});

const newPwSchema = signupSchema.pick({ password: true, cpassword: true }).refine((data: any) => data.password === data.cpassword, {
    message: "Passwords don't match",
    path: ["cpassword"],
})

const otpSchema = z.object({
    otp: z.array(z.string().length(1, "Please enter a digit")),
});

type OTPFormInput = z.infer<typeof otpSchema>;
type LoginFormInputs = z.infer<typeof loginSchema>;
type RegisterFormInputs = z.infer<typeof signupSchema>;
type ForgotPwInput = z.infer<typeof forgotPwSchema>;
type NewPwInputs = z.infer<typeof newPwSchema>;

export { loginSchema, signupSchema, forgotPwSchema, otpSchema, newPwSchema }
export type { LoginFormInputs, OTPFormInput, RegisterFormInputs, ForgotPwInput, NewPwInputs }