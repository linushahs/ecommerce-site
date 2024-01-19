import { z } from "zod";

const userProfileSchema = z.object({
    full_name: z.string().min(1, { message: "Full name is required" }).min(8, { message: "Full name must be 8 characters long" }),
    email: z.string().min(1, { message: "Email is required" }).email({ message: "Invalid email format" }),
    address_city: z.string().optional(),
    phone_number: z.string().optional(),
});

type UserProfileInputs = z.infer<typeof userProfileSchema>;

export { userProfileSchema };
export type { UserProfileInputs };