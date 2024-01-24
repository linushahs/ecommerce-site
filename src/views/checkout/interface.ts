import { BasketProduct } from "@/components/basket/interface";
import { FieldErrors, UseFormRegister } from "react-hook-form";

interface OrderSummaryProps {
  basket: BasketProduct[];
  subtotal: number;
}

interface Mobile {
  country: string;
  countryCode: string;
  dialCode: string;
  value: string;
}

interface Profile {
  fullname?: string;
  email?: string;
  address?: string;
  mobile?: Mobile;
}

interface ShippingDetailsProps {
  subtotal: number;
  profile: Profile;
  shipping: {
    fullname?: string;
    email?: string;
    address?: string;
    mobile?: Mobile;
    isInternational?: boolean;
    isDone?: boolean;
  };
}

interface ShippingFormProps {
  register: UseFormRegister<any>;
  errors: FieldErrors;
}

interface ShippingTotalProps {
  subtotal: number;
}

interface PaymentProps {
  shipping: {
    isDone: boolean;
    isInternational: boolean;
  };
  payment: {
    name: string;
    cardnumber: string;
    expiry: string;
    ccv: string;
    type: string;
  };
  subtotal: number;
}

export type { Mobile, OrderSummaryProps, PaymentProps, Profile, ShippingDetailsProps, ShippingFormProps, ShippingTotalProps };

