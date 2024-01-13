import * as z from "zod";

// Define the form schema using zod
const loginSchema = z.object({
    email: z.string({ required_error: "Email is required" }).email("Invalid email format"),
    password: z.string({ required_error: "Password is required" }).min(8, "Password must be at least 8 characters"),
});

const signupSchema = z.object({
    fullName: z.string({ required_error: "Email is required" }).min(8, "Fullname must be 8 characters long"),
    email: z.string({ required_error: "Email is required" }).email("Invalid email format"),
    password: z.string({ required_error: "Password is required" }).min(8, "Password must be at least 8 characters"),
});

type LoginFormInputs = z.infer<typeof loginSchema>;
type RegisterFormInputs = z.infer<typeof signupSchema>;

export { loginSchema, signupSchema }
export type { LoginFormInputs, RegisterFormInputs }