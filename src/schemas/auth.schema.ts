import * as z from "zod";

// Define the form schema using zod
const loginSchema = z.object({
    email: z.string({ required_error: "Email is required" }).email("Invalid email format"),
    password: z.string({ required_error: "Password is required" }).min(8, "Password must be at least 8 characters"),
});

type LoginFormInputs = z.infer<typeof loginSchema>;

export { loginSchema }
export type { LoginFormInputs }