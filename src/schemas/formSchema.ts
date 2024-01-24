import { z } from 'zod';

const shipmentFormSchema = z.object({
    fullname: z.string().min(1, "Full name is required.")
        .min(8, { message: 'Full name must be at least 8 characters long.' })
        .max(60, { message: 'Full name must only be less than 60 characters.' }),

    email: z.string().min(1, "Email is required").email({ message: 'Email is not valid.' }),

    address: z.string().min(1, "Address is required."),

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


const paymentFormSchema = z.object({
    name: z.string({ required_error: 'Name is required' }).min(4, { message: 'Name should be at least 4 characters.' }),
    cardnumber: z.string()
        .min(13, { message: 'Card number should be 13-19 digits long' })
        .max(19, { message: 'Card number should only be 13-19 digits long' })
    ,
    expiry: z.date().refine(data => data !== null, { message: 'Credit card expiry is required.' }),
    ccv: z.string()
        .min(3, { message: 'CCV length should be 3-4 digit' })
        .max(4, { message: 'CCV length should only be 3-4 digit' })
    ,
    type: z.string().refine(data => data !== null, { message: 'Please select payment mode' }),
});


export { shipmentFormSchema, paymentFormSchema };
