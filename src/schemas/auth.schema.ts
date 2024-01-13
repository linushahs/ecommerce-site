import * as z from "zod";

// Define the form schema using zod
const loginSchema = z.object({
    email: z.string().min(1, "Email is required").email("Invalid email format"),
    password: z.string().min(1, "Password is required").min(8, "Password must be at least 8 characters"),
});

const signupSchema = z.object({
    fullName: z.string().min(1, "Fullname is required").min(8, "Fullname must be 8 characters long"),
    email: z.string().min(1, "Email is required").email("Invalid email format"),
    password: z.string().min(1, "Password is required").min(8, "Password must be at least 8 characters"),
});

const forgotPwSchema = z.object({
    email: z.string().min(1, "Email is required").email("Invalid email format"),

})

type LoginFormInputs = z.infer<typeof loginSchema>;
type RegisterFormInputs = z.infer<typeof signupSchema>;
type ForgotPwInput = z.infer<typeof forgotPwSchema>;

export { loginSchema, signupSchema, forgotPwSchema }
export type { LoginFormInputs, RegisterFormInputs, ForgotPwInput }