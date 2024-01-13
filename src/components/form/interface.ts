import { PaymentProps } from "@/views/checkout/interface";
import { InputHTMLAttributes } from "react";
import { FieldErrors, FieldValues, UseFormRegister, UseFormSetValue } from "react-hook-form";

interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
    label?: string;
}


interface CustomMobileInputProps<
    TFieldValues extends FieldValues = FieldValues
> {
    label?: string;
    placeholder?: string;
    defaultValue?: {
        dialCode: string;
        countryCode: string;
        country: string;
        value: string;
    };
    setValue: UseFormSetValue<TFieldValues>;
}

interface CustomInputProps extends InputHTMLAttributes<HTMLInputElement> {
    label: string;
    name: string;
    register: UseFormRegister<any>;
    required?: boolean;
    errors: FieldErrors
}

interface CPaymentProps {
    register: UseFormRegister<any>;
    errors: FieldErrors;
}

interface CTotalProps {
    isInternational?: boolean;
    subtotal: number
}

export type { CustomInputProps, CustomMobileInputProps, CheckboxProps, CPaymentProps, CTotalProps }