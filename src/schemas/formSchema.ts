import { z } from 'zod';

const FormSchema = z.object({
    fullname: z.string({ required_error: 'Full name is required.' })
        .min(8, { message: 'Full name must be at least 8 characters long.' })
        .max(60, { message: 'Full name must only be less than 60 characters.' }),

    email: z.string({ required_error: "Email is required" }).email({ message: 'Email is not valid.' }),

    address: z.string({ required_error: "Shipping address is required" }),

    mobile: z.object({
        country: z.string(),
        countryCode: z.string(),
        dialCode: z.string()
            .refine((data: any) => !!data, { message: 'Mobile number is required' }),
        value: z.string()
            .refine((data: any) => !!data, { message: 'Mobile number is required' }),
    }).refine((data: any) => !!data, { message: 'Mobile number is required.' }),

    isInternational: z.boolean(),

    isDone: z.boolean(),
});

export { FormSchema };
