import { PaymentProps } from "@/views/checkout/interface";
import { InputHTMLAttributes } from "react";
import { FieldValues, UseFormRegister, UseFormSetValue } from "react-hook-form";

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

interface CustomInputProps<TFieldValues extends FieldValues = FieldValues>
    extends InputHTMLAttributes<HTMLInputElement> {
    label: string;
    name: string;
    register: UseFormRegister<TFieldValues>;
    required?: boolean;
}

interface CPaymentProps {
    register: UseFormRegister<any>;
}

interface CTotalProps {
    isInternational?: boolean;
    subtotal: number
}

export type { CustomInputProps, CustomMobileInputProps, CheckboxProps, CPaymentProps, CTotalProps }